import Link from "next/link";

const FOOTER_SOCIAL = {
  tiktok: "https://www.tiktok.com/@12thfanapp",
  instagram: "https://www.instagram.com/12thfanapp/",
} as const;

const footerSocialIconLinkClass =
  "flex h-14 w-14 items-center justify-center rounded-full text-white transition-all duration-200 ease-out hover:scale-[1.2] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-100 drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.35)]";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={3.833}
        strokeLinejoin="round"
        d="M21.358 19.14q-8.833-.426-12.28 6.298c-3.446 6.725-.598 17.729 10.9 17.729c11.5 0 11.832-11.112 11.832-12.276V17.875q3.69 2.336 6.22 2.813q2.533.476 3.22.422v-6.476q-2.342-.282-4.05-1.076c-1.709-.794-5.096-2.997-5.096-6.226q.003.024 0-2.499h-7.118q-.031 23.724 0 26.058c.031 2.334-1.78 5.6-5.45 5.6c-3.672 0-5.483-3.263-5.483-5.367c0-1.288.443-3.155 2.272-4.538c1.085-.82 2.59-1.148 5.033-1.148z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.35} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.125 11.25a4.125 4.125 0 11-8.25 0 4.125 4.125 0 018.25 0zM17.25 7.125h.008v.008H17.25V7.125z" />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <div id="footer" className="snap-start snap-always scroll-mt-8 pt-16 sm:pt-20">
      <footer className="mt-auto border-t border-[color-mix(in_srgb,var(--brand-forest)_22%,transparent)] bg-transparent py-14 pb-20 dark:border-emerald-100/12 sm:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:px-8">
          <div id="social" className="flex scroll-mt-28 flex-col items-center sm:scroll-mt-32">
            <nav
              className="flex flex-row items-center gap-3 sm:gap-5"
              aria-label="Social media"
            >
              <a
                href={FOOTER_SOCIAL.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={footerSocialIconLinkClass}
                aria-label="12th Fan on TikTok (@12thfanapp)"
              >
                <TikTokIcon className="h-8 w-8" />
              </a>
              <a
                href={FOOTER_SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={footerSocialIconLinkClass}
                aria-label="12th Fan on Instagram (@12thfanapp)"
              >
                <InstagramIcon className="h-8 w-8" />
              </a>
            </nav>
          </div>
          <Link
            href="/"
            className="transition-opacity hover:opacity-90 drop-shadow-[0_8px_28px_-8px_rgba(0,0,0,0.35)]"
            aria-label="12th Fan — home"
          >
            <span
              aria-hidden
              className="inline-block h-[4.25rem] max-w-[min(92vw,292px)] bg-white [aspect-ratio:1553/1013] sm:h-[5rem]"
              style={{
                WebkitMaskImage: "url(/logo-clear.png)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "contain",
                maskImage: "url(/logo-clear.png)",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
              }}
            />
          </Link>
          <p className="mt-2 max-w-xl text-center text-xs leading-relaxed text-white [text-shadow:0_1px_3px_rgb(0_0_0_/_0.45)]">
            © <time dateTime={String(year)}>{year}</time> 12th Fan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
