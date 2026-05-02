"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type ZoomSnapSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Full-bleed layers behind the section (not scaled — e.g. gradients tied to the page background) */
  backdrop?: React.ReactNode;
  /** Fill one viewport and participate in vertical scroll snap */
  fullViewport?: boolean;
  /**
   * "zoom" scales the block in (default). "fade" only eases opacity — avoids fighting scroll-snap
   * on tall, interactive sections where simultaneous scroll + scale reads as stagger.
   */
  entrance?: "zoom" | "fade";
};

export default function ZoomSnapSection({
  id,
  className,
  children,
  backdrop,
  fullViewport = true,
  entrance = "zoom",
}: ZoomSnapSectionProps) {
  const reduce = useReducedMotion();
  const fade = entrance === "fade";

  const initial =
    reduce ? { scale: 1, opacity: 1 }
    : fade ? { scale: 1, opacity: 0.74 }
    : { scale: 0.82, opacity: 0.72 };

  const transition =
    reduce ? { duration: 0 }
    : fade ? { duration: 0.48, ease: [0.22, 1, 0.32, 1] as const }
    : { duration: 0.52, ease: [0.16, 1, 0.24, 1] as const };

  return (
    <section
      id={id}
      className={cn(
        fullViewport && "min-h-[100svh] snap-start snap-always",
        "relative",
        className
      )}
    >
      {backdrop}
      <motion.div
        className={cn(
          "relative z-10 w-full transform-gpu backface-hidden",
          fullViewport && "min-h-[100svh]",
        )}
        initial={initial}
        whileInView={{ scale: 1, opacity: 1 }}
        /* once: true + a bit of amount: scroll-snap settling no longer retriggers scale. */
        viewport={{ amount: 0.26, margin: "-6% 0px -8% 0px", once: true }}
        transition={transition}
        style={{ transformOrigin: fade ? "50% 50%" : "50% 45%" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
