"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

const MAX_POINTER_TILT = 22;

/** Idle pose + relative scale when shown in a 3-phone “fan” (center hero + angled sides) */
const FAN_LAYOUT = {
  left: { rx: 10, ry: 20, scale: 0.82, tz: -18 },
  center: { rx: 11, ry: -16, scale: 1, tz: 0 },
  right: { rx: 10, ry: -46, scale: 0.82, tz: -18 },
  /** No idle 3D yaw — used when outer layout (e.g. scroll collage) supplies 2D rotation */
  flat: { rx: 0, ry: 0, scale: 1, tz: 0 },
} as const;

export type IPhoneFanRole = keyof typeof FAN_LAYOUT;

export type IPhone3DMockupProps = {
  className?: string;
  /** Wider footprint for the fullscreen snap preview */
  size?: "default" | "prominent";
  /** Screen image inside the device bezel */
  screenSrc?: string;
  screenAlt?: string;
  /** Position in multi-phone compositions: angled sides use smaller scale + outward Y rotation */
  fan?: IPhoneFanRole;
};

/** CSS 3D iPhone: perspective, depth layers, tilt toward cursor. Respects prefers-reduced-motion. */
export default function IPhone3DMockup({
  className = "",
  size = "default",
  screenSrc = "/app-home-screen.png",
  screenAlt = "12th Fan app home screen with events and navigation",
  fan = "center",
}: IPhone3DMockupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hover, setHover] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const layout = FAN_LAYOUT[fan];

  const widthClasses =
    size === "prominent" ?
      "w-[min(72vw,252px)] sm:w-[340px]"
    : "w-[min(72vw,240px)] sm:w-[260px]";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (r.width / 2);
      const ny = (e.clientY - cy) / (r.height / 2);
      const clamp = (v: number) => Math.min(1, Math.max(-1, v));
      setTilt({
        ry: clamp(nx) * MAX_POINTER_TILT,
        rx: -clamp(ny) * MAX_POINTER_TILT,
      });
    },
    [reduceMotion],
  );

  const handleLeave = useCallback(() => {
    setHover(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const idle = hover && !reduceMotion;

  const baseRx = reduceMotion ? 0 : layout.rx;
  const baseRy = reduceMotion ? 0 : layout.ry;
  const tz = reduceMotion ? 0 : layout.tz;
  const flat2d = fan === "flat";
  const transform =
    flat2d || reduceMotion ?
      undefined
    : `rotateX(${baseRx + tilt.rx}deg) rotateY(${baseRy + tilt.ry}deg) translateZ(${tz}px)`;

  const aria =
    fan === "flat"
      ? "Preview of the 12th Fan app on an iPhone."
    : fan === "center"
      ? "3D preview of the 12th Fan app on an iPhone. Hover to rotate."
    : fan === "left"
      ? "3D preview of the 12th Fan app home screen. Hover to rotate."
    : "3D preview of the 12th Fan events map. Hover to rotate.";

  return (
    <div
      ref={rootRef}
      className={`inline-block ${flat2d ? "" : "duration-700 [perspective:1400px] [perspective-origin:50%_40%]"} ${className}`}
      role="img"
      aria-label={aria}
      onMouseEnter={flat2d ? undefined : () => setHover(true)}
      onMouseMove={flat2d ? undefined : handleMove}
      onMouseLeave={flat2d ? undefined : handleLeave}
    >
      <div
        className="relative will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform,
          transition: idle ? undefined : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          style={{
            transform: `translateZ(18px) scale(${layout.scale})`,
            transformStyle: "preserve-3d",
          }}
          className="relative origin-center"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[3rem] bg-linear-to-r from-white/35 via-transparent to-transparent opacity-55 mix-blend-plus-lighter"
            style={{ clipPath: "inset(0 55% 0 0 round 3rem)" }}
            aria-hidden
          />

          <div
            className={`relative rounded-[3rem] bg-linear-to-b from-zinc-400 via-zinc-900 to-black p-[12px] ${widthClasses} shadow-[inset_0_1px_0_rgb(255_255_255/0.2),inset_0_-2px_4px_rgb(0_0_0/0.45),0_28px_50px_-8px_rgb(0_0_0/0.28),0_48px_80px_-20px_rgb(0_0_0/0.38),0_0_0_1px_rgb(0_0_0/0.6)] ring ring-black/35 dark:from-zinc-500 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_52px_90px_-16px_rgb(0_0_0/0.55)]`}
          >
            <div
              className="pointer-events-none absolute -left-[3px] top-[18%] h-10 w-[3px] rounded-l-sm bg-linear-to-r from-white/35 to-zinc-800 shadow-md dark:to-zinc-700"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-[3px] top-[28%] h-14 w-[3px] rounded-l-sm bg-linear-to-r from-white/35 to-zinc-800 shadow-md dark:to-zinc-700"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-[3px] top-[22%] h-24 w-[3px] rounded-r-sm bg-linear-to-l from-white/28 to-zinc-800 shadow-md dark:to-zinc-700"
              aria-hidden
            />

            <div
              className="relative overflow-hidden rounded-[2.52rem] border border-black/40 bg-neutral-950 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),inset_0_-20px_40px_-10px_rgb(0_0_0/0.35),inset_0_2px_0_rgb(255_255_255/0.06)] outline outline-1 outline-white/25"
              style={{
                aspectRatio: "470 / 1024",
                transform: `translateZ(14px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 z-20">
                <Image
                  src={screenSrc}
                  alt={screenAlt}
                  width={470}
                  height={1024}
                  sizes={
                    fan !== "center" && fan !== "flat" ?
                      "(max-width:640px) 68vw, 280px"
                    : size === "prominent" ?
                      "(max-width:640px) 72vw, 340px"
                    : "(max-width:640px) 72vw, 260px"
                  }
                  className="h-full w-full object-cover object-top"
                  priority={fan === "center" && size === "prominent"}
                />
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-[24] bg-linear-to-br from-white/12 via-transparent to-transparent mix-blend-overlay dark:from-white/8"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 z-[24] bg-linear-to-t from-transparent via-transparent to-black/15 opacity-70 dark:to-black/35"
                aria-hidden
              />

              <div
                className="pointer-events-none absolute inset-0 z-[26] bg-linear-to-tr from-transparent via-white/12 via-45% to-transparent mix-blend-soft-light opacity-40 dark:opacity-25"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
