import Link from "next/link";

import HeaderJoinWithGlow from "@/components/HeaderJoinWithGlow";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import SiteHeaderLogo from "@/components/SiteHeaderLogo";
import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-white/95 transition-[color,transform] duration-200 ease-out [font-family:var(--font-passion-one)] active:opacity-90 hover:scale-105 hover:text-white motion-reduce:hover:scale-100 sm:min-h-0 sm:px-2 sm:py-1 sm:text-base sm:hover:scale-110";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] pt-[env(safe-area-inset-top)]">
      {/* Tab shape pointing down: flat top, rounded bottom corners */}
      <div className="rounded-b-[1.35rem] bg-[var(--brand-forest)] sm:rounded-b-[1.85rem] md:rounded-b-[2.25rem]">
        {/*
          Mobile: Join left, logo centered (flex-1), burger right.
          sm+: three-column grid with inline nav + Contact us.
        */}
        <div className="relative mx-auto w-full max-w-6xl px-3 py-3.5 sm:px-6 sm:py-3.5 lg:px-8">
          <div className="relative z-20 flex w-full items-center gap-2 sm:hidden">
            <div className="shrink-0">
              <HeaderJoinWithGlow />
            </div>
            <div className="flex min-w-0 flex-1 justify-center px-1">
              <SiteHeaderLogo />
            </div>
            <div className="shrink-0">
              <MobileNavDrawer />
            </div>
          </div>

          <div className="relative z-20 hidden w-full grid-cols-[auto,minmax(0,1fr),auto] items-center gap-x-6 sm:grid">
            <div className="min-w-0 justify-self-start sm:col-start-1 sm:row-start-1">
              <SiteHeaderLogo />
            </div>

            <nav
              className="hidden min-h-11 min-w-0 sm:col-start-2 sm:row-start-1 sm:flex sm:min-h-0 sm:w-full sm:min-w-0 sm:items-center sm:justify-center sm:gap-8 sm:px-0"
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

            <div className="flex shrink-0 items-center justify-end gap-4 sm:col-start-3 sm:row-start-1 sm:justify-self-end">
              <MobileNavDrawer />
              <HeaderJoinWithGlow />
              <Link href="/contact" className={cn(navLinkClass, "inline-flex")}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
