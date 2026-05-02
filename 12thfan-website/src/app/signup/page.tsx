import type { Metadata } from "next";
import Link from "next/link";

import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Sign up — 12th Fan",
  description: "Join the 12th Fan community.",
};

export default function SignupPage() {
  return (
    <main className="relative flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="relative z-10 mx-auto w-full max-w-lg flex-1 px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <Link href="/" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-300">
            ← Back to home
          </Link>
        </p>
        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">Sign up</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Be among the first to get match days, meetups, and community updates from 12th Fan.
        </p>
        <SignupForm />
      </div>
    </main>
  );
}
