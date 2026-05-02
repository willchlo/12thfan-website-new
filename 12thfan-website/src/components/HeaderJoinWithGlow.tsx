"use client";

import Link from "next/link";

import BorderGlow from "@/components/BorderGlow/BorderGlow";

/** Same rim/glow treatment as the hero “Be the first to join.” CTA, sized for the nav bar. */
export default function HeaderJoinWithGlow() {
  return (
    <BorderGlow
      className="inline-flex shrink-0"
      edgeSensitivity={30}
      glowColor="158 72% 52%"
      backgroundColor="#1a4336"
      borderRadius={9999}
      glowRadius={26}
      glowIntensity={1.1}
      coneSpread={26}
      animated
      animationLoop
      colors={["#6ee7b7", "#34d399", "#a7f3d0"]}
      fillOpacity={0.42}
    >
      <Link
        href="/signup"
        className="inline-flex min-h-[38px] items-center justify-center px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-white transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:min-h-[40px] sm:px-4 sm:text-base [font-family:var(--font-passion-one)]"
      >
        Join
      </Link>
    </BorderGlow>
  );
}
