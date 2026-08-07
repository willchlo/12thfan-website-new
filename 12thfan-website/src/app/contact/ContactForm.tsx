"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Could not send your message.");
        return;
      }

      window.alert("Thanks — we've received your message and will get back to you soon.");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Could not send your message. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-4 text-center text-base text-emerald-900">
        Thanks — we&apos;ve received your message and will get back to you soon.
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
        <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-700 [[data-on-dark]_&]:text-white/90">
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
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--brand-mid)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-mid)_20%,transparent)] disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-700 [[data-on-dark]_&]:text-white/90">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === "loading"}
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--brand-mid)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-mid)_20%,transparent)] disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-700 [[data-on-dark]_&]:text-white/90">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder="How can we help?"
          disabled={status === "loading"}
          className="mt-2 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--brand-mid)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--brand-mid)_20%,transparent)] disabled:opacity-60"
        />
      </div>

      <div className="mx-auto flex w-full justify-center pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-2xl bg-linear-to-br from-[var(--brand-light)] via-[var(--brand-mid)] to-[var(--brand-forest)] px-8 text-base font-semibold uppercase tracking-tight text-white shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--brand-forest)_55%,transparent)] transition-[filter,transform] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--brand-forest)_65%,#171717)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto [font-family:var(--font-passion-one)]"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
