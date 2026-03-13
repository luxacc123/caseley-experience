"use client";

import { useState, useRef } from "react";
import { services } from "@/content/services";
import { contact } from "@/content/contact";

interface QuoteFormProps {
  mode?: "full" | "short";
}

const UNIT_TYPES = [
  { value: "europallet", label: "Europallet", length: 120, width: 80 },
  { value: "blokpallet", label: "Blokpallet", length: 120, width: 100 },
  { value: "wegwerppallet", label: "Wegwerp pallet", length: null, width: null },
  { value: "rolcontainer", label: "Rolcontainer", length: 80, width: 70 },
  { value: "doos_colli", label: "Doos / Colli", length: null, width: null },
  { value: "anders", label: "Anders", length: null, width: null },
] as const;

export default function QuoteForm({ mode = "full" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationSummary, setValidationSummary] = useState<string | null>(null);
  const [vensterErrors, setVensterErrors] = useState<{
    laad?: string;
    los?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Structured dimensions state
  const [unitType, setUnitType] = useState("");
  const [lengthCm, setLengthCm] = useState("");
  const [widthCm, setWidthCm] = useState("");
  const [showCustomDimensions, setShowCustomDimensions] = useState(false);

  // Facilities state
  const [facilityNotes, setFacilityNotes] = useState("");

  function handleUnitTypeChange(value: string) {
    setUnitType(value);
    const preset = UNIT_TYPES.find((u) => u.value === value);
    if (preset?.length && preset?.width) {
      setLengthCm(String(preset.length));
      setWidthCm(String(preset.width));
      setShowCustomDimensions(false);
    } else {
      setLengthCm("");
      setWidthCm("");
      setShowCustomDimensions(value === "anders");
    }
  }

  const needsDimensionInputs =
    unitType === "anders" ||
    unitType === "wegwerppallet" ||
    unitType === "doos_colli" ||
    showCustomDimensions;

  /**
   * Parse "HH:MM" to minutes since midnight.
   * Returns null for empty/invalid input.
   */
  function timeToMinutes(t: string): number | null {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  }

  /**
   * Validate a time window. Overnight windows are allowed
   * (e.g. 23:30→00:15 = 45 min), but zero-length windows are rejected.
   */
  function isValidTimeWindow(from: string, to: string): boolean {
    const fromMin = timeToMinutes(from);
    const toMin = timeToMinutes(to);
    if (fromMin === null || toMin === null) return true; // incomplete = skip
    // Compute duration: if toMin < fromMin, treat as overnight (next day)
    const duration = toMin >= fromMin
      ? toMin - fromMin
      : (1440 - fromMin) + toMin; // 1440 = 24*60
    console.log(`[TimeWindow] from=${from} (${fromMin}min) → to=${to} (${toMin}min) | duration=${duration}min | valid=${duration > 0}`);
    return duration > 0; // zero-length = invalid, everything else = valid
  }

  function validateVensters(form: HTMLFormElement): boolean {
    const laadVanaf = form.elements.namedItem("laadvensterVanaf") as HTMLInputElement | null;
    const laadTot = form.elements.namedItem("laadvensterTot") as HTMLInputElement | null;
    const losVanaf = form.elements.namedItem("losvensterVanaf") as HTMLInputElement | null;
    const losTot = form.elements.namedItem("losvensterTot") as HTMLInputElement | null;

    console.log(`[validateVensters] pickup: ${laadVanaf?.value} → ${laadTot?.value} | dropoff: ${losVanaf?.value} → ${losTot?.value}`);

    const errors: { laad?: string; los?: string } = {};

    if (laadVanaf?.value && laadTot?.value && !isValidTimeWindow(laadVanaf.value, laadTot.value)) {
      errors.laad = "\"Vanaf\" en \"tot\" mogen niet gelijk zijn.";
    }
    if (losVanaf?.value && losTot?.value && !isValidTimeWindow(losVanaf.value, losTot.value)) {
      errors.los = "\"Vanaf\" en \"tot\" mogen niet gelijk zijn.";
    }

    setVensterErrors(errors);
    return !errors.laad && !errors.los;
  }

  function buildTimeWindow(from: string, to: string): string | null {
    if (!from && !to) return null;
    return `${from}–${to}`;
  }

  /**
   * Scroll smoothly to the first invalid field and focus it.
   * Checks both native :invalid fields and venster-error fields.
   */
  function scrollToFirstInvalid(form: HTMLFormElement) {
    // Collect all invalid elements: native + venster errors
    const candidates: HTMLElement[] = [];

    const nativeInvalid = form.querySelector(":invalid:not(fieldset)") as HTMLElement | null;
    if (nativeInvalid) candidates.push(nativeInvalid);

    // Check venster error fields (by re-reading from form, since state may not have flushed)
    const lv = form.elements.namedItem("laadvensterVanaf") as HTMLInputElement | null;
    const lt = form.elements.namedItem("laadvensterTot") as HTMLInputElement | null;
    if (lv?.value && lt?.value && !isValidTimeWindow(lv.value, lt.value) && lv) {
      candidates.push(lv);
    }
    const rv = form.elements.namedItem("losvensterVanaf") as HTMLInputElement | null;
    const rt = form.elements.namedItem("losvensterTot") as HTMLInputElement | null;
    if (rv?.value && rt?.value && !isValidTimeWindow(rv.value, rt.value) && rv) {
      candidates.push(rv);
    }

    // Pick the one highest in DOM order (lowest offsetTop)
    const first = candidates.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.top - rectB.top;
    })[0];

    if (first) {
      first.scrollIntoView({ behavior: "smooth", block: "center" });
      first.focus({ preventScroll: true });
    }
  }

  /**
   * Count how many required fields are currently invalid (browser validation).
   */
  function countInvalidFields(form: HTMLFormElement): number {
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input, textarea, select"
    );
    let count = 0;
    for (const el of inputs) {
      if (!el.checkValidity()) count++;
    }
    return count;
  }

  /**
   * Explicit validation pass: check browser validity + venster logic,
   * show summary, scroll to first error. Returns true if form is valid.
   */
  function runFullValidation(form: HTMLFormElement): boolean {
    const vensterOk = validateVensters(form);
    const invalidCount = countInvalidFields(form);

    // Count venster errors (set by validateVensters above, but we need
    // to count from the return since state hasn't flushed yet)
    let vensterErrorCount = 0;
    if (!vensterOk) {
      const lv = form.elements.namedItem("laadvensterVanaf") as HTMLInputElement | null;
      const lt = form.elements.namedItem("laadvensterTot") as HTMLInputElement | null;
      const rv = form.elements.namedItem("losvensterVanaf") as HTMLInputElement | null;
      const rt = form.elements.namedItem("losvensterTot") as HTMLInputElement | null;
      if (lv?.value && lt?.value && !isValidTimeWindow(lv.value, lt.value)) vensterErrorCount++;
      if (rv?.value && rt?.value && !isValidTimeWindow(rv.value, rt.value)) vensterErrorCount++;
    }

    const totalErrors = invalidCount + vensterErrorCount;

    if (totalErrors > 0) {
      // Mark form as attempted so CSS highlights invalid fields
      form.setAttribute("data-attempted", "");

      if (totalErrors === 1) {
        setValidationSummary("Controleer het gemarkeerde veld.");
      } else {
        setValidationSummary("Er zijn meerdere velden niet goed ingevuld. Controleer de gemarkeerde velden.");
      }

      scrollToFirstInvalid(form);
      return false;
    }

    setValidationSummary(null);
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setValidationSummary(null);
    const form = e.currentTarget;

    if (!runFullValidation(form)) return;

    setSubmitting(true);

    const fd = new FormData(form);
    const val = (name: string) => (fd.get(name) as string) ?? "";

    // Collect checked facilities
    const facilityKeys = [
      "needs_tail_lift",
      "needs_moffett",
      "has_forklift",
      "has_dock",
      "no_equipment_available",
    ];
    const checkedFacilities = facilityKeys.filter((k) => fd.get(k) === "on");

    const payload = {
      name: val("naam"),
      email: val("email"),
      phone: val("telefoon"),
      company: val("company"), // honeypot
      pickup_date: val("laaddag"),
      pickup_time_window: buildTimeWindow(val("laadvensterVanaf"), val("laadvensterTot")),
      pickup_address: val("laadplaats"),
      dropoff_date: val("losdag"),
      dropoff_time_window: buildTimeWindow(val("losvensterVanaf"), val("losvensterTot")),
      dropoff_address: val("losplaats"),
      goods_description: val("goederen"),
      unit_type: val("unit_type") || null,
      unit_count: val("unit_count") ? Number(val("unit_count")) : null,
      length_cm: val("length_cm") ? Number(val("length_cm")) : null,
      width_cm: val("width_cm") ? Number(val("width_cm")) : null,
      height_cm: val("height_cm") ? Number(val("height_cm")) : null,
      weight_kg: val("weight_kg") ? Number(val("weight_kg")) : null,
      facilities: checkedFacilities.length > 0 ? checkedFacilities : null,
      facility_notes: val("facility_notes") || null,
      service_type: val("dienst") || null,
      notes: val("opmerkingen") || null,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setSubmitError(data.error ?? "Er ging iets mis. Probeer het opnieuw.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setSubmitError("Verbinding mislukt. Controleer uw internet en probeer het opnieuw.");
      setSubmitting(false);
    }
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
  const inputErrorClasses =
    "w-full rounded-lg border border-red-500 bg-white px-4 py-3 text-sm text-text transition-colors placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-red-200";
  const labelClasses = "block text-sm font-medium text-text mb-1.5";
  const checkboxLabelClasses = "flex items-center gap-2 text-sm text-text";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label={mode === "full" ? "Offerteformulier" : "Contactformulier"}
      className="space-y-6"
    >
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {mode === "full" && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm font-medium text-primary">
            Wat hebben wij nodig voor uw offerte?
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Laad- en losdag met tijdvenster, volledige adressen,
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
          {/* ── LADEN ── */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              Laden
            </legend>
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
              <p className={`${labelClasses} mb-2`}>
                Laadvenster{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="laadvensterVanaf" className="mb-1 block text-xs text-text-muted">
                    Vanaf
                  </label>
                  <input
                    type="time"
                    id="laadvensterVanaf"
                    name="laadvensterVanaf"
                    required
                    aria-required="true"
                    placeholder="08:00"
                    className={vensterErrors.laad ? inputErrorClasses : inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="laadvensterTot" className="mb-1 block text-xs text-text-muted">
                    Tot
                  </label>
                  <input
                    type="time"
                    id="laadvensterTot"
                    name="laadvensterTot"
                    required
                    aria-required="true"
                    placeholder="17:00"
                    className={vensterErrors.laad ? inputErrorClasses : inputClasses}
                  />
                </div>
              </div>
              {vensterErrors.laad && (
                <p className="mt-1.5 text-xs text-red-600" role="alert">
                  {vensterErrors.laad}
                </p>
              )}
            </div>
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
          </fieldset>

          {/* ── LOSSEN ── */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              Lossen
            </legend>
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
              <p className={`${labelClasses} mb-2`}>
                Losvenster{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="losvensterVanaf" className="mb-1 block text-xs text-text-muted">
                    Vanaf
                  </label>
                  <input
                    type="time"
                    id="losvensterVanaf"
                    name="losvensterVanaf"
                    required
                    aria-required="true"
                    placeholder="08:00"
                    className={vensterErrors.los ? inputErrorClasses : inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="losvensterTot" className="mb-1 block text-xs text-text-muted">
                    Tot
                  </label>
                  <input
                    type="time"
                    id="losvensterTot"
                    name="losvensterTot"
                    required
                    aria-required="true"
                    placeholder="17:00"
                    className={vensterErrors.los ? inputErrorClasses : inputClasses}
                  />
                </div>
              </div>
              {vensterErrors.los && (
                <p className="mt-1.5 text-xs text-red-600" role="alert">
                  {vensterErrors.los}
                </p>
              )}
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
          </fieldset>

          {/* ── GOEDEREN ── */}
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

            {/* Unit type + count */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="unit_type" className={labelClasses}>
                  Type verpakking{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="unit_type"
                  name="unit_type"
                  required
                  aria-required="true"
                  value={unitType}
                  onChange={(e) => handleUnitTypeChange(e.target.value)}
                  className={inputClasses}
                >
                  <option value="">— Selecteer —</option>
                  {UNIT_TYPES.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="unit_count" className={labelClasses}>
                  Aantal{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="number"
                  id="unit_count"
                  name="unit_count"
                  required
                  aria-required="true"
                  min={1}
                  placeholder="Bijv. 4"
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Dimensions: auto-filled or manual */}
            {unitType && (
              <div>
                {!needsDimensionInputs && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-muted">
                      Standaardmaat: {lengthCm} x {widthCm} cm
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowCustomDimensions(true)}
                      className="text-xs font-medium text-accent hover:text-accent-hover"
                    >
                      Afwijkende maat
                    </button>
                  </div>
                )}
                {needsDimensionInputs && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label htmlFor="length_cm" className="mb-1 block text-xs text-text-muted">
                        Lengte (cm)
                      </label>
                      <input
                        type="number"
                        id="length_cm"
                        name="length_cm"
                        min={1}
                        value={lengthCm}
                        onChange={(e) => setLengthCm(e.target.value)}
                        placeholder="120"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="width_cm" className="mb-1 block text-xs text-text-muted">
                        Breedte (cm)
                      </label>
                      <input
                        type="number"
                        id="width_cm"
                        name="width_cm"
                        min={1}
                        value={widthCm}
                        onChange={(e) => setWidthCm(e.target.value)}
                        placeholder="80"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="height_cm" className="mb-1 block text-xs text-text-muted">
                        Hoogte (cm)
                      </label>
                      <input
                        type="number"
                        id="height_cm"
                        name="height_cm"
                        min={1}
                        placeholder="100"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                )}
                {/* Hidden fields for auto-filled dimensions */}
                {!needsDimensionInputs && (
                  <>
                    <input type="hidden" name="length_cm" value={lengthCm} />
                    <input type="hidden" name="width_cm" value={widthCm} />
                  </>
                )}
              </div>
            )}

            {/* Weight */}
            <div>
              <label htmlFor="weight_kg" className={labelClasses}>
                Totaalgewicht (kg){" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="number"
                id="weight_kg"
                name="weight_kg"
                required
                aria-required="true"
                min={1}
                placeholder="Bijv. 500"
                className={inputClasses}
              />
            </div>
          </fieldset>

          {/* ── FACILITEITEN ── */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              Faciliteiten
            </legend>
            <p className="text-sm text-text-muted">
              Welke laad-/losfaciliteiten zijn beschikbaar of nodig?
            </p>
            <div className="space-y-3">
              <label className={checkboxLabelClasses}>
                <input type="checkbox" name="needs_tail_lift" className="rounded border-border" />
                Laadklep nodig
              </label>
              <label className={checkboxLabelClasses}>
                <input type="checkbox" name="needs_moffett" className="rounded border-border" />
                Moffett / meeneemheftruck nodig
              </label>
              <label className={checkboxLabelClasses}>
                <input type="checkbox" name="has_forklift" className="rounded border-border" />
                Heftruck aanwezig op locatie
              </label>
              <label className={checkboxLabelClasses}>
                <input type="checkbox" name="has_dock" className="rounded border-border" />
                Laaddock aanwezig
              </label>
              <label className={checkboxLabelClasses}>
                <input type="checkbox" name="no_equipment_available" className="rounded border-border" />
                Geen faciliteiten beschikbaar
              </label>
            </div>
            <div>
              <label htmlFor="facility_notes" className={labelClasses}>
                Toelichting faciliteiten
              </label>
              <input
                type="text"
                id="facility_notes"
                name="facility_notes"
                value={facilityNotes}
                onChange={(e) => setFacilityNotes(e.target.value)}
                placeholder="Overige opmerkingen over faciliteiten"
                className={inputClasses}
              />
            </div>
          </fieldset>

          {/* ── DIENST ── */}
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

      {validationSummary && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert" aria-live="assertive">
          {validationSummary}
        </div>
      )}

      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {submitError}
        </div>
      )}

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
