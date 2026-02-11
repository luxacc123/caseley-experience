import Link from "next/link";

interface CTA {
  label: string;
  href: string;
}

interface CTASectionProps {
  headline: string;
  subtext: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
}

export default function CTASection({
  headline,
  subtext,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-white/80">{subtext}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="w-full rounded-lg bg-accent px-8 py-4 text-center text-base font-semibold text-primary shadow-lg transition-all hover:bg-accent-hover sm:w-auto"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="w-full rounded-lg border-2 border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10 sm:w-auto"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
