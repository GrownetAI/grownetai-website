import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
  role: z.string().min(1).max(100),
  portfolio: z.string().url().optional().or(z.literal("")),
  message: z.string().min(20).max(3000),
});

// Rate limiting
const submissionLog = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 2; // stricter for job applications
  const timestamps = (submissionLog.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) return true;
  submissionLog.set(ip, [...timestamps, now]);
  return false;
}

function sanitize(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function sendEmail(data: z.infer<typeof schema>) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #008080; padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application 💼</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">GrownetAI Careers</p>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px; font-weight: 600;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${sanitize(data.name)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${sanitize(data.email)}" style="color: #008080;">${sanitize(data.email)}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${sanitize(data.phone)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Role</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700; color: #008080;">${sanitize(data.role)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">Portfolio</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.portfolio ? `<a href="${sanitize(data.portfolio)}" style="color: #008080;">${sanitize(data.portfolio)}</a>` : "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #6b7280; font-weight: 600; vertical-align: top;">About</td><td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${sanitize(data.message)}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #008080;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"GrownetAI Careers" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECIPIENT_EMAIL,
    replyTo: data.email,
    subject: `Job Application: ${data.role} — ${data.name}`,
    html,
  });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 415 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    }

    let body: unknown;
    try { body = await req.json(); } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    await sendEmail(parsed.data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Careers API Error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
