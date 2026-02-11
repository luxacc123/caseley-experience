import HeroSection from "@/components/HeroSection";
import USPBar from "@/components/USPBar";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { contact } from "@/content/contact";

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Caseley Experience",
            description: "Wegtransport door heel Europa",
            founder: "Marc Caseley",
            foundingDate: "2018-08",
            telephone: "+31614385060",
            email: "info@caseleyexperience.nl",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Oosthoutlaan 4",
              postalCode: "2171 TZ",
              addressLocality: "Sassenheim",
              addressCountry: "NL",
            },
            openingHours: "Mo-Su 00:00-23:59",
            areaServed: "Europe",
          }),
        }}
      />

      <HeroSection
        headline="Uw transport door heel Europa. Geregeld binnen 30 minuten."
        subtext="Van spoedzending tot complete lading: Caseley Experience regelt uw wegtransport met 20+ jaar ervaring en een netwerk door heel Europa. 24/7 bereikbaar, reactie binnen 30 minuten."
        primaryCta={{ label: "Vraag een offerte aan", href: "/contact" }}
        secondaryCta={{
          label: `Bel ${contact.phoneDisplay}`,
          href: `tel:${contact.phone}`,
        }}
      />

      <USPBar />

      <ServicesGrid />

      <ProcessSteps
        steps={[
          {
            number: 1,
            title: "U deelt uw transportbehoefte",
            description: "Telefonisch, per mail, of via het formulier.",
          },
          {
            number: 2,
            title: "Wij schakelen ons netwerk in",
            description: "Direct contact met vervoerders.",
          },
          {
            number: 3,
            title: "Binnen 30 minuten een offerte",
            description: "Scherp, betrouwbaar, passend.",
          },
        ]}
        variant="compact"
      />

      {/* Over Marc - kort */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-primary lg:text-4xl">
              Persoonlijk contact met Marc Caseley
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              Caseley Experience is opgericht in 2018 door Marc Caseley. Met
              meer dan 20 jaar ervaring in transport en logistiek en een
              uitgebreid netwerk van vervoerders, biedt Marc persoonlijke
              begeleiding bij elke zending. Korte lijnen, snelle schakels, en de
              zekerheid dat uw goederen veilig aankomen — voor een concurrerende
              prijs.
            </p>
            <Link
              href="/over"
              className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-accent hover:text-accent-hover"
            >
              Lees meer over ons
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Klaar om te verzenden?"
        subtext="Bel, mail, of vul het formulier in. U ontvangt binnen een half uur een reactie."
        primaryCta={{ label: "Offerte aanvragen", href: "/contact" }}
        secondaryCta={{
          label: `Bel ${contact.phoneDisplay}`,
          href: `tel:${contact.phone}`,
        }}
      />
    </>
  );
}
