"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgClass =
  "h-[3.75rem] max-h-[3.75rem] w-auto max-w-[min(240px,68vw)] object-contain object-center sm:h-12 sm:max-h-none sm:max-w-none sm:object-left";

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
          src="/logo-white.png"
          alt=""
          width={896}
          height={642}
          priority
          className={imgClass}
          sizes="(max-width: 640px) 280px, 260px"
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
        src="/logo-white.png"
        alt="12th Fan"
        width={896}
        height={642}
        priority
        className={imgClass}
        sizes="(max-width: 640px) 280px, 260px"
      />
    </Link>
  );
}
