"use client";

import { useState } from "react";

import BorderGlow from "@/components/BorderGlow/BorderGlow";

export function ContactForm() {
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
      <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-4 text-base text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
        Thanks — we&apos;ve received your message and will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
      {status === "error" && errorMessage ?
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100" role="alert">
          {errorMessage}
        </p>
      : null}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
          className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
        />
      </div>

      <div className="mx-auto flex w-full justify-center pt-2">
        <BorderGlow
          className="w-full max-w-sm sm:w-auto sm:max-w-none"
          edgeSensitivity={30}
          glowColor="158 72% 52%"
          backgroundColor="#1a4336"
          borderRadius={9999}
          glowRadius={36}
          glowIntensity={1.1}
          coneSpread={26}
          animated
          animationLoop
          colors={["#6ee7b7", "#34d399", "#a7f3d0"]}
          fillOpacity={0.42}
        >
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-12 w-full items-center justify-center px-8 text-base font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </BorderGlow>
      </div>
    </form>
  );
}
