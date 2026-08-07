import HeaderJoinWithGlow from "@/components/HeaderJoinWithGlow";
import HeaderSocialLinks from "@/components/HeaderSocialLinks";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import SiteHeaderLogo from "@/components/SiteHeaderLogo";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-white/95 transition-opacity duration-200 ease-out [font-family:var(--font-passion-one)] hover:opacity-80 active:opacity-70 sm:min-h-0 sm:px-2 sm:py-1 sm:text-base";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] pt-[env(safe-area-inset-top)]">
      {/* Tab shape — app MATCHDAY_COVER_GRADIENT */}
      <div className="rounded-b-[1.35rem] bg-linear-to-br from-[var(--brand-light)] via-[var(--brand-mid)] to-[var(--brand-forest)] sm:rounded-b-[1.85rem] md:rounded-b-[2.25rem]">
        <div className="relative mx-auto w-full max-w-6xl px-3 py-3.5 sm:px-6 sm:py-3.5 lg:px-8">
          <div className="relative z-20 flex w-full items-center gap-1.5 sm:hidden">
            <div className="flex min-w-0 flex-1 justify-center px-1">
              <SiteHeaderLogo />
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <a href="/#contact" className={navLinkClass}>
                Contact
              </a>
              <HeaderJoinWithGlow />
              <HeaderSocialLinks />
              <MobileNavDrawer />
            </div>
          </div>

          <div className="relative z-20 hidden w-full grid-cols-[auto,minmax(0,1fr),auto] items-center gap-x-6 sm:grid">
            <div className="min-w-0 justify-self-start sm:col-start-1 sm:row-start-1">
              <SiteHeaderLogo />
            </div>

            <nav
              className="hidden min-h-11 min-w-0 sm:col-start-2 sm:row-start-1 sm:flex sm:min-h-0 sm:w-full sm:min-w-0 sm:items-center sm:justify-center sm:gap-6 sm:px-0"
              aria-label="Main navigation"
            >
              <a href="/#contact" className={navLinkClass}>
                Contact
              </a>
              <a href="/#features" className={navLinkClass}>
                The App
              </a>
              <HeaderJoinWithGlow />
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-3 sm:col-start-3 sm:row-start-1 sm:justify-self-end">
              <HeaderSocialLinks />
              <MobileNavDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
