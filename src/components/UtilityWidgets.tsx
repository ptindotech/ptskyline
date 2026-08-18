"use client";

import { getWhatsAppUrl } from "@/config/whatsapp";

export function UtilityWidgets() {
  const whatsappUrl = getWhatsAppUrl();

  if (!whatsappUrl) return null;

  return (
    <aside aria-label="Quick actions" className="utility-widgets">
      <a
        aria-label="WhatsApp"
        className="utility-widget utility-widget--whatsapp"
        href={whatsappUrl}
        rel="noreferrer"
        target="_blank"
      >
        WhatsApp
      </a>
    </aside>
  );
}
