"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgClass =
  "h-10 max-h-10 w-auto max-w-[min(148px,46vw)] object-contain object-left brightness-0 invert sm:h-14 sm:max-h-none sm:max-w-none";

export default function SiteHeaderLogo() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <button
        type="button"
        onClick={() => {
          const reduce =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }}
        className="flex shrink-0 items-center justify-self-start transition-opacity hover:opacity-90"
        aria-label="Back to top"
      >
        <Image
          src="/logo-clear.png"
          alt=""
          width={1553}
          height={1013}
          priority
          className={imgClass}
          sizes="(max-width: 640px) 160px, 260px"
          aria-hidden
        />
      </button>
    );
  }

  return (
    <Link
      href="/"
      className="flex shrink-0 items-center justify-self-start transition-opacity hover:opacity-90"
      aria-label="12th Fan home"
    >
      <Image
        src="/logo-clear.png"
        alt="12th Fan"
        width={1553}
        height={1013}
        priority
        className={imgClass}
        sizes="(max-width: 640px) 160px, 260px"
      />
    </Link>
  );
}
