import Image from "next/image";

import SocialCardSwap from "@/components/SocialCardSwap";

/** Social stack; lives below the hologram / events preview on the homepage. */
export default function HomeSocialSection() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,460px)] lg:items-center lg:gap-12 xl:gap-16">
        <div className="mx-auto w-full max-w-2xl text-center text-balance lg:justify-self-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-forest)] dark:text-emerald-400 sm:text-4xl">
            Social Feed
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-7">
            Follow the journey, share the moments and meet supporters who care about women&apos;s sport as much as you do.
          </p>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Image
              src="/app-icon.png"
              alt="12th Fan app icon"
              width={512}
              height={512}
              className="h-auto w-[min(200px,52vw)] rounded-[22%] shadow-[0_20px_50px_-18px_rgb(15_23_42_/_0.25)] ring-1 ring-zinc-200/90 dark:shadow-[0_24px_56px_-20px_rgb(0_0_0_/_0.45)] dark:ring-zinc-600/50 sm:w-[220px]"
              sizes="(max-width: 1024px) 52vw, 220px"
            />
          </div>
        </div>

        <div className="flex w-full min-w-0 justify-center lg:justify-end">
          <SocialCardSwap />
        </div>
      </div>
    </div>
  );
}
