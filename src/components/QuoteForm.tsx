"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { contact } from "@/content/contact";

interface QuoteFormProps {
  mode?: "full" | "short";
}

export default function QuoteForm({ mode = "full" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In productie: POST naar API-route of e-mail service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text transition-colors placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelClasses = "block text-sm font-medium text-text mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Contact fields - always shown */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={labelClasses}>
            Naam <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="naam"
            name="naam"
            required
            placeholder="Uw naam"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-mailadres <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="uw@email.nl"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="telefoon" className={labelClasses}>
          Telefoonnummer <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="telefoon"
          name="telefoon"
          required
          placeholder="+31 6 ..."
          className={inputClasses}
        />
      </div>

      {mode === "full" && (
        <>
          {/* Date fields */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="laaddag" className={labelClasses}>
                Gewenste laaddag <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="laaddag"
                name="laaddag"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="losdag" className={labelClasses}>
                Gewenste losdag <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="losdag"
                name="losdag"
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Address fields */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="laadplaats" className={labelClasses}>
                Laadplaats (volledig adres){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="laadplaats"
                name="laadplaats"
                required
                rows={2}
                placeholder="Straat, postcode, stad, land"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="losplaats" className={labelClasses}>
                Losplaats (volledig adres){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="losplaats"
                name="losplaats"
                required
                rows={2}
                placeholder="Straat, postcode, stad, land"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Goods */}
          <div>
            <label htmlFor="goederen" className={labelClasses}>
              Goederenbeschrijving <span className="text-red-500">*</span>
            </label>
            <textarea
              id="goederen"
              name="goederen"
              required
              rows={2}
              placeholder="Wat wordt er vervoerd?"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="afmetingen" className={labelClasses}>
              Afmetingen en gewicht <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="afmetingen"
              name="afmetingen"
              required
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
        className="w-full rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-light"
      >
        {mode === "full" ? "Offerte aanvragen" : "Verstuur"}
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
