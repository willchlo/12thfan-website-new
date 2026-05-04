"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";

import { hologramBubbleLayout, previewEvents, previewEventCardPresentation } from "@/lib/preview-events";
import { cn } from "@/lib/utils";

/** Edge-on glass only — thin white strip; projection reads as leaving this surface. */
function PhoneGlassStripOnly({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative flex w-full flex-col items-center leading-none", className)}>
      {/* Trim empty SVG rows above silver so markup sits flush against the projection */}
      <svg
        viewBox="0 5 360 21"
        preserveAspectRatio="xMidYMax meet"
        className="block h-auto w-[min(92vw,360px)] max-w-[360px] overflow-visible drop-shadow-[0_8px_18px_-6px_rgb(148_163_184/0.45)] dark:drop-shadow-[0_10px_22px_-8px_rgb(148_163_184/0.32)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={`glass-face-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#fafafa" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <linearGradient id={`glass-silver-edge-${uid}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="rgba(148,163,184,0.52)" />
            <stop offset="45%" stopColor="rgba(203,213,225,0.28)" />
            <stop offset="78%" stopColor="rgba(241,245,249,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Silver projection spill on the glass */}
        <rect x="34" y="6" width="292" height="14" rx="7" fill={`url(#glass-silver-edge-${uid})`} opacity={0.88} />

        <rect
          x="36"
          y="8"
          width="288"
          height="11"
          rx="5.5"
          fill={`url(#glass-face-${uid})`}
          className="dark:opacity-95"
        />
        <rect x="40" y="10" width="268" height="5" rx="2.5" fill="#ffffff" opacity={0.55} />

        <rect
          x="36"
          y="8"
          width="288"
          height="11"
          rx="5.5"
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth={1.1}
          opacity={0.85}
        />
      </svg>

      <div
        className="pointer-events-none -mt-0.5 h-[9px] w-[min(70%,236px)] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgb(148_163_184/0.32),transparent_72%)] blur-[12px] dark:bg-[radial-gradient(ellipse_at_center,rgb(148_163_184/0.22),transparent_72%)]"
        aria-hidden
      />
    </div>
  );
}

function IOSBubbleEmoji({
  emoji,
  active,
}: {
  emoji: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate transition-[transform,box-shadow,opacity] duration-300 ease-out motion-reduce:transition-none",
        "drop-shadow-[0_14px_36px_-10px_rgba(15,23,42,0.38)] dark:drop-shadow-[0_18px_42px_-12px_rgba(0,0,0,0.55)]",
        active && "scale-[1.06] drop-shadow-[0_20px_48px_-12px_rgba(15,23,42,0.45)] dark:drop-shadow-[0_22px_56px_-10px_rgba(0,0,0,0.6)]",
      )}
    >
      {/* Tail drawn first so the glass capsule paints above it */}
      <div
        className={cn(
          "absolute -bottom-[5px] left-1/2 z-[1] h-3 w-3 -translate-x-1/2 rotate-45 overflow-hidden rounded-[4px] border border-white/45 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none dark:border-white/12 dark:bg-zinc-950/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
          active && "border-white/60 bg-white/30 dark:border-white/22 dark:bg-zinc-950/55",
        )}
        aria-hidden
      />
      {/* Liquid glass — frosted stack + specular “liquid” highlights */}
      <div
        className={cn(
          "relative z-[2] overflow-hidden rounded-[1.45rem] border px-[0.7rem] py-[0.48rem] transition-[border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none sm:px-[0.75rem] sm:py-[0.52rem]",
          "border-white/[0.58] bg-white/[0.22] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-8px_16px_-6px_rgba(255,255,255,0.15),0_4px_6px_-1px_rgba(0,0,0,0.06)]",
          "backdrop-blur-2xl backdrop-saturate-200 dark:border-white/[0.14] dark:bg-zinc-950/[0.42] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-12px_24px_-8px_rgba(0,0,0,0.35)]",
          active &&
            "border-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_0_0_1px_rgba(255,255,255,0.35),0_12px_40px_-14px_rgba(15,23,42,0.35)] dark:border-white/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_0_1px_rgba(255,255,255,0.12)]",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.12)_38%,transparent_55%)] opacity-95 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.22)_0%,transparent_45%)] dark:opacity-100"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[20%] -top-[30%] h-[85%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,transparent_68%)] opacity-70 mix-blend-overlay blur-[0.5px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_65%)] dark:opacity-90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] rounded-b-[inherit] bg-gradient-to-t from-black/[0.07] via-transparent to-transparent dark:from-black/40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40 dark:ring-white/10"
          aria-hidden
        />
        <span className="relative z-[1] flex select-none items-center justify-center text-[1.85rem] leading-none tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)] sm:text-[2.15rem]" aria-hidden>
          {emoji}
        </span>
      </div>
    </div>
  );
}

export default function PhoneHologramMapSection({ className = "" }: { className?: string }) {
  const detailId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const active = activeIndex ?? pinnedIndex;
  const shown = active !== null ? previewEvents[active] : null;

  return (
    <div className={cn("relative", className)} aria-labelledby={`${detailId}-heading`}>
      <div className="relative z-10 mx-auto grid min-h-[min(100svh,900px)] w-full max-w-6xl grid-cols-1 content-center gap-6 px-0 py-16 sm:gap-10 sm:px-6 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_min(18rem,32vw)] lg:items-center lg:px-8 lg:py-20 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="relative flex flex-col items-center">
          <div className="relative z-10 mx-auto mb-1 max-w-xl -translate-y-7 px-1 text-center text-balance sm:-translate-y-9">
            <h2
              id={`${detailId}-heading`}
              className="text-3xl tracking-tight text-white sm:text-4xl [text-shadow:0_1px_2px_rgb(0_0_0_/_0.55),0_2px_14px_rgb(0_0_0_/_0.35)]"
            >
              EXAMPLE EVENTS NEAR YOU
            </h2>
          </div>

          {/* Beam + bubbles share height above phone; strip is overlaid bottom so light meets glass with no gap */}
          <div className="relative z-10 mx-auto -mt-1 w-full max-w-lg -translate-y-3 overflow-visible leading-none sm:-translate-y-5">
            <div className="relative mx-auto min-h-[min(56vh,460px)] w-full overflow-visible [--phone-reserve:clamp(38px,11.8vw,56px)] sm:min-h-[min(58vh,480px)]">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[4] bottom-[var(--phone-reserve)] max-sm:bottom-0"
                aria-hidden
              >
                <div className="absolute inset-0 -translate-y-32 sm:translate-y-8">
                  <div className="hologram-projection-breathe absolute inset-0">
                  {/* Soft outer fan — same trapezoid; widens upward only (narrow base reads as pill aperture) */}
                  <div
                    className="absolute inset-0 opacity-[0.55] blur-[56px] dark:opacity-[0.48]"
                    style={{
                      clipPath: "polygon(24% 100%, 76% 100%, 100% 0%, 0% 0%)",
                      background:
                        "linear-gradient(to top, rgba(255,255,255,0.5) 0%, rgba(248,250,252,0.22) 45%, transparent 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.99] dark:opacity-[0.93]"
                    style={{
                      clipPath: "polygon(27% 100%, 73% 100%, 100% 0%, 0% 0%)",
                      background:
                        "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 6%, rgba(248,250,252,0.72) 28%, rgba(226,232,240,0.44) 58%, rgba(203,213,225,0.2) 80%, transparent 100%)",
                      filter: "blur(0.4px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.88] blur-[42px] dark:opacity-[0.86]"
                    style={{
                      clipPath: "polygon(25.5% 100%, 74.5% 100%, 100% 0%, 0% 0%)",
                      background:
                        "linear-gradient(to top, rgba(255,255,255,0.75), rgba(248,250,252,0.42), rgba(226,232,240,0.18), transparent)",
                    }}
                  />
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-x-0 top-0 z-10 overflow-visible bottom-[var(--phone-reserve)]"
                role="group"
                aria-label="Projected event bubbles"
              >
                {hologramBubbleLayout.map(({ eventIndex, x, y, motionDelay }, bubbleIdx) => {
                  const ev = previewEvents[eventIndex];
                  const isOn = active === eventIndex;
                  return (
                    <div
                      key={`${eventIndex}-${bubbleIdx}-${x}-${y}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <div
                        className={cn(
                          !reduceMotion &&
                            "motion-safe:animate-[hologram-bubble-drift_5.2s_ease-in-out_infinite]",
                        )}
                        style={reduceMotion ? undefined : { animationDelay: motionDelay }}
                      >
                        <button
                          type="button"
                          className="cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent dark:focus-visible:ring-slate-500"
                          aria-pressed={pinnedIndex === eventIndex}
                          aria-describedby={detailId}
                          onMouseEnter={() => setActiveIndex(eventIndex)}
                          onMouseLeave={() => setActiveIndex(null)}
                          onFocus={() => setActiveIndex(eventIndex)}
                          onBlur={() => setActiveIndex(null)}
                          onClick={() =>
                            setPinnedIndex((p) => (p === eventIndex ? null : eventIndex))
                          }
                        >
                          <span className="sr-only">
                            {ev.home} vs {ev.away}, {ev.location}
                          </span>
                          <IOSBubbleEmoji emoji={ev.emoji} active={isOn} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] flex flex-col items-center max-sm:-translate-y-32 sm:translate-y-0">
                <PhoneGlassStripOnly />
              </div>
            </div>
          </div>
        </div>

        <aside
          id={detailId}
          className="mx-auto flex w-full max-w-none flex-col justify-center max-sm:-mt-36 sm:mt-0 sm:max-w-xl lg:mx-0 lg:max-w-none"
          aria-live="polite"
        >
          <div className="lg:sticky lg:top-[28vh]">
            <EventDetailCard eventIndex={active} shown={shown} className="min-h-[220px] lg:min-h-[320px]" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function CardUsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

function CardMapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function CardCalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
      />
    </svg>
  );
}

function CardBookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

const AVATAR_BACKDROPS = [
  "bg-gradient-to-br from-emerald-400 to-teal-600",
  "bg-gradient-to-br from-sky-400 to-indigo-500",
  "bg-gradient-to-br from-amber-300 to-orange-500",
  "bg-gradient-to-br from-fuchsia-400 to-rose-500",
  "bg-gradient-to-br from-lime-300 to-emerald-600",
] as const;

function EventDetailCard({
  shown,
  eventIndex,
  className,
}: {
  shown: (typeof previewEvents)[number] | null;
  eventIndex: number | null;
  className?: string;
}) {
  const ui =
    shown && eventIndex !== null && previewEventCardPresentation[eventIndex] ?
      previewEventCardPresentation[eventIndex]
    : null;

  const hasDetail = Boolean(shown && ui);

  const fadeLayer =
    "transition-opacity duration-[1400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none motion-reduce:duration-0";

  const placeholder = (
    <div
      className={cn(
        "flex min-h-[220px] flex-col justify-center overflow-hidden rounded-none border border-dashed border-zinc-300/90 bg-white/80 px-6 py-12 text-center shadow-[0_18px_48px_-22px_rgb(15_23_42_/_0.12)] backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-100 sm:rounded-[1.75rem] lg:min-h-[280px]",
      )}
    >
      <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        In the 12th Fan app, explore fan events near you
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Tap on any event on a map to see details and join in!
      </p>
    </div>
  );

  const subtitle = ui ? `${ui.friendLead} + ${ui.extraFriends} more friends going — you in?` : "";

  return (
    <div className={cn("relative isolate overflow-hidden rounded-none sm:rounded-[1.75rem]", className)}>
      <div
        className={cn(
          fadeLayer,
          hasDetail ? "pointer-events-none absolute inset-0 z-0 opacity-0" : "relative z-10 opacity-100",
        )}
        aria-hidden={hasDetail}
      >
        {placeholder}
      </div>
      <div
        className={cn(
          fadeLayer,
          hasDetail ? "relative z-10 opacity-100" : "pointer-events-none absolute inset-0 z-0 opacity-0",
        )}
      >
        {hasDetail && ui && shown ?
          <article
            key={eventIndex}
            className={cn(
              "hologram-detail-card-enter flex flex-col overflow-hidden rounded-none border border-zinc-200/95 bg-white text-zinc-900 shadow-[0_22px_60px_-18px_rgb(15_23_42_/_0.14)] dark:border-zinc-200 dark:bg-white dark:shadow-[0_28px_72px_-28px_rgb(0_0_0_/_0.38)] sm:rounded-[1.75rem]",
            )}
          >
            <div className="relative h-44 w-full shrink-0 sm:h-52">
              <Image
                src={ui.crowdSrc}
                alt={`${shown.home} vs ${shown.away} — meetup preview`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 92vw, 380px"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/35 to-transparent" aria-hidden />
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full bg-black/20 p-2.5 text-white shadow-[0_4px_14px_-2px_rgb(0_0_0_/_0.45)] backdrop-blur-[2px] transition-[transform,background-color] hover:bg-black/30 hover:scale-105 active:scale-100"
                aria-label="Save this event"
              >
                <CardBookmarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col px-5 pb-6 pt-5 sm:px-6">
              <h3 className="text-balance text-center text-lg font-bold leading-snug tracking-tight text-[var(--brand-forest)] sm:text-xl">
                {ui.headline}
              </h3>
              <p className="mt-3 text-balance text-center text-sm italic leading-snug text-emerald-800/95">{subtitle}</p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm font-medium text-emerald-800/95">
                <span className="inline-flex items-center gap-1.5">
                  <CardUsersIcon className="h-4 w-4 shrink-0 opacity-90" />
                  {ui.going} going
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CardMapPinIcon className="h-4 w-4 shrink-0 opacity-90" />
                  {ui.miles} miles away
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CardCalendarIcon className="h-4 w-4 shrink-0 opacity-90" />
                  {ui.shortDate}
                </span>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="flex items-center justify-center -space-x-2.5 ps-1">
                  {AVATAR_BACKDROPS.map((bg, i) => (
                    <div key={`avatar-${i}`} className="relative shrink-0">
                      <div
                        className={cn(
                          "h-11 w-11 rounded-full ring-[3px] ring-white shadow-[0_4px_12px_-4px_rgb(0_0_0_/_0.25)]",
                          bg,
                        )}
                        aria-hidden
                      />
                      {i === 0 ?
                        <span
                          className="pointer-events-none absolute -bottom-1 -left-1 z-[1] select-none text-[1.05rem] drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.35)]"
                          aria-hidden
                        >
                          👑
                        </span>
                      : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="rounded-full border-2 border-emerald-700/85 bg-transparent py-3 text-center text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50/90 active:bg-emerald-100/80"
                >
                  More Details
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[var(--brand-forest)] py-3 text-center text-sm font-semibold text-white shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--brand-forest)_55%,transparent)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
                >
                  Join
                </button>
              </div>
            </div>
          </article>
        : null}
      </div>
    </div>
  );
}
