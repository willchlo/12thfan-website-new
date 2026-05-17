import type { Metadata } from "next";
import Link from "next/link";

import { PrivacyPolicyContent } from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How 12th Fan collects, uses, stores, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="relative flex min-h-0 w-full flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <Link href="/" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-300">
            ← Back to home
          </Link>
        </p>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          12th Fan – Privacy Policy
        </h1>
        <div className="mt-10">
          <PrivacyPolicyContent />
        </div>
      </div>
    </main>
  );
}
