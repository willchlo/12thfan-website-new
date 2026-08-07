const SOCIAL = {
  tiktok: "https://www.tiktok.com/@12thfanapp",
  instagram: "https://www.instagram.com/12thfanapp/",
} as const;

const iconLinkClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/95 transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 active:opacity-70 sm:h-9 sm:w-9";

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

export default function HeaderSocialLinks() {
  return (
    <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Social media">
      <a
        href={SOCIAL.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className={iconLinkClass}
        aria-label="12th Fan on TikTok (@12thfanapp)"
      >
        <TikTokIcon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" />
      </a>
      <a
        href={SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={iconLinkClass}
        aria-label="12th Fan on Instagram (@12thfanapp)"
      >
        <InstagramIcon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" />
      </a>
    </nav>
  );
}
