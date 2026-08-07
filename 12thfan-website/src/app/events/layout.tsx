import type { ReactNode } from "react";
import Link from "next/link";

const subNavLink =
  "inline-flex min-h-10 items-center rounded-md py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-[var(--brand-forest)] active:bg-zinc-100/80 sm:min-h-0 sm:py-0";

export default function EventsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="border-b border-zinc-200/80 bg-[color-mix(in_srgb,var(--hero-surface)_92%,transparent)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:gap-x-8 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 [font-family:var(--font-passion-one)]">
            Events
          </span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:gap-x-8" aria-label="Events sections">
            <Link href="/events" className={subNavLink}>
              Overview
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}
