import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ── Production: Add to Mailchimp / Brevo / Resend audience
    // await fetch('https://api.mailchimp.com/3.0/lists/{id}/members', { ... });

    console.log("[Newsletter]", { email: parsed.data.email, ts: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
