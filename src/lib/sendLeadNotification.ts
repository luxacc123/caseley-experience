import { Resend } from "resend";
import type { LeadRecord } from "./leadTypes";
import { formatDateNL, display, formatDimensions } from "./leadTypes";
import { generateLeadPdf } from "./generateLeadPdf";
import { generateLeadCsv } from "./generateLeadCsv";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing env var: RESEND_API_KEY");
  _resend = new Resend(key);
  return _resend;
}

/**
 * Build the HTML email body from lead data.
 * Uses the exact same inline-CSS table structure as the Make.com template,
 * but with real values interpolated via template literals.
 */
function buildEmailHtml(lead: LeadRecord): string {
  const jn = (v: boolean) => (v ? "Ja" : "Nee");
  const d = display;

  function sectionHtml(title: string, rows: [string, string][]): string {
    const rowsHtml = rows
      .map(
        ([label, value]) => `
                      <tr>
                        <td style="padding:6px 0;width:140px;font-size:13px;color:#64748b;vertical-align:top;">${label}</td>
                        <td style="padding:6px 0;font-size:13px;color:#1e293b;">${value}</td>
                      </tr>`,
      )
      .join("");

    return `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:10px;border-bottom:2px solid #0f1c3f;">
                    <h2 style="margin:0;font-size:14px;font-weight:700;color:#0f1c3f;text-transform:uppercase;letter-spacing:0.5px;">${title}</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}
                    </table>
                  </td>
                </tr>
              </table>`;
  }

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe offerteaanvraag</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <tr>
            <td style="background-color:#0f1c3f;padding:28px 32px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Nieuwe offerteaanvraag</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">Via caseleyexperience.nl</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 32px;">

${sectionHtml("Gegevens", [
  ["Naam", `<strong>${lead.name}</strong>`],
  ["E-mail", `<a href="mailto:${lead.email}" style="color:#0f1c3f;text-decoration:underline;">${lead.email}</a>`],
  ["Telefoon", `<a href="tel:${lead.phone}" style="color:#0f1c3f;text-decoration:underline;">${lead.phone}</a>`],
])}

${sectionHtml("Laden", [
  ["Datum", formatDateNL(lead.pickup_date)],
  ["Tijdvenster", d(lead.pickup_time_window)],
  ["Adres", lead.pickup_address],
])}

${sectionHtml("Lossen", [
  ["Datum", formatDateNL(lead.dropoff_date)],
  ["Tijdvenster", d(lead.dropoff_time_window)],
  ["Adres", lead.dropoff_address],
])}

${sectionHtml("Goederen", [
  ["Omschrijving", lead.goods_description],
  ["Type verpakking", d(lead.unit_type)],
  ["Aantal", d(lead.unit_count)],
  ["Afmetingen", formatDimensions(lead)],
  ["Gewicht", `${lead.weight_kg} kg`],
])}

${sectionHtml("Faciliteiten", [
  ["Laadklep nodig", jn(lead.needs_tail_lift)],
  ["Moffett nodig", jn(lead.needs_moffett)],
  ["Heftruck aanwezig", jn(lead.has_forklift)],
  ["Laaddock aanwezig", jn(lead.has_dock)],
  ["Geen faciliteiten", jn(lead.no_equipment_available)],
  ["Toelichting", d(lead.facility_notes)],
])}

${sectionHtml("Dienst &amp; opmerkingen", [
  ["Dienst", d(lead.service_type)],
  ["Opmerkingen", d(lead.notes)],
])}

            </td>
          </tr>

          <tr>
            <td style="background-color:#f8f9fb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                Caseley Experience &mdash; Wegtransport binnen &amp; buiten Europa<br>
                <a href="tel:+31614385060" style="color:#64748b;text-decoration:none;">06 1438 5060</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:info@caseleyexperience.nl" style="color:#64748b;text-decoration:none;">info@caseleyexperience.nl</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send a lead notification email with PDF and CSV attachments.
 * Returns true on success, false on failure (never throws).
 */
export async function sendLeadNotification(lead: LeadRecord): Promise<boolean> {
  const fromAddress = process.env.RESEND_FROM_ADDRESS;
  const toAddress = process.env.NOTIFICATION_EMAIL;

  if (!fromAddress || !toAddress) {
    console.error(
      "Lead notification skipped: missing RESEND_FROM_ADDRESS or NOTIFICATION_EMAIL",
    );
    return false;
  }

  try {
    // Generate attachments
    const pdfBuffer = generateLeadPdf(lead);
    const csvContent = generateLeadCsv(lead);

    // Sanitize name for filename
    const safeName = lead.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const dateSlug = lead.pickup_date || "onbekend";

    const html = buildEmailHtml(lead);

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: `Nieuwe offerteaanvraag — ${lead.name}`,
      html,
      attachments: [
        {
          filename: `offerte-${safeName}-${dateSlug}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
        {
          filename: `offerte-${safeName}-${dateSlug}.csv`,
          content: Buffer.from(csvContent, "utf-8"),
          contentType: "text/csv",
        },
      ],
    });

    if (error) {
      console.error("Resend email error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Lead notification error:", err);
    return false;
  }
}
