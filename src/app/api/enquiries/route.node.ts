import { NextResponse } from "next/server";
import { collectFieldErrors, enquirySchema } from "@/lib/enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives an enquiry from the funnel.
 *
 * The client validates with the same schema, but that is a convenience only —
 * everything is re-validated here before it is trusted.
 *
 * TODO (integration point): this currently logs the enquiry and returns 201.
 * Replace `deliver` with the real destination — transactional email to the
 * enquiries inbox, a CRM create, or an append to the client's Google Sheet.
 * Whatever you choose, keep the delivery inside the try/catch so a downstream
 * outage returns 502 rather than silently dropping a lead.
 */
async function deliver(enquiry: unknown): Promise<void> {
  console.info("[enquiry] received", JSON.stringify(enquiry));
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some answers need another look.", fields: collectFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  // Honeypot: accepted silently so a bot cannot distinguish success from
  // rejection, but never delivered.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  try {
    const { website: _honeypot, ...enquiry } = parsed.data;
    void _honeypot;
    await deliver({ ...enquiry, receivedAt: new Date().toISOString() });
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json({ error: "Could not deliver the enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
