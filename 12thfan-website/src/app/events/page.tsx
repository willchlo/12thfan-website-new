import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore how 12th Fan surfaces fixtures and meetups—the projection map preview and social channels for women’s sport.",
};

export default function EventsPage() {
  return (
    <main className="relative flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <Link href="/" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-300">
            ← Back to home
          </Link>
        </p>

        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">Events</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Meetups, fixtures, and watch-party energy—in the app you&apos;ll browse what&apos;s on nearby. Here you can peek at the
          projection-style map on the homepage and jump into how we show up socially.
        </p>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          <li className="rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Projection map</h2>
            <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Hover emoji bubbles on the phone preview to explore sample events—the same interaction ships in the landing hero.
            </p>
            <Link
              href="/#hologram-map"
              className="mt-6 inline-flex font-semibold text-emerald-700 underline-offset-4 transition-colors hover:text-emerald-600 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Open map preview →
            </Link>
          </li>
          <li className="rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Social</h2>
            <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Clips, community, and launch news—follow along and see the story stack in motion.
            </p>
            <Link
              href="/#events-social"
              className="mt-6 inline-flex font-semibold text-emerald-700 underline-offset-4 transition-colors hover:text-emerald-600 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Go to Social →
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
