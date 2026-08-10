import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with the 12th Fan team, or request deletion of your 12th Fan account.",
};

export default function ContactPage() {
  return (
    <main className="relative flex min-h-0 w-full flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-lg flex-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-medium text-[var(--brand-mid)]">
          <Link href="/" className="transition-opacity hover:opacity-80">
            ← Back to home
          </Link>
        </p>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-[var(--brand-forest)] sm:text-4xl">Contact us</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Send us a note — questions, partnerships, feedback, we&apos;d love to hear from you.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
