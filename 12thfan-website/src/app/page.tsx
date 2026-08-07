import Image from "next/image";

import AppPreviewPhones from "@/components/AppPreviewPhones";
import HomeContactSection from "@/components/HomeContactSection";
import ZoomSnapSection from "@/components/ZoomSnapSection";
import { cn } from "@/lib/utils";

/** Official App Store listing for 12th Fan */
const APP_STORE_URL = "https://apps.apple.com/app/id6760150584";

const featureItemClass = "mx-auto max-w-sm text-center";

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
    <div className="flex min-h-full flex-col bg-transparent text-[var(--foreground)]">
      <ZoomSnapSection
        className="home-hero-gradient overflow-hidden max-sm:-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] max-sm:z-20"
      >
        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col items-center justify-center px-4 pb-16 text-center max-sm:pt-[calc(5.75rem+4.5rem+env(safe-area-inset-top,0px))] sm:px-6 sm:pb-20 lg:px-8">
          <h1 className="mx-auto flex w-full max-w-[min(100%,16rem)] justify-center sm:max-w-[18rem] lg:max-w-[24rem]">
            <Image
              src="/all-green-logo.png"
              alt="12th Fan"
              width={1792}
              height={1284}
              priority
              sizes="(max-width: 640px) 64vw, (max-width: 1024px) 18rem, 24rem"
              className="h-auto w-full object-contain"
            />
          </h1>
          <p className="hero-slogan-delayed-fade mx-auto mt-7 max-w-xl text-balance text-xl tracking-tight text-[var(--brand-forest)] sm:mt-8 sm:text-2xl lg:text-3xl [font-family:var(--font-passion-one)]">
            Your Women&apos;s Sport App.
          </p>
          <div className="hero-slogan-delayed-fade mx-auto mt-9 flex justify-center sm:mt-10">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-w-[16rem] items-center justify-center rounded-2xl bg-linear-to-br from-[var(--brand-light)] via-[var(--brand-mid)] to-[var(--brand-forest)] px-10 text-xl font-semibold uppercase tracking-tight text-white shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--brand-forest)_55%,transparent)] transition-[filter,transform] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--brand-forest)_65%,#171717)] active:scale-[0.98] sm:h-16 sm:min-w-[18rem] sm:px-12 sm:text-2xl [font-family:var(--font-passion-one)]"
            >
              Download 12th Fan
            </a>
          </div>
        </div>
      </ZoomSnapSection>

      <ZoomSnapSection
        id="app-preview"
        className="group/app-preview relative max-sm:z-[15] max-sm:overflow-x-clip max-sm:overflow-y-visible sm:overflow-hidden"
        backdrop={
          <div
            className="app-preview-blob-drift pointer-events-none absolute left-1/2 top-[45%] z-0 h-[min(42vh,360px)] w-[min(90%,480px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--brand-mid)_16%,transparent),transparent_70%)] blur-[72px]"
            aria-hidden
          />
        }
      >
        <AppPreviewPhones />
      </ZoomSnapSection>

      <ZoomSnapSection
        id="features"
        fullViewport={false}
        className="relative scroll-mt-24 pt-16 pb-14 sm:scroll-mt-28 sm:pt-20 sm:pb-16"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-forest)] sm:text-4xl">
              Everything in one place
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              From match days to meetups. 12th Fan helps you stay close to the game and the people who love it.
              We&apos;re building a safe, inclusive social space where everyone can enjoy sport and connect freely.
            </p>
          </div>
          <ul className="relative z-10 mt-14 grid gap-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
            <li className={featureItemClass}>
              <div className="mx-auto inline-flex text-[var(--brand-mid)]">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--brand-forest)]">Discover Events</h3>
              <p className="mt-3 leading-relaxed text-zinc-600">
                Discover women&apos;s sport near you, from upcoming fixtures and watch parties to grassroots matches and events.
              </p>
            </li>
            <li className={featureItemClass}>
              <div className="mx-auto inline-flex text-[var(--brand-mid)]">
                <FansIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--brand-forest)]">Meet Fans Near You</h3>
              <p className="mt-3 leading-relaxed text-zinc-600">
                Find supporters in your area, swap stories, and turn solo viewing into shared moments on the terrace.
              </p>
            </li>
            <li className={cn(featureItemClass, "sm:col-span-2 lg:col-span-1")}>
              <div className="mx-auto inline-flex text-[var(--brand-mid)]">
                <CommunityIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--brand-forest)]">Build Your Community</h3>
              <p className="mt-3 leading-relaxed text-zinc-600">
                Create groups, host events, and grow a space where women&apos;s sport is always the main event.
              </p>
            </li>
          </ul>
        </div>
      </ZoomSnapSection>

      <ZoomSnapSection
        id="contact"
        className="scroll-mt-24 sm:scroll-mt-28"
      >
        <HomeContactSection />
      </ZoomSnapSection>
    </div>
  );
}
