import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

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

    /* ── Validate required fields ── */
    const required = [
      "name",
      "email",
      "phone",
      "pickup_date",
      "pickup_address",
      "dropoff_date",
      "dropoff_address",
      "goods_description",
      "dimensions_weight",
    ] as const;

    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json(
          { ok: false, error: `Veld "${field}" is verplicht.` },
          { status: 400 },
        );
      }
    }

    const userAgent = request.headers.get("user-agent") ?? "";

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
        dimensions_weight: body.dimensions_weight.trim(),
        facilities: body.facilities?.trim() || null,
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

    /* ── Make webhook (fire-and-forget) ── */
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead_id: leadId, ...body }),
        });
      } catch (webhookError) {
        // Webhook failure must not break the response
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
