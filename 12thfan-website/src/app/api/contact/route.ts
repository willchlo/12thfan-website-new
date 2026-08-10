import { NextResponse } from "next/server";

const MAX_NAME = 120;
const MAX_MESSAGE = 4000;

const ENQUIRY_LABELS: Record<string, string> = {
  general: "General enquiry",
  feedback: "Feedback",
  partnership: "Partnership",
  account_deletion: "Account deletion request",
  personal_data_deletion: "Personal data deletion request",
  other: "Other",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function slackWebhookUrl() {
  return process.env.SLACK_WEBHOOK_URL?.trim() || process.env.CONTACT_WEBHOOK_URL?.trim();
}

async function notifySlackContact(
  name: string,
  email: string,
  message: string,
  enquiryType: string,
) {
  const webhook = slackWebhookUrl();
  if (!webhook) return;

  const enquiryLabel = ENQUIRY_LABELS[enquiryType] ?? enquiryType;
  const title =
    enquiryType === "account_deletion"
      ? "🗑️ Account deletion request — 12th Fan"
      : enquiryType === "personal_data_deletion"
        ? "🗑️ Personal data deletion request — 12th Fan"
        : "📩 New 12th Fan contact message";
  const text = [
    title,
    `🏷️ Enquiry type: ${enquiryLabel}`,
    `👤 Name: ${name}`,
    `📧 Email: ${email}`,
    `💬 Message: ${message}`,
  ].join("\n");

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }).catch(() => {});
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const enquiryType =
      typeof body.enquiryType === "string" && body.enquiryType.trim()
        ? body.enquiryType.trim()
        : "general";

    if (!name || name.length > MAX_NAME) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!message || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: "Please enter a message (max 4000 characters)." }, { status: 400 });
    }
    if (!(enquiryType in ENQUIRY_LABELS)) {
      return NextResponse.json({ error: "Please select a valid enquiry type." }, { status: 400 });
    }

    await notifySlackContact(name, email, message, enquiryType);

    if (process.env.NODE_ENV === "development") {
      console.info("[contact]", {
        name,
        email,
        enquiryType,
        enquiryLabel: ENQUIRY_LABELS[enquiryType],
        messageLength: message.length,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }
}
