import { jsPDF } from "jspdf";
import type { LeadRecord } from "./leadTypes";
import { formatDateNL, display, formatDimensions } from "./leadTypes";

const PRIMARY = "#0f1c3f";
const LABEL_COLOR = "#64748b";
const TEXT_COLOR = "#1e293b";
const DIVIDER_COLOR = "#e2e8f0";

const PAGE_WIDTH = 210; // A4 mm
const MARGIN_LEFT = 20;
const MARGIN_RIGHT = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const LABEL_WIDTH = 52;

/**
 * Generate a professional PDF summary of a lead.
 * Returns a Buffer ready for email attachment.
 */
export function generateLeadPdf(lead: LeadRecord): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 0;

  // ── Header band ──
  doc.setFillColor(PRIMARY);
  doc.rect(0, 0, PAGE_WIDTH, 32, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor("#ffffff");
  doc.text("Caseley Experience", MARGIN_LEFT, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#94a3b8");
  doc.text("Offerteaanvraag", MARGIN_LEFT, 21);

  // Date in top-right
  const dateStr = lead.created_at
    ? new Date(lead.created_at).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  doc.setFontSize(9);
  doc.setTextColor("#94a3b8");
  doc.text(dateStr, PAGE_WIDTH - MARGIN_RIGHT, 21, { align: "right" });

  y = 42;

  // ── Helper: section header ──
  function sectionHeader(title: string) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(PRIMARY);
    doc.text(title.toUpperCase(), MARGIN_LEFT, y);
    y += 1.5;
    doc.setDrawColor(PRIMARY);
    doc.setLineWidth(0.5);
    doc.line(MARGIN_LEFT, y, MARGIN_LEFT + CONTENT_WIDTH, y);
    y += 6;
  }

  // ── Helper: label-value row ──
  function row(label: string, value: string) {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.setTextColor(LABEL_COLOR);
    doc.text(label, MARGIN_LEFT, y);

    doc.setTextColor(TEXT_COLOR);
    // Wrap long values
    const maxValueWidth = CONTENT_WIDTH - LABEL_WIDTH;
    const lines = doc.splitTextToSize(value, maxValueWidth);
    doc.text(lines, MARGIN_LEFT + LABEL_WIDTH, y);

    y += Math.max(lines.length, 1) * 4.5 + 1.5;
  }

  // ── Helper: section divider spacing ──
  function sectionGap() {
    y += 4;
    doc.setDrawColor(DIVIDER_COLOR);
    doc.setLineWidth(0.2);
    doc.line(MARGIN_LEFT, y, MARGIN_LEFT + CONTENT_WIDTH, y);
    y += 8;
  }

  // ── Gegevens ──
  sectionHeader("Gegevens");
  row("Naam", lead.name);
  row("E-mail", lead.email);
  row("Telefoon", lead.phone);
  sectionGap();

  // ── Laden ──
  sectionHeader("Laden");
  row("Datum", formatDateNL(lead.pickup_date));
  row("Tijdvenster", display(lead.pickup_time_window));
  row("Adres", lead.pickup_address);
  sectionGap();

  // ── Lossen ──
  sectionHeader("Lossen");
  row("Datum", formatDateNL(lead.dropoff_date));
  row("Tijdvenster", display(lead.dropoff_time_window));
  row("Adres", lead.dropoff_address);
  sectionGap();

  // ── Goederen ──
  sectionHeader("Goederen");
  row("Omschrijving", lead.goods_description);
  row("Type verpakking", display(lead.unit_type));
  row("Aantal", display(lead.unit_count));
  row("Afmetingen", formatDimensions(lead));
  row("Gewicht", `${lead.weight_kg} kg`);
  sectionGap();

  // ── Faciliteiten ──
  sectionHeader("Faciliteiten");
  row("Laadklep nodig", lead.needs_tail_lift ? "Ja" : "Nee");
  row("Moffett nodig", lead.needs_moffett ? "Ja" : "Nee");
  row("Heftruck aanwezig", lead.has_forklift ? "Ja" : "Nee");
  row("Laaddock aanwezig", lead.has_dock ? "Ja" : "Nee");
  row("Geen faciliteiten", lead.no_equipment_available ? "Ja" : "Nee");
  if (lead.facility_notes) {
    row("Toelichting", lead.facility_notes);
  }
  sectionGap();

  // ── Dienst & opmerkingen ──
  sectionHeader("Dienst & opmerkingen");
  row("Dienst", display(lead.service_type));
  row("Opmerkingen", display(lead.notes));

  // ── Footer ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor("#94a3b8");
    doc.text(
      "Caseley Experience  \u2022  +31 6 1438 5060  \u2022  info@caseleyexperience.nl",
      PAGE_WIDTH / 2,
      290,
      { align: "center" },
    );
  }

  // Output as Buffer
  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
