"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/#features", label: "The App" },
  { href: "/#hologram-map", label: "Events" },
  { href: "/#events-social", label: "Social" },
  { href: "/contact", label: "Contact" },
] as const;

const spring = { type: "spring" as const, damping: 30, stiffness: 340 };

export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const listVariants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.09, delayChildren: 0.14 },
    },
  };

  const itemVariants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const portal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="mobile-nav-backdrop"
              type="button"
              className="fixed inset-0 z-[200] bg-black/45 backdrop-blur-[2px]"
              aria-label="Close menu"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
              onClick={close}
            />
            <motion.div
              key="mobile-nav-panel"
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-[201] flex w-[min(20rem,calc(100vw-2.5rem))] flex-col bg-[var(--brand-forest)] pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-[-12px_0_40px_rgba(0,0,0,0.28)]"
              initial={reduce ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? { x: 0 } : { x: "100%" }}
              transition={reduce ? { duration: 0 } : spring}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 pb-3">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80 [font-family:var(--font-passion-one)]">
                  Menu
                </span>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                  onClick={close}
                  aria-label="Close menu"
                >
                  <span className="relative block h-5 w-5" aria-hidden>
                    <span className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </div>
              <motion.nav
                className="flex flex-1 flex-col gap-1 px-3 pt-4"
                aria-label="Main navigation"
                initial="hidden"
                animate="show"
                variants={listVariants}
              >
                {items.map(({ href, label }) => (
                  <motion.div key={href} variants={itemVariants}>
                    <Link
                      href={href}
                      className={cn(
                        "flex min-h-12 items-center rounded-lg px-3 text-left text-lg font-semibold uppercase tracking-[0.04em] text-white/95 transition-colors [font-family:var(--font-passion-one)]",
                        "hover:bg-white/10 active:bg-white/15",
                      )}
                      onClick={close}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className="relative inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-white/95 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 active:opacity-90 sm:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="flex h-[1.125rem] w-6 flex-col justify-between" aria-hidden>
          <motion.span
            className="block h-0.5 w-full rounded-full bg-current origin-[calc(100%-2px)_50%]"
            animate={
              open
                ? { rotate: -45, y: 7, width: "1.375rem" }
                : { rotate: 0, y: 0, width: "100%" }
            }
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="block h-0.5 w-full rounded-full bg-current"
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: reduce ? 0 : 0.16 }}
          />
          <motion.span
            className="block h-0.5 w-full rounded-full bg-current origin-[2px_50%]"
            animate={
              open
                ? { rotate: 45, y: -7, width: "1.375rem" }
                : { rotate: 0, y: 0, width: "100%" }
            }
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </button>
      {portal}
    </>
  );
}
