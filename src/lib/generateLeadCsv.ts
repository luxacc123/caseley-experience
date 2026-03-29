import type { LeadRecord } from "./leadTypes";
import { formatDateNL } from "./leadTypes";

/** Escape a CSV field: wrap in quotes if it contains commas, quotes, or newlines */
function csvField(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generate a single-row CSV with headers for a lead record.
 * Returns a UTF-8 string ready to be used as an email attachment.
 */
export function generateLeadCsv(lead: LeadRecord): string {
  const headers = [
    "Naam",
    "E-mail",
    "Telefoon",
    "Laaddatum",
    "Laadvenster",
    "Laadadres",
    "Losdatum",
    "Losvenster",
    "Losadres",
    "Goederen",
    "Type verpakking",
    "Aantal",
    "Lengte (cm)",
    "Breedte (cm)",
    "Hoogte (cm)",
    "Gewicht (kg)",
    "Laadklep nodig",
    "Moffett nodig",
    "Heftruck aanwezig",
    "Laaddock aanwezig",
    "Geen faciliteiten",
    "Toelichting faciliteiten",
    "Dienst",
    "Opmerkingen",
  ];

  const values = [
    csvField(lead.name),
    csvField(lead.email),
    csvField(lead.phone),
    csvField(formatDateNL(lead.pickup_date)),
    csvField(lead.pickup_time_window),
    csvField(lead.pickup_address),
    csvField(formatDateNL(lead.dropoff_date)),
    csvField(lead.dropoff_time_window),
    csvField(lead.dropoff_address),
    csvField(lead.goods_description),
    csvField(lead.unit_type),
    csvField(lead.unit_count),
    csvField(lead.length_cm),
    csvField(lead.width_cm),
    csvField(lead.height_cm),
    csvField(lead.weight_kg),
    csvField(lead.needs_tail_lift ? "Ja" : "Nee"),
    csvField(lead.needs_moffett ? "Ja" : "Nee"),
    csvField(lead.has_forklift ? "Ja" : "Nee"),
    csvField(lead.has_dock ? "Ja" : "Nee"),
    csvField(lead.no_equipment_available ? "Ja" : "Nee"),
    csvField(lead.facility_notes),
    csvField(lead.service_type),
    csvField(lead.notes),
  ];

  return headers.join(",") + "\n" + values.join(",") + "\n";
}
