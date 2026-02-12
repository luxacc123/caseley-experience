"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { contact } from "@/content/contact";

interface QuoteFormProps {
  mode?: "full" | "short";
}

export default function QuoteForm({ mode = "full" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // In productie: POST naar API-route of e-mail service
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800">
          Bedankt voor uw aanvraag!
        </h3>
        <p className="mt-2 text-green-700">
          U ontvangt binnen 30 minuten een reactie.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-900"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {contact.phoneDisplay}
          </a>
          <span className="hidden text-green-400 sm:inline">|</span>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-900"
          >
            {contact.email}
          </a>
        </div>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text transition-colors placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelClasses = "block text-sm font-medium text-text mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={mode === "full" ? "Offerteformulier" : "Contactformulier"}
      className="space-y-6"
    >
      {mode === "full" && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm font-medium text-primary">
            Wat hebben wij nodig voor uw offerte?
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Laad- en losdag met tijdstip, volledige adressen,
            goederenbeschrijving met afmetingen/gewicht, en beschikbare
            faciliteiten.
          </p>
        </div>
      )}

      {/* Uw gegevens */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Uw gegevens
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="naam" className={labelClasses}>
              Naam{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="text"
              id="naam"
              name="naam"
              required
              aria-required="true"
              autoComplete="name"
              placeholder="Uw naam"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClasses}>
              E-mailadres{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              autoComplete="email"
              placeholder="uw@email.nl"
              className={inputClasses}
            />
          </div>
        </div>
        <div>
          <label htmlFor="telefoon" className={labelClasses}>
            Telefoonnummer{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="tel"
            id="telefoon"
            name="telefoon"
            required
            aria-required="true"
            autoComplete="tel"
            placeholder="+31 6 ..."
            className={inputClasses}
          />
        </div>
      </fieldset>

      {mode === "full" && (
        <>
          {/* Transportgegevens */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              Transportgegevens
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="laaddag" className={labelClasses}>
                  Gewenste laaddag{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="date"
                  id="laaddag"
                  name="laaddag"
                  required
                  aria-required="true"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="laadtijd" className={labelClasses}>
                  Gewenste laadtijd{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="time"
                  id="laadtijd"
                  name="laadtijd"
                  required
                  aria-required="true"
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="losdag" className={labelClasses}>
                  Gewenste losdag{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="date"
                  id="losdag"
                  name="losdag"
                  required
                  aria-required="true"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="lostijd" className={labelClasses}>
                  Gewenste lostijd{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="time"
                  id="lostijd"
                  name="lostijd"
                  required
                  aria-required="true"
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="laadplaats" className={labelClasses}>
                  Laadplaats (volledig adres){" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="laadplaats"
                  name="laadplaats"
                  required
                  aria-required="true"
                  rows={2}
                  placeholder="Straat, postcode, stad, land"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="losplaats" className={labelClasses}>
                  Losplaats (volledig adres){" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="losplaats"
                  name="losplaats"
                  required
                  aria-required="true"
                  rows={2}
                  placeholder="Straat, postcode, stad, land"
                  className={inputClasses}
                />
              </div>
            </div>
          </fieldset>

          {/* Goederen */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              Goederen
            </legend>
            <div>
              <label htmlFor="goederen" className={labelClasses}>
                Goederenbeschrijving{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="goederen"
                name="goederen"
                required
                aria-required="true"
                rows={2}
                placeholder="Wat wordt er vervoerd?"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="afmetingen" className={labelClasses}>
                Afmetingen en gewicht{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="afmetingen"
                name="afmetingen"
                required
                aria-required="true"
                placeholder="Bijv. 2 pallets, 120x80x100 cm, 500 kg"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="faciliteiten" className={labelClasses}>
                Faciliteiten / klep nodig?
              </label>
              <textarea
                id="faciliteiten"
                name="faciliteiten"
                rows={2}
                placeholder="Laad-/losfaciliteiten, klep, etc."
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="dienst" className={labelClasses}>
                Type dienst
              </label>
              <select id="dienst" name="dienst" className={inputClasses}>
                <option value="">— Selecteer (optioneel) —</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </>
      )}

      {/* Message - always shown */}
      <div>
        <label htmlFor="opmerkingen" className={labelClasses}>
          {mode === "short" ? "Uw bericht" : "Opmerkingen"}
        </label>
        <textarea
          id="opmerkingen"
          name="opmerkingen"
          rows={3}
          placeholder={
            mode === "short"
              ? "Stel uw vraag..."
              : "Overige opmerkingen (optioneel)"
          }
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? "Verzenden..."
          : mode === "full"
            ? "Offerte aanvragen"
            : "Verstuur"}
      </button>

      <p className="text-center text-sm text-text-muted">
        Of bel direct:{" "}
        <a
          href={`tel:${contact.phone}`}
          className="font-semibold text-primary hover:text-accent"
        >
          {contact.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
