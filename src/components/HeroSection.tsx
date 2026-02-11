import Link from "next/link";

interface CTA {
  label: string;
  href: string;
}

interface HeroSectionProps {
  headline: string;
  subtext: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  compact?: boolean;
}

export default function HeroSection({
  headline,
  subtext,
  primaryCta,
  secondaryCta,
  compact = false,
}: HeroSectionProps) {
  return (
    <section
      className={`relative bg-gradient-to-br from-primary via-primary-light to-primary ${
        compact ? "py-16 lg:py-20" : "py-20 lg:py-32"
      }`}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className={`font-bold tracking-tight text-white ${
              compact
                ? "text-3xl lg:text-4xl"
                : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            }`}
          >
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 lg:text-xl">
            {subtext}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="w-full rounded-lg bg-accent px-8 py-4 text-center text-base font-semibold text-primary shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl sm:w-auto"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="w-full rounded-lg border-2 border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10 sm:w-auto"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
