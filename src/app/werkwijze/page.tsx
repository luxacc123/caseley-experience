import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ProcessSteps from "@/components/ProcessSteps";
import ChecklistBlock from "@/components/ChecklistBlock";
import QuoteForm from "@/components/QuoteForm";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: "Werkwijze",
  description:
    "Zo werkt een aanvraag. Deel uw transportbehoefte en ontvang binnen 30 minuten een offerte.",
};

export default function WerkwijzePage() {
  return (
    <>
      <HeroSection
        headline="Van aanvraag tot levering — zo werkt het"
        subtext="Wij schakelen direct met ons netwerk van vervoerders. Geef ons de details, en u ontvangt binnen 30 minuten een offerte."
        compact
      />

      <ProcessSteps
        steps={[
          {
            number: 1,
            title: "Deel uw transportbehoefte",
            description:
              "Bel, mail, of vul het formulier in met de gegevens van uw zending.",
          },
          {
            number: 2,
            title: "Wij zoeken de beste vervoerder",
            description:
              "Via ons netwerk schakelen we direct met vervoerders die bij uw zending passen.",
          },
          {
            number: 3,
            title: "Offerte binnen 30 minuten",
            description:
              "U ontvangt een scherpe offerte. Akkoord? Dan regelen wij de rest.",
          },
          {
            number: 4,
            title: "Uw zending wordt opgepakt",
            description: "Veilig, betrouwbaar, en op de afgesproken datum.",
          },
        ]}
        variant="full"
      />

      <ChecklistBlock />

      {/* Exceptioneel transport uitzondering */}
      <section className="bg-surface py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary">
            Exceptioneel transport? Bel eerst even.
          </h2>
          <p className="mt-4 text-text-muted">
            Bij niet-standaard maten of gewichten stemmen we graag eerst
            telefonisch de verwachtingen af. Zo voorkomen we verrassingen.
          </p>
          <a
            href={`tel:${contact.phone}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Bel {contact.phoneDisplay}
          </a>
        </div>
      </section>

      {/* Quote form */}
      <section id="offerte-formulier" className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary lg:text-4xl">
              Vraag direct een offerte aan
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Vul onderstaande gegevens in. U ontvangt binnen 30 minuten een
              reactie.
            </p>
          </div>
          <div className="mt-10">
            <QuoteForm mode="full" />
          </div>
        </div>
      </section>
    </>
  );
}
