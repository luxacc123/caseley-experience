/**
 * Shared lead data shape — used by PDF generator, CSV generator,
 * email sender, and API route.
 */
export interface LeadRecord {
  id: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  pickup_date: string;
  pickup_time_window: string | null;
  pickup_address: string;
  dropoff_date: string;
  dropoff_time_window: string | null;
  dropoff_address: string;
  goods_description: string;
  unit_type: string;
  unit_count: number;
  length_cm: number | null;
  width_cm: number | null;
  height_cm: number | null;
  weight_kg: number;
  needs_tail_lift: boolean;
  needs_moffett: boolean;
  has_forklift: boolean;
  has_dock: boolean;
  no_equipment_available: boolean;
  facility_notes: string | null;
  service_type: string | null;
  notes: string | null;
}

/** Format ISO date "2026-03-29" → "29-03-2026" */
export function formatDateNL(iso: string): string {
  if (!iso) return "–";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

/** Return value or dash for display */
export function display(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "–";
  return String(value);
}

/** Format dimensions string from individual values */
export function formatDimensions(lead: LeadRecord): string {
  const parts = [lead.length_cm, lead.width_cm, lead.height_cm];
  const filled = parts.filter((v) => v !== null);
  if (filled.length === 0) return "–";
  return parts.map((v) => (v !== null ? `${v}` : "–")).join(" x ") + " cm";
}
