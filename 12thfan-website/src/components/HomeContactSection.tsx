import { ContactForm } from "@/app/contact/ContactForm";

/** Contact form at the bottom of the homepage. */
export default function HomeContactSection() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-16">
      <section aria-labelledby="home-contact-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="home-contact-heading"
            className="text-balance text-center text-2xl font-bold tracking-tight text-[var(--brand-forest)] sm:text-3xl"
          >
            Contact us
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-base leading-relaxed text-zinc-600 sm:mt-5">
            Send us a note — questions, partnerships, feedback, we&apos;d love to hear from you.
          </p>

          <div className="mt-10 w-full min-w-0 sm:mt-12 lg:mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
