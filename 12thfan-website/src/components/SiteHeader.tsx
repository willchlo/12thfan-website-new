import Link from "next/link";

import HeaderJoinWithGlow from "@/components/HeaderJoinWithGlow";
import SiteHeaderLogo from "@/components/SiteHeaderLogo";

const navLinkClass =
  "inline-block origin-center whitespace-nowrap text-sm font-semibold uppercase tracking-[0.04em] text-white/95 transition-[color,transform] duration-200 ease-out hover:scale-110 hover:text-white motion-reduce:hover:scale-100 sm:text-base [font-family:var(--font-passion-one)]";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] pt-[env(safe-area-inset-top)]">
      {/* Tab shape pointing down: flat top, rounded bottom corners */}
      <div className="rounded-b-[1.35rem] bg-[var(--brand-forest)] sm:rounded-b-[1.85rem] md:rounded-b-[2.25rem]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3.5 sm:gap-6 sm:px-6 lg:px-8">
          <SiteHeaderLogo />
          <nav
            className="flex min-w-0 items-center justify-center justify-self-center gap-3 overflow-x-auto sm:gap-8"
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
          <div className="flex shrink-0 items-center justify-self-end gap-3 sm:gap-4">
            <HeaderJoinWithGlow />
            <Link href="/contact" className={navLinkClass}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
