import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendLeadNotification } from "@/lib/sendLeadNotification";
import type { LeadRecord } from "@/lib/leadTypes";

/* Force dynamic rendering — no static caching for API routes */
/* env-refresh: 2026-03-29T21 */
export const dynamic = "force-dynamic";

/* ── Simple in-memory rate limit (best effort, per-instance) ── */
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

/* ── POST /api/lead ── */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Te veel aanvragen. Probeer het later opnieuw." },
        { status: 429 },
      );
    }

    const body = await request.json();

    /* ── Honeypot: "company" field must be empty ── */
    if (body.company) {
      // Pretend success to fool bots
      return NextResponse.json({ ok: true });
    }

    /* ── Validate required string fields ── */
    const requiredStrings = [
      "name",
      "email",
      "phone",
      "pickup_date",
      "pickup_address",
      "dropoff_date",
      "dropoff_address",
      "goods_description",
    ] as const;

    for (const field of requiredStrings) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json(
          { ok: false, error: `Veld "${field}" is verplicht.` },
          { status: 400 },
        );
      }
    }

    /* ── Validate required numeric fields ── */
    if (!body.unit_type || typeof body.unit_type !== "string") {
      return NextResponse.json(
        { ok: false, error: `Veld "unit_type" is verplicht.` },
        { status: 400 },
      );
    }

    if (!body.unit_count || typeof body.unit_count !== "number" || body.unit_count < 1) {
      return NextResponse.json(
        { ok: false, error: `Veld "unit_count" is verplicht.` },
        { status: 400 },
      );
    }

    if (!body.weight_kg || typeof body.weight_kg !== "number" || body.weight_kg < 1) {
      return NextResponse.json(
        { ok: false, error: `Veld "weight_kg" is verplicht.` },
        { status: 400 },
      );
    }

    const userAgent = request.headers.get("user-agent") ?? "";

    /* ── Map facility checkboxes to booleans ── */
    const facilityList = Array.isArray(body.facilities) ? body.facilities : [];

    /* ── Insert into Supabase ── */
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        pickup_date: body.pickup_date,
        pickup_time_window: body.pickup_time_window || null,
        pickup_address: body.pickup_address.trim(),
        dropoff_date: body.dropoff_date,
        dropoff_time_window: body.dropoff_time_window || null,
        dropoff_address: body.dropoff_address.trim(),
        goods_description: body.goods_description.trim(),
        unit_type: body.unit_type,
        unit_count: body.unit_count,
        length_cm: typeof body.length_cm === "number" ? body.length_cm : null,
        width_cm: typeof body.width_cm === "number" ? body.width_cm : null,
        height_cm: typeof body.height_cm === "number" ? body.height_cm : null,
        weight_kg: body.weight_kg,
        needs_tail_lift: facilityList.includes("needs_tail_lift"),
        needs_moffett: facilityList.includes("needs_moffett"),
        has_forklift: facilityList.includes("has_forklift"),
        has_dock: facilityList.includes("has_dock"),
        no_equipment_available: facilityList.includes("no_equipment_available"),
        facility_notes: body.facility_notes?.trim() || null,
        service_type: body.service_type?.trim() || null,
        notes: body.notes?.trim() || null,
        source: "website",
        status: "new",
        ip,
        user_agent: userAgent,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Er ging iets mis. Probeer het opnieuw." },
        { status: 500 },
      );
    }

    const leadId = data.id;

    /* ── Build typed lead record for notifications ── */
    const leadRecord: LeadRecord = {
      id: leadId,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      pickup_date: body.pickup_date,
      pickup_time_window: body.pickup_time_window || null,
      pickup_address: body.pickup_address.trim(),
      dropoff_date: body.dropoff_date,
      dropoff_time_window: body.dropoff_time_window || null,
      dropoff_address: body.dropoff_address.trim(),
      goods_description: body.goods_description.trim(),
      unit_type: body.unit_type,
      unit_count: body.unit_count,
      length_cm: typeof body.length_cm === "number" ? body.length_cm : null,
      width_cm: typeof body.width_cm === "number" ? body.width_cm : null,
      height_cm: typeof body.height_cm === "number" ? body.height_cm : null,
      weight_kg: body.weight_kg,
      needs_tail_lift: facilityList.includes("needs_tail_lift"),
      needs_moffett: facilityList.includes("needs_moffett"),
      has_forklift: facilityList.includes("has_forklift"),
      has_dock: facilityList.includes("has_dock"),
      no_equipment_available: facilityList.includes("no_equipment_available"),
      facility_notes: body.facility_notes?.trim() || null,
      service_type: body.service_type?.trim() || null,
      notes: body.notes?.trim() || null,
    };

    /* ── Email notification with PDF + CSV (non-blocking) ── */
    try {
      await sendLeadNotification(leadRecord);
    } catch (emailError) {
      // Email failure must not break the response — lead is safe in Supabase
      console.error("Lead notification error:", emailError);
    }

    /* ── Make webhook (optional, fire-and-forget) ── */
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead_id: leadId, ...body }),
        });
      } catch (webhookError) {
        console.error("Make webhook error:", webhookError);
      }
    }

    return NextResponse.json({ ok: true, lead_id: leadId });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldig verzoek." },
      { status: 400 },
    );
  }
}
