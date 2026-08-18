export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "6281285171313";

export function normalizeWhatsAppNumber(value: string | undefined) {
  return (value ?? "").replace(/[^\d]/g, "").replace(/^00/, "");
}

export function getWhatsAppUrl(value: string = WHATSAPP_NUMBER) {
  const normalized = normalizeWhatsAppNumber(value);
  return normalized ? `https://wa.me/${normalized}` : null;
}
