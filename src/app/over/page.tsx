import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Marc Caseley: 20+ jaar ervaring in transport en logistiek. Persoonlijk contact, betrouwbaar netwerk.",
};

const kernwaarden = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Korte communicatielijnen",
    description: "Geen omwegen — direct contact met Marc.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Kennis van zaken",
    description: "20+ jaar ervaring in transport en logistiek.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Oplossingsgerichte werkwijze",
    description: "Altijd meedenken, altijd een passende oplossing.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Persoonlijk contact",
    description: "Eén vast aanspreekpunt voor elke zending.",
  },
];

export default function OverPage() {
  return (
    <>
      <HeroSection
        headline="20+ jaar ervaring. Eén persoonlijk aanspreekpunt."
        subtext="Caseley Experience is opgericht in augustus 2018 door Marc Caseley. Met meer dan twee decennia ervaring in transport en logistiek staat persoonlijk contact centraal."
        compact
      />

      {/* Het verhaal */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-primary lg:text-4xl">
              Over Caseley Experience
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-text-muted">
              <p>
                Na 20+ jaar in de transport- en logistiekbranche richtte Marc
                Caseley in augustus 2018 Caseley Experience op. Het idee:
                wegtransport regelen zoals het hoort — snel, persoonlijk, en
                zonder omwegen.
              </p>
              <p>
                Marc werkt met een uitgebreid netwerk van vervoerders, binnen en
                buiten Europa. Bij voorkeur werkt hij met Nederlandse
                vervoerders, voor langdurige en betrouwbare relaties.
              </p>
              <p>
                De werkwijze is eenvoudig: korte communicatielijnen, kennis van
                zaken, een oplossingsgerichte aanpak, en persoonlijk contact bij
                elke zending.
              </p>
              <p className="font-medium text-primary">
                De belofte: uw goederen komen op de meest veilige en vertrouwde
                manier op de plaats van bestemming aan. En dit voor een
                concurrerende prijs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kernwaarden */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-primary lg:text-4xl">
            Onze kernwaarden
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {kernwaarden.map((kw) => (
              <div
                key={kw.title}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                  {kw.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  {kw.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{kw.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Belofte */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary lg:text-4xl">
            Onze belofte
          </h2>
          <blockquote className="mt-8 text-xl leading-relaxed text-text-muted italic">
            &ldquo;Uw goederen zullen op de meest veilige en vertrouwde manier
            op de plaats van bestemming aankomen. En dit voor een concurrerende
            prijs.&rdquo;
          </blockquote>
          <p className="mt-6 text-text-muted">
            We bieden ook on-site consultaties aan. Neem contact op om de
            mogelijkheden te bespreken.
          </p>
        </div>
      </section>

      <CTASection
        headline="Laten we samenwerken"
        subtext="Neem contact op en ontdek wat Caseley Experience voor u kan betekenen."
        primaryCta={{ label: "Neem contact op", href: "/contact" }}
      />
    </>
  );
}
