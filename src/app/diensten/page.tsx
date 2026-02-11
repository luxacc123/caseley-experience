import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServiceDetail from "@/components/ServiceDetail";
import { services } from "@/content/services";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Complete ladingen, spoedzendingen, geconditioneerd en exceptioneel transport. Ontdek onze 7 transportdiensten.",
};

export default function DienstenPage() {
  return (
    <>
      <HeroSection
        headline="Onze diensten — transport op maat"
        subtext="Van een kleine koerierszending tot exceptioneel transport: wij regelen het. Persoonlijk, snel, en betrouwbaar."
        compact
      />

      {/* Anchor quick-nav */}
      <section className="border-b border-border bg-white sticky top-16 z-40 lg:top-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service details */}
      <div>
        {services.map((service, i) => (
          <ServiceDetail key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Twijfel-CTA */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary lg:text-3xl">
            Niet zeker welke dienst u nodig heeft?
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Geen probleem. Bel of mail ons — we denken graag mee.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              Bel direct
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Mail ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
