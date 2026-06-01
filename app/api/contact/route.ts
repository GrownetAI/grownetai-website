import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// ─── Validation Schema ──────────────────────────────────────────────────────
const schema = z.object({
  name: z
    .string()
    .min(2, "Name too short")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string().email("Invalid email").max(254, "Email too long"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[+\d\s\-().]{7,20}$/.test(v),
      "Invalid phone number",
    ),
  service: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "Message too short")
    .max(2000, "Message too long"),
});

// ─── Rate Limiting (IP-based, in-memory) ────────────────────────────────────
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const maxRequests = 3;
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < windowMs,
  );
  if (timestamps.length >= maxRequests) return true;
  submissionLog.set(ip, [...timestamps, now]);
  return false;
}

// ─── Input Sanitizer ────────────────────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ─── Email Sender ───────────────────────────────────────────────────────────
async function sendEmail(data: z.infer<typeof schema>) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       // e.g. smtp.gmail.com
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,                       // true for port 465
    auth: {
      user: process.env.SMTP_USER,      // your email
      pass: process.env.SMTP_PASS,      // app password
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #008080; padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">GrownetAI Website</p>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px; font-weight: 600;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${sanitize(data.name)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;"><a href="mailto:${sanitize(data.email)}" style="color: #008080;">${sanitize(data.email)}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.phone ? sanitize(data.phone) : "—"}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.service ? sanitize(data.service) : "—"}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Budget</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.budget ? sanitize(data.budget) : "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${sanitize(data.message)}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #008080;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"GrownetAI Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT_EMAIL, // your receiving email
    replyTo: data.email,
    subject: `New enquiry from ${data.name} — GrownetAI`,
    html,
  });
}

// ─── POST Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Security: check content-type
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 415 });
    }

    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in an hour." },
        { status: 429 },
      );
    }

    // Parse & validate body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Send email
    await sendEmail(parsed.data);

    console.log("[Contact] Email sent from:", parsed.data.email, "| IP:", ip);

    return NextResponse.json(
      { success: true, message: "Message received! We'll reply within 24 hours." },
      { status: 200 },
    );
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Internal server error. Please try WhatsApp or call us." },
      { status: 500 },
    );
  }
}
