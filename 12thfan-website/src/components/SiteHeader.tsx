import Link from "next/link";

import HeaderJoinWithGlow from "@/components/HeaderJoinWithGlow";
import SiteHeaderLogo from "@/components/SiteHeaderLogo";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-white/95 transition-[color,transform] duration-200 ease-out [font-family:var(--font-passion-one)] active:opacity-90 hover:scale-105 hover:text-white motion-reduce:hover:scale-100 sm:min-h-0 sm:px-2 sm:py-1 sm:text-base sm:hover:scale-110";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] pt-[env(safe-area-inset-top)]">
      {/* Tab shape pointing down: flat top, rounded bottom corners */}
      <div className="rounded-b-[1.35rem] bg-[var(--brand-forest)] sm:rounded-b-[1.85rem] md:rounded-b-[2.25rem]">
        {/*
          Mobile: row1 = logo + actions; row2 = full-width horizontal nav (touch scroll).
          sm+: single row three-column layout.
        */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-2 gap-y-2.5 px-3 py-3.5 sm:grid-cols-[auto,minmax(0,1fr),auto] sm:grid-rows-1 sm:items-center sm:gap-x-6 sm:gap-y-0 sm:px-6 sm:py-3.5 lg:px-8">
          <div className="col-start-1 row-start-1 min-w-0 justify-self-start">
            <SiteHeaderLogo />
          </div>

          <nav
            className="col-span-2 row-start-2 flex min-h-11 items-center gap-2 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] px-0.5 pb-0.5 [scrollbar-width:none] sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:min-h-0 sm:justify-center sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Main navigation"
          >
            <a href="/#features" className={navLinkClass}>
              The App
            </a>
            <a href="/#hologram-map" className={navLinkClass}>
              Events
            </a>
            <Link href="/#events-social" className={navLinkClass}>
              Social
            </Link>
          </nav>

          <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-2 sm:col-start-3 sm:gap-4">
            <HeaderJoinWithGlow />
            <Link href="/contact" className={navLinkClass}>
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Contact us</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
