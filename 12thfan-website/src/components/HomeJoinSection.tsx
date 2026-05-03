import { SignupForm } from "@/app/signup/SignupForm";

/** Waitlist form; sits in its own scroll-snap region so it can land at the top of the viewport. */
export default function HomeJoinSection() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-16">
      <section aria-labelledby="social-join-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="social-join-heading"
            className="text-balance text-center text-2xl font-bold tracking-tight text-[var(--brand-forest)] dark:text-emerald-400 sm:text-3xl"
          >
            Join 12th Fan
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:mt-5">
            Be among the first to become part of 12th Fan.
          </p>

          <div className="mt-10 w-full min-w-0 rounded-2xl border border-zinc-200/90 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-zinc-700/80 dark:bg-zinc-900/35 sm:mt-12 sm:p-10 lg:mt-10 lg:p-12">
            <SignupForm />
          </div>
        </div>
      </section>
    </div>
  );
}
