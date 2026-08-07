import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover fixtures, meetups, and watch parties with 12th Fan.",
};

export default function EventsPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-medium text-[var(--brand-mid)]">
          <Link href="/" className="transition-opacity hover:opacity-80">
            ← Back to home
          </Link>
        </p>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-[var(--brand-forest)] sm:text-4xl">Events</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
          Meetups, fixtures, and watch-party energy—in the 12th Fan app you&apos;ll browse what&apos;s on nearby and join in with
          fans who love the game as much as you do.
        </p>
        <p className="mt-8">
          <Link
            href="/signup"
            className="inline-flex font-semibold text-[var(--brand-forest)] underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
          >
            Join the list →
          </Link>
        </p>
      </div>
    </main>
  );
}
