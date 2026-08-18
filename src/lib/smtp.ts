import nodemailer from "nodemailer";

export type MailEnvelope = {
  to: string;
  from?: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendSmtpMail(message: MailEnvelope) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? process.env.CONTACT_FROM_EMAIL ?? message.from;

  if (!host || !user || !pass || !from) {
    return { ok: false, code: "SMTP_NOT_CONFIGURED", message: "SMTP delivery is not configured." };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  });

  return { ok: true };
}
