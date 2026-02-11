import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import QuoteForm from "@/components/QuoteForm";
import ContactCard from "@/components/ContactCard";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op: ${contact.phoneDisplay} of ${contact.email}. Reactie binnen 30 minuten.`,
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        headline="Neem contact op met Caseley Experience"
        subtext="Bel, mail, of vul het formulier in. U ontvangt binnen een half uur een reactie."
        compact
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-primary">
                Vraag een offerte aan
              </h2>
              <p className="mt-2 text-text-muted">
                Vul onderstaande gegevens in of stel direct een vraag.
              </p>
              <div className="mt-8">
                <QuoteForm mode="full" />
              </div>
            </div>

            {/* Right: Contact card */}
            <div className="lg:col-span-2">
              <ContactCard />
            </div>
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="border-t border-border bg-surface py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote className="text-lg italic text-text-muted">
            &ldquo;Ik kijk uit naar een prettige samenwerking.&rdquo;
          </blockquote>
          <p className="mt-2 font-semibold text-primary">— Marc Caseley</p>
        </div>
      </section>
    </>
  );
}
