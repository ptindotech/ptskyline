import { NextResponse } from "next/server";
import { siteConfig } from "@/brand/site-config";
import { getSiteSettings } from "@/lib/cms-store";
import { sendSmtpMail } from "@/lib/smtp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  organisation?: unknown;
  email?: unknown;
  phone?: unknown;
  sector?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

type CleanFields = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  sector: string;
  message: string;
};

const buckets = new Map<string, RateBucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_FIELD_LENGTH = 2_000;

function asCleanString(value: unknown, limit = MAX_FIELD_LENGTH) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, limit) : "";
}

function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (existing.count >= MAX_REQUESTS_PER_WINDOW) return true;
  existing.count += 1;
  return false;
}

function textMessage(fields: CleanFields) {
  return [
    `Name: ${fields.name}`,
    `Organisation: ${fields.organisation || "Not provided"}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "Not provided"}`,
    `Sector: ${fields.sector || "Not specified"}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_PAYLOAD", message: "Please review the enquiry fields and try again." }, { status: 400 });
  }

  const name = asCleanString(payload.name, 120);
  const organisation = asCleanString(payload.organisation, 160);
  const email = asCleanString(payload.email, 254).toLowerCase();
  const phone = asCleanString(payload.phone, 80);
  const sector = asCleanString(payload.sector, 160);
  const message = asCleanString(payload.message, MAX_FIELD_LENGTH);
  const website = asCleanString(payload.website, 160);

  // Honeypot submissions receive a neutral response without sending mail.
  if (website) return NextResponse.json({ ok: true });

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, code: "VALIDATION_FAILED", message: "Please provide your name, a valid email address, and an enquiry message." }, { status: 400 });
  }

  if (isRateLimited(clientAddress(request))) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED", message: "Too many enquiries were submitted from this connection. Please try again later or email contact@mendozer.com." }, { status: 429 });
  }

  const cmsSettings = await getSiteSettings();
  const smtpTarget = cmsSettings.smtp?.to || process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const smtpFrom = cmsSettings.smtp?.from || process.env.CONTACT_FROM_EMAIL;
  const smtpHost = cmsSettings.smtp?.host || process.env.SMTP_HOST;

  const fields = { name, organisation, email, phone, sector, message };
  const subject = `Website enquiry${sector ? `: ${sector}` : ""}`;

  if (smtpHost && smtpFrom) {
    const smtpOk = await sendSmtpMail({
      to: smtpTarget,
      from: smtpFrom,
      replyTo: email,
      subject,
      text: textMessage(fields),
    });

    if (!smtpOk.ok) {
      return NextResponse.json({ ok: false, code: "DELIVERY_FAILED", message: "The enquiry could not be delivered. Please email hello@skyline-transocean.com directly." }, { status: 502 });
    }

    await sendSmtpMail({
      to: email,
      from: smtpFrom,
      subject: `${cmsSettings.brandName} enquiry received`,
      text: `Your website enquiry has been delivered to ${cmsSettings.brandName}. Keep this message for your records.`,
    }).catch(() => undefined);

    return NextResponse.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  if (!resendKey || !from) {
    return NextResponse.json({ ok: false, code: "DELIVERY_NOT_CONFIGURED", message: "Direct contact delivery is not configured yet." }, { status: 503 });
  }

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text: textMessage(fields),
    }),
  });

  if (!delivery.ok) {
    return NextResponse.json({ ok: false, code: "DELIVERY_FAILED", message: "The enquiry could not be delivered. Please email hello@skyline-transocean.com directly." }, { status: 502 });
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `${cmsSettings.brandName} enquiry received`,
      text: `Your website enquiry has been delivered to ${cmsSettings.brandName}. Keep this message for your records.`,
    }),
  }).catch(() => undefined);

  return NextResponse.json({ ok: true });
}
