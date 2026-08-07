"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import IPhone3DMockup from "@/components/IPhone3DMockup";

function AppPreviewGlow() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[58%] z-0 h-[min(44vh,360px)] w-[min(140vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-70 max-sm:top-[42%] max-sm:h-[min(40vh,300px)]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,color-mix(in_srgb,var(--brand-mid)_28%,transparent)_0%,transparent_72%)] blur-[48px] sm:blur-[56px]" />
    </div>
  );
}

/** Mobile: staggered collage; scroll gently rotates each phone (2D only — avoids transform conflicts). */
export default function AppPreviewPhones() {
  const rangeRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rangeRef,
    /* Map progress across the whole section as it crosses the viewport */
    offset: ["start end", "end start"],
  });

  const rotTopLeft = useTransform(scrollYProgress, (p) => (reduce ? -5 : 5 + p * -14));
  const rotRight = useTransform(scrollYProgress, (p) => (reduce ? 5 : -4 + p * 14));
  const rotBottomLeft = useTransform(scrollYProgress, (p) => (reduce ? -4 : 4 + p * -12));

  return (
    <div
      ref={rangeRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-0 pb-10 pt-4 sm:px-4 sm:py-20"
    >
      <div className="relative flex w-full flex-col items-center gap-5 sm:gap-10">
        {/* Desktop / tablet: classic 3-phone fan */}
        <div className="relative isolate hidden max-w-[100vw] flex-row flex-nowrap items-end justify-center gap-1 overflow-x-auto overflow-y-visible overscroll-x-contain px-1 pb-1 pt-0 sm:flex sm:max-w-none sm:-translate-y-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pt-2 md:gap-6 lg:gap-9">
          <AppPreviewGlow />
          <IPhone3DMockup
            fan="left"
            size="prominent"
            screenSrc="/app-preview-login-v2.png"
            screenAlt="12th Fan login screen"
            className="relative z-[1] shrink-0"
          />
          <IPhone3DMockup
            fan="center"
            size="prominent"
            screenSrc="/app-preview-home-v2.png"
            screenAlt="12th Fan home screen with events near you"
            className="relative z-10 shrink-0"
          />
          <IPhone3DMockup
            fan="right"
            size="prominent"
            screenSrc="/app-preview-map-v2.png"
            screenAlt="12th Fan events map showing matches and gatherings in the UK"
            className="relative z-[1] shrink-0"
          />
        </div>

        {/* Mobile: staggered collage, ~half off-screen; position on wrapper so Motion owns only rotate */}
        <div className="relative isolate mx-auto block h-[min(100svh,980px)] w-full max-w-[100vw] overflow-visible sm:hidden">
          <AppPreviewGlow />
          <div className="absolute -top-32 left-[8%] z-[30] -translate-x-[22%]">
            <motion.div
              className="origin-center will-change-transform"
              style={{ rotate: rotTopLeft }}
            >
              <IPhone3DMockup
                fan="flat"
                size="prominent"
                screenSrc="/app-preview-login-v2.png"
                screenAlt="12th Fan login screen"
                className="relative"
              />
            </motion.div>
          </div>
          <div className="absolute right-[8%] top-[16%] z-[10] translate-x-[22%]">
            <motion.div
              className="origin-center will-change-transform"
              style={{ rotate: rotRight }}
            >
              <IPhone3DMockup
                fan="flat"
                size="prominent"
                screenSrc="/app-preview-home-v2.png"
                screenAlt="12th Fan home screen with events near you"
                className="relative"
              />
            </motion.div>
          </div>
          <div className="absolute left-[10%] top-[42%] z-[8] -translate-x-[18%]">
            <motion.div
              className="origin-center will-change-transform"
              style={{ rotate: rotBottomLeft }}
            >
              <IPhone3DMockup
                fan="flat"
                size="prominent"
                screenSrc="/app-preview-map-v2.png"
                screenAlt="12th Fan events map showing matches and gatherings in the UK"
                className="relative"
              />
            </motion.div>
          </div>
        </div>

        <div
          className="-mt-2 hidden h-[20px] w-[min(92vw,420px)] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.2),transparent_72%)] blur-md dark:bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.52),transparent_72%)] sm:block"
          aria-hidden
        />
      </div>
    </div>
  );
}
