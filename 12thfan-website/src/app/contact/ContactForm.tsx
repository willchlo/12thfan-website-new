"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = [
  { value: "general", label: "General enquiry" },
  { value: "feedback", label: "Feedback" },
  { value: "partnership", label: "Partnership" },
  { value: "account_deletion", label: "Delete my 12th Fan account" },
  { value: "personal_data_deletion", label: "Request deletion of my personal data" },
  { value: "other", label: "Other" },
] as const;

type EnquiryType = (typeof ENQUIRY_TYPES)[number]["value"];
type SubmittedSpecial = "account_deletion" | "personal_data_deletion" | null;

const fieldLabelClass =
  "block text-sm font-medium text-zinc-700 [[data-on-dark]_&]:text-white/90";
const fieldInputClass =
  "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--brand-mid)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-mid)_20%,transparent)] disabled:opacity-60";

function successMessage(kind: SubmittedSpecial) {
  if (kind === "account_deletion") {
    return "Thanks — we\u2019ve received your account deletion request and will process it soon.";
  }
  if (kind === "personal_data_deletion") {
    return "Thanks — we\u2019ve received your personal data deletion request and will process it soon.";
  }
  return "Thanks — we\u2019ve received your message and will get back to you soon.";
}

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("general");
  const [submittedSpecial, setSubmittedSpecial] = useState<SubmittedSpecial>(null);

  const isAccountDeletion = enquiryType === "account_deletion";
  const isPersonalDataDeletion = enquiryType === "personal_data_deletion";
  const usesAccountEmail = isAccountDeletion || isPersonalDataDeletion;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const reason = String(fd.get("enquiryType") ?? enquiryType).trim() as EnquiryType;
    const special: SubmittedSpecial =
      reason === "account_deletion" || reason === "personal_data_deletion" ? reason : null;

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, enquiryType: reason }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Could not send your message.");
        return;
      }

      window.alert(successMessage(special));
      setSubmittedSpecial(special);
      setStatus("success");
      setEnquiryType("general");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Could not send your message. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-4 text-center text-base text-emerald-900">
        {successMessage(submittedSpecial)}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6 text-left", className)}>
      {status === "error" && errorMessage ?
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {errorMessage}
        </p>
      : null}

      <div>
        <label htmlFor="contact-enquiry-type" className={fieldLabelClass}>
          Enquiry type
        </label>
        <select
          id="contact-enquiry-type"
          name="enquiryType"
          required
          value={enquiryType}
          disabled={status === "loading"}
          onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
          className={cn(fieldInputClass, "appearance-none bg-[length:1rem] bg-[right_0.85rem_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          }}
        >
          {ENQUIRY_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isAccountDeletion ?
        <div
          className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/90 px-4 py-4 text-sm leading-relaxed text-zinc-700"
          role="note"
        >
          <p>
            You can permanently delete your account from within the 12th Fan app via Profile → Settings → Delete
            Account. If you&apos;re unable to access the app, submit this form using the email address associated with
            your 12th Fan account and we&apos;ll process your deletion request.
          </p>
          <p>
            Deleting your account will permanently remove your 12th Fan account and associated personal data. Certain
            information may only be retained where required for legal, security, fraud-prevention or regulatory
            purposes, and only for as long as necessary.
          </p>
        </div>
      : null}

      {isPersonalDataDeletion ?
        <div
          className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/90 px-4 py-4 text-sm leading-relaxed text-zinc-700"
          role="note"
        >
          <p>
            Use this form to request deletion or anonymisation of personal data associated with your 12th Fan account
            without necessarily deleting your account. Please use the email address associated with your 12th Fan
            account and explain what data you would like deleted.
          </p>
        </div>
      : null}

      <div>
        <label htmlFor="contact-name" className={fieldLabelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
          placeholder="Your name"
          disabled={status === "loading"}
          className={fieldInputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={fieldLabelClass}>
          {usesAccountEmail ? "Email linked to your 12th Fan account" : "Email"}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === "loading"}
          className={fieldInputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={fieldLabelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder={
            isAccountDeletion
              ? "Please confirm you want your 12th Fan account deleted, and share any extra details we may need."
              : isPersonalDataDeletion
                ? "Please explain what personal data you would like deleted or anonymised."
                : "How can we help?"
          }
          disabled={status === "loading"}
          className={cn(fieldInputClass, "resize-y")}
        />
      </div>

      <div className="mx-auto flex w-full justify-center pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-2xl bg-linear-to-br from-[var(--brand-light)] via-[var(--brand-mid)] to-[var(--brand-forest)] px-8 text-base font-semibold uppercase tracking-tight text-white shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--brand-forest)_55%,transparent)] transition-[filter,transform] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--brand-forest)_65%,#171717)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto [font-family:var(--font-passion-one)]"
        >
          {status === "loading"
            ? "Sending…"
            : isAccountDeletion || isPersonalDataDeletion
              ? "Submit deletion request"
              : "Send message"}
        </button>
      </div>
    </form>
  );
}
