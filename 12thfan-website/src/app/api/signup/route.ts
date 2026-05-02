import { NextResponse } from "next/server";

const MAX_EMAIL = 254;
const MAX_NAME = 120;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function slackWebhookUrl() {
  return (
    process.env.SLACK_WEBHOOK_URL?.trim() ||
    process.env.WAITLIST_WEBHOOK_URL?.trim() ||
    process.env.CONTACT_WEBHOOK_URL?.trim()
  );
}

type SlackNotifyResult = { notified: true } | { notified: false; reason: "missing_webhook" | "slack_error"; detail?: string };

async function notifySlackSignup(name: string, email: string): Promise<SlackNotifyResult> {
  const hasSlackEnv = Boolean(process.env.SLACK_WEBHOOK_URL?.trim());
  console.log("[api/signup] SLACK_WEBHOOK_URL is set:", hasSlackEnv);

  const webhook = slackWebhookUrl();
  console.log("[api/signup] Resolved webhook URL (any of SLACK / WAITLIST / CONTACT):", Boolean(webhook));

  if (!webhook) {
    console.log("[api/signup] No Slack webhook configured — add SLACK_WEBHOOK_URL to .env.local and restart the dev server.");
    return { notified: false, reason: "missing_webhook" };
  }

  const text = ["🚀 New 12th Fan signup!", `👤 Name: ${name}`, `📧 Email: ${email}`].join("\n");
  const body = JSON.stringify({ text });

  console.log("[api/signup] POST to Slack webhook starting…");

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const responseText = await res.text();
    console.log("[api/signup] Slack fetch finished. status:", res.status, "body:", responseText.slice(0, 300));

    if (!res.ok) {
      console.error("[api/signup] Slack webhook error:", res.status, responseText);
      return { notified: false, reason: "slack_error", detail: `${res.status}: ${responseText}` };
    }

    console.log("[api/signup] Slack notification sent successfully.");
    return { notified: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[api/signup] Slack fetch threw:", err);
    return { notified: false, reason: "slack_error", detail: message };
  }
}

export async function POST(request: Request) {
  console.log("[api/signup] POST /api/signup — request received");

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    console.log("[api/signup] Parsed body:", { name: name ? "(present)" : "(empty)", email: email ? "(present)" : "(empty)" });

    if (!name || name.length > MAX_NAME) {
      return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !isValidEmail(email) || email.length > MAX_EMAIL) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const slack = await notifySlackSignup(name, email);

    console.log("[api/signup] Signup complete.", { slackNotified: slack.notified, slack });

    return NextResponse.json({
      ok: true,
      slackNotified: slack.notified,
      ...(slack.notified === false && slack.reason === "slack_error" && slack.detail ?
        { slackError: slack.detail }
      : {}),
      ...(slack.notified === false && slack.reason === "missing_webhook" ?
        { slackSkipped: true as const }
      : {}),
    });
  } catch (err) {
    console.error("[api/signup] POST handler error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 400 });
  }
}
