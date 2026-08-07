/** Header nav link — opens the App Store listing. */
const APP_STORE_URL = "https://apps.apple.com/app/id6760150584";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-white/95 transition-opacity duration-200 ease-out [font-family:var(--font-passion-one)] hover:opacity-80 active:opacity-70 sm:min-h-0 sm:px-2 sm:py-1 sm:text-base";

export default function HeaderJoinWithGlow() {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
      Download
    </a>
  );
}
