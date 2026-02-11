import { contact } from "@/content/contact";

export default function ContactCard() {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm lg:p-8">
      <h3 className="text-lg font-semibold text-primary">Contactgegevens</h3>

      <dl className="mt-6 space-y-4">
        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-lg bg-surface p-2 text-accent">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <dt className="text-sm font-medium text-text-muted">Telefoon</dt>
            <dd>
              <a
                href={`tel:${contact.phone}`}
                className="text-base font-semibold text-primary hover:text-accent"
              >
                {contact.phoneDisplay}
              </a>
            </dd>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-lg bg-surface p-2 text-accent">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <dt className="text-sm font-medium text-text-muted">E-mail</dt>
            <dd>
              <a
                href={`mailto:${contact.email}`}
                className="text-base font-semibold text-primary hover:text-accent"
              >
                {contact.email}
              </a>
            </dd>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-lg bg-surface p-2 text-accent">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <dt className="text-sm font-medium text-text-muted">Adres</dt>
            <dd className="text-base text-text">
              {contact.address.street}
              <br />
              {contact.address.postal} {contact.address.city}
            </dd>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-lg bg-surface p-2 text-accent">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <dt className="text-sm font-medium text-text-muted">
              Bereikbaarheid
            </dt>
            <dd className="text-base text-text">
              {contact.availability}
              <br />
              <span className="text-sm text-text-muted">
                {contact.responseTime}
              </span>
            </dd>
          </div>
        </div>
      </dl>

      {/* Business details */}
      <div className="mt-8 border-t border-border pt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Bedrijfsgegevens
        </h4>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-text-muted">KvK</dt>
            <dd className="font-medium text-text">{contact.kvk}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">BTW</dt>
            <dd className="font-medium text-text">{contact.btw}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">IBAN</dt>
            <dd className="font-medium text-text">{contact.iban}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">BIC</dt>
            <dd className="font-medium text-text">{contact.bic}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
