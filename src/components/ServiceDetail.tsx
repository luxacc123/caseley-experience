import Link from "next/link";
import type { Service } from "@/content/services";

interface ServiceDetailProps {
  service: Service;
  index: number;
}

export default function ServiceDetail({ service, index }: ServiceDetailProps) {
  const isPhone = service.ctaHref.startsWith("tel:");

  return (
    <div
      id={service.id}
      className={`scroll-mt-28 py-12 lg:scroll-mt-32 ${index % 2 === 0 ? "" : "bg-surface"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-2xl font-bold text-primary">{service.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            {service.fullDescription}
          </p>
          <div className="mt-6">
            {isPhone ? (
              <a
                href={service.ctaHref}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
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
                {service.ctaLabel}
              </a>
            ) : (
              <Link
                href={service.ctaHref}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                {service.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
