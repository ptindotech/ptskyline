"use client";

import { useEffect, useMemo, useState } from "react";

const SCROLL_THRESHOLD = 640;

export function normalizeWhatsAppNumber(value: string | undefined) {
  return (value ?? "").replace(/[^\d]/g, "").replace(/^00/, "");
}

export function UtilityWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const whatsappNumber = useMemo(() => normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER), []);

  useEffect(() => {
    const onScroll = () => {
      const nextVisible = window.scrollY > SCROLL_THRESHOLD;
      setShowScrollTop((current) => current === nextVisible ? current : nextVisible);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  if (!showScrollTop && !whatsappNumber) return null;

  return (
    <aside aria-label="Quick actions" className="utility-widgets">
      {showScrollTop ? (
        <button aria-label="Back to top" className="utility-widget utility-widget--icon" onClick={scrollToTop} type="button">
          <svg aria-hidden="true" className="utility-widget__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </button>
      ) : null}
      {whatsappNumber ? (
        <a aria-label="WhatsApp" className="utility-widget utility-widget--whatsapp" href={`https://wa.me/${whatsappNumber}`} rel="noreferrer" target="_blank">WhatsApp</a>
      ) : null}
    </aside>
  );
}
