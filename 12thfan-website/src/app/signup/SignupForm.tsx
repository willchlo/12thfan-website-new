"use client";

import confetti from "canvas-confetti";
import { useState } from "react";

import BorderGlow from "@/components/BorderGlow/BorderGlow";

/** Side cannons — from Uiverse-style pattern (canvas-confetti). */
function fireJoinConfetti() {
  const end = Date.now() + 3 * 1000;
  const colors = [
    "#f7fee7",
    "#ecfccb",
    "#d9f99d",
    "#bbf7d0",
    "#86efac",
    "#6ee7b7",
    "#a7f3d0",
    "#d1fae5",
  ];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
}

export function SignupForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Could not join the list.");
        return;
      }

      fireJoinConfetti();
      window.alert("Thanks — you're on the list! We'll be in touch soon.");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Could not join the list. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-6 py-4 text-center text-base text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
        Thanks — you&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-center">
      {status === "error" && errorMessage ?
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"
          role="alert"
        >
          {errorMessage}
        </p>
      : null}

      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <input
          id="signup-name"
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
        <label htmlFor="signup-email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
          disabled={status === "loading"}
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
        />
      </div>
      <div className="mx-auto flex w-full justify-center">
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
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center px-8 text-base font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? "Joining…" : "Join 12th Fan"}
          </button>
        </BorderGlow>
      </div>
    </form>
  );
}
