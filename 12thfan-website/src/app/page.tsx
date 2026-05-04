import Image from "next/image";
import Link from "next/link";

import BorderGlow from "@/components/BorderGlow/BorderGlow";
import AppPreviewPhones from "@/components/AppPreviewPhones";
import HomeJoinSection from "@/components/HomeJoinSection";
import HomeSocialSection from "@/components/HomeSocialSection";
import PhoneHologramMapSection from "@/components/PhoneHologramMapSection";
import ZoomSnapSection from "@/components/ZoomSnapSection";
import { cn } from "@/lib/utils";

const featureSectionCardClass =
  "group relative isolate rounded-2xl border border-zinc-200/80 bg-white p-8 text-center shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[5px] hover:border-emerald-300 hover:shadow-[0_22px_55px_-18px_rgb(16_185_129_/_0.34),0_0_52px_-14px_rgb(52_211_153_/_0.45),0_0_92px_-28px_rgb(110_231_183_/_0.38)] dark:border-zinc-800 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_-12px_rgb(0_0_0_/_0.35)] dark:hover:border-emerald-400/65 dark:hover:shadow-[0_28px_70px_-16px_rgb(16_185_129_/_0.48),0_0_72px_-12px_rgb(52_211_153_/_0.52),0_0_110px_-26px_rgb(167_243_208_/_0.26)]";

/** Emerald pool-of-light under a feature card; only visible on card hover */
function FeatureCardUnderGlow() {
  return (
    <div
      className="pointer-events-none absolute -bottom-2 left-1/2 z-0 h-[min(220px,48vw)] w-[min(124%,380px)] -translate-x-1/2 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100 motion-reduce:transition-none"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_72%_at_50%_0%,color-mix(in_srgb,#6ee7b7_52%,transparent)_0%,color-mix(in_srgb,#34d399_32%,transparent)_38%,color-mix(in_srgb,var(--brand-forest)_18%,transparent)_62%,transparent_82%)] blur-[48px] sm:blur-[56px]" />
      <div className="absolute left-1/2 top-[38%] h-[min(160px,36vw)] w-[min(108%,320px)] -translate-x-1/2 bg-[radial-gradient(ellipse_100%_80%_at_50%_20%,color-mix(in_srgb,#a7f3d0_38%,transparent)_0%,color-mix(in_srgb,#34d399_22%,transparent)_45%,transparent_72%)] blur-[64px] sm:blur-[76px]" />
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
    </svg>
  );
}

function FansIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function CommunityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-transparent text-zinc-900 dark:text-zinc-50">
      <ZoomSnapSection
        className="overflow-hidden bg-[color-mix(in_srgb,var(--bg-gradient-from)_55%,#fbf9f3)] dark:bg-zinc-950 max-sm:-mt-[calc(4.5rem+env(safe-area-inset-top,0px))]"
        backdrop={
          <>
            {/* Stronger forest wash — visible against tinted base; warm veil near top for logo contrast */}
            <div
              className="pointer-events-none absolute inset-0 z-0 min-h-full bg-[radial-gradient(ellipse_155%_92%_at_50%_108%,color-mix(in_srgb,var(--brand-forest)_44%,transparent)_0%,color-mix(in_srgb,var(--brand-forest)_16%,transparent)_48%,transparent_72%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 min-h-full bg-[linear-gradient(to_bottom,#fbf9f3_0%,color-mix(in_srgb,#fbf9f3_65%,transparent)_18%,transparent_32%)] dark:bg-[linear-gradient(to_bottom,#09090b_0%,color-mix(in_srgb,#09090b_82%,transparent)_22%,transparent_40%)]"
              aria-hidden
            />
            {/* Fade into the next section */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-linear-to-t from-[color-mix(in_srgb,var(--bg-gradient-from)_70%,#fbf9f3)] to-transparent sm:h-44 dark:from-zinc-950 dark:to-transparent"
              aria-hidden
            />
          </>
        }
      >
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-4 pb-20 text-center max-sm:-translate-y-8 max-sm:pt-[calc(5rem+4.5rem+env(safe-area-inset-top,0px))] sm:translate-y-0 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <h1 className="mx-auto flex w-full max-w-[min(100%,32rem)] justify-center">
            <Image
              src="/logo-clear.png"
              alt="12th Fan"
              width={1553}
              height={1013}
              priority
              sizes="(max-width: 640px) 54vw, (max-width: 1024px) 48vw, 32rem"
              className="h-auto w-full object-contain dark:brightness-110"
            />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-3xl tracking-tight text-[color-mix(in_srgb,#ecfdf5_88%,white)] sm:text-4xl [font-family:var(--font-passion-one)] [text-shadow:0_1px_2px_rgb(0_0_0_/_0.6)]">
            <span>Experience women&apos;s </span>
            <span className="block sm:inline">sport together</span>
          </p>
          <div className="mx-auto mt-10 flex justify-center">
            <BorderGlow
              className="w-full max-w-sm sm:w-auto sm:max-w-none"
              edgeSensitivity={30}
              glowColor="158 72% 52%"
              backgroundColor="#1a4336"
              borderRadius={9999}
              glowRadius={36}
              glowIntensity={1.1}
              coneSpread={26}
              animated
              animationLoop
              colors={["#6ee7b7", "#34d399", "#a7f3d0"]}
              fillOpacity={0.42}
            >
              <Link
                href="/signup"
                className="inline-flex h-12 w-full items-center justify-center px-8 text-base font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--brand-forest)_65%,#171717)] dark:focus-visible:outline-white/70"
              >
                Be the first to join.
              </Link>
            </BorderGlow>
          </div>
        </div>
      </ZoomSnapSection>

      <ZoomSnapSection
        id="app-preview"
        className="group/app-preview relative max-sm:z-[15] max-sm:overflow-x-clip max-sm:overflow-y-visible sm:overflow-hidden max-sm:border-b-0 sm:border-b sm:border-zinc-200/50 bg-linear-to-b from-emerald-50/35 via-white/88 to-white/82 dark:sm:border-zinc-800/50 dark:from-emerald-950/35 dark:via-zinc-950/90 dark:to-zinc-950/85"
        backdrop={
          <div
            className="app-preview-blob-drift pointer-events-none absolute left-1/2 top-[20%] z-0 h-[min(50vh,420px)] w-[min(100%,520px)] rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--brand-forest)_14%,transparent),transparent)] blur-[80px]"
            aria-hidden
          />
        }
      >
        <AppPreviewPhones />
      </ZoomSnapSection>

      <ZoomSnapSection
        id="features"
        fullViewport={false}
        className="relative border-b border-emerald-950/25 bg-[var(--brand-forest)] pt-16 pb-12 dark:border-emerald-900/40 sm:pt-20 sm:pb-14"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything in one place</h2>
            <p className="mt-4 text-lg leading-relaxed text-emerald-100/90">
              From match days to meetups. 12th Fan helps you stay close to the game and the people who love it.
              We&apos;re building a safe, inclusive social space where everyone can enjoy sport and connect freely.
            </p>
          </div>
          <div className="relative mt-14">
            <ul className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <li className={featureSectionCardClass}>
                <FeatureCardUnderGlow />
                <div className="relative z-10">
                  <div className="mx-auto inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700 transition-[color,background-color] duration-[1200ms] ease-in-out group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/80 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                    <CalendarIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">Discover Events</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Browse fixtures, watch parties, and grassroots matches tailored to the teams and cities you care about.
                  </p>
                </div>
              </li>
              <li className={featureSectionCardClass}>
                <FeatureCardUnderGlow />
                <div className="relative z-10">
                  <div className="mx-auto inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700 transition-[color,background-color] duration-[1200ms] ease-in-out group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/80 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                    <FansIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">Meet Fans Near You</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Find supporters in your area, swap stories, and turn solo viewing into shared moments on the terrace.
                  </p>
                </div>
              </li>
              <li className={cn(featureSectionCardClass, "sm:col-span-2 lg:col-span-1")}>
                <FeatureCardUnderGlow />
                <div className="relative z-10">
                  <div className="mx-auto inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700 transition-[color,background-color] duration-[1200ms] ease-in-out group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/80 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                    <CommunityIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">Build Your Community</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Create groups, host events, and grow a space where women&apos;s sport is always the main event.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </ZoomSnapSection>

      <ZoomSnapSection
        id="hologram-map"
        entrance="fade"
        className="relative overflow-hidden border-b border-zinc-200/50 bg-linear-to-b from-white via-emerald-50/30 to-white scroll-mt-24 dark:border-zinc-800/50 dark:from-zinc-950 dark:via-emerald-950/25 dark:to-zinc-950 sm:scroll-mt-28"
      >
        <PhoneHologramMapSection />
      </ZoomSnapSection>

      <ZoomSnapSection
        id="events-social"
        fullViewport={false}
        className="scroll-mt-24 border-t border-zinc-200/50 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-950 sm:scroll-mt-28"
      >
        <HomeSocialSection />
      </ZoomSnapSection>

      <ZoomSnapSection
        id="join-12th-fan"
        className="scroll-mt-24 border-t border-zinc-200/50 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-950 sm:scroll-mt-28"
      >
        <HomeJoinSection />
      </ZoomSnapSection>

    </div>
  );
}
