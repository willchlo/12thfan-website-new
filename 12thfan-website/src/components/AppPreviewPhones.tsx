"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import IPhone3DMockup from "@/components/IPhone3DMockup";

function AppPreviewGlow() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[58%] z-0 h-[min(52vh,440px)] w-[min(160vw,760px)] -translate-x-1/2 -translate-y-1/2 opacity-40 transition-opacity duration-500 ease-out group-hover/app-preview:opacity-100 motion-reduce:transition-none motion-reduce:group-hover/app-preview:opacity-80 max-sm:top-[42%] max-sm:h-[min(44vh,360px)] max-sm:w-[min(190vw,640px)]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_64%_at_50%_34%,color-mix(in_srgb,var(--brand-forest)_82%,transparent)_0%,color-mix(in_srgb,#34d399_58%,transparent)_20%,color-mix(in_srgb,#6ee7b7_42%,transparent)_38%,color-mix(in_srgb,#a7f3d0_24%,transparent)_54%,transparent_80%)] opacity-100 blur-[28px] sm:blur-[38px]" />
      <div className="absolute inset-[-6%_-10%_-18%_-10%] bg-[radial-gradient(ellipse_95%_85%_at_50%_40%,color-mix(in_srgb,#ecfdf5_62%,transparent)_0%,color-mix(in_srgb,var(--brand-forest)_38%,transparent)_18%,color-mix(in_srgb,#34d399_28%,transparent)_38%,transparent_68%)] opacity-100 blur-[56px] sm:blur-[72px]" />
      <div className="absolute inset-[-18%_-22%_-32%_-22%] bg-[radial-gradient(ellipse_100%_88%_at_50%_48%,color-mix(in_srgb,#d1fae5_35%,transparent)_0%,color-mix(in_srgb,var(--brand-forest)_22%,transparent)_35%,transparent_62%)] opacity-90 blur-[90px] sm:blur-[110px]" />
      <div className="absolute left-1/2 top-[32%] h-[min(26vh,220px)] w-[min(56vw,270px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_68%_62%_at_50%_46%,color-mix(in_srgb,#fbf9f3_22%,var(--brand-forest))_0%,color-mix(in_srgb,var(--brand-forest)_95%,transparent)_8%,color-mix(in_srgb,#34d399_78%,transparent)_26%,color-mix(in_srgb,#6ee7b7_48%,transparent)_48%,transparent_76%)] opacity-100 blur-[14px] sm:blur-[18px]" />
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
            screenSrc="/app-preview-left.png"
            screenAlt="12th Fan app home screen"
            className="relative z-[1] shrink-0"
          />
          <IPhone3DMockup
            fan="center"
            size="prominent"
            screenSrc="/app-preview-center.png"
            screenAlt="12th Fan app home screen with events and navigation"
            className="relative z-10 shrink-0"
          />
          <IPhone3DMockup
            fan="right"
            size="prominent"
            screenSrc="/app-preview-events.png"
            screenAlt="12th Fan events map showing matches and gatherings in the UK"
            className="relative z-[1] shrink-0"
          />
        </div>

        {/* Mobile: staggered collage, ~half off-screen; position on wrapper so Motion owns only rotate */}
        <div className="relative isolate mx-auto block h-[min(100svh,980px)] w-full max-w-[100vw] overflow-x-clip overflow-y-visible sm:hidden">
          <AppPreviewGlow />
          <div className="absolute -top-32 left-[8%] z-[30] -translate-x-[22%]">
            <motion.div
              className="origin-center will-change-transform"
              style={{ rotate: rotTopLeft }}
            >
              <IPhone3DMockup
                fan="flat"
                size="prominent"
                screenSrc="/app-preview-left.png"
                screenAlt="12th Fan app home screen"
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
                screenSrc="/app-preview-center.png"
                screenAlt="12th Fan app home screen with events and navigation"
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
                screenSrc="/app-preview-events.png"
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
