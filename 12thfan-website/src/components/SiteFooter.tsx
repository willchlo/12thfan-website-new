import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <div
      id="footer"
      className="footer-mobile-unified-bg snap-start snap-always scroll-mt-8 pt-16 max-sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:pt-24"
    >
      <footer className="mt-auto py-10 pb-8 sm:py-14 sm:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:px-8">
          <Link href="/" className="transition-opacity hover:opacity-90" aria-label="12th Fan — home">
            <Image
              src="/all-green-logo-dark.png"
              alt=""
              width={1792}
              height={1284}
              className="h-[3.75rem] w-auto max-w-[min(92vw,260px)] object-contain sm:h-[4.5rem]"
              sizes="(max-width: 640px) 70vw, 260px"
            />
          </Link>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[var(--brand-forest)]"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="underline-offset-2 transition-opacity hover:underline hover:opacity-80"
            >
              Privacy Policy
            </Link>
          </nav>
          <p className="max-w-xl text-center text-xs leading-relaxed text-[var(--brand-mid)]">
            © <time dateTime={String(year)}>{year}</time> 12th Fan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
