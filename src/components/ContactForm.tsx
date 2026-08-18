"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteConfig } from "@/brand/site-config";
import { sectors } from "@/content/site-content";

type SubmissionState = "idle" | "sending" | "sent" | "opening" | "error";

type DeliveryResponse = {
  ok?: boolean;
  code?: string;
  message?: string;
};

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function openMailto(fields: Record<string, string>) {
    const subject = `Website enquiry${fields.sector ? `: ${fields.sector}` : ""}`;
    const body = [
      `Name: ${fields.name}`,
      `Organisation: ${fields.organisation || "Not provided"}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone || "Not provided"}`,
      `Sector: ${fields.sector || "Not specified"}`,
      "",
      "Message:",
      fields.message,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") ?? ""),
      organisation: String(data.get("organisation") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      sector: String(data.get("sector") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    setSubmissionState("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = await response.json() as DeliveryResponse;

      if (response.ok && result.ok) {
        setSubmissionState("sent");
        setStatusMessage("Your enquiry has been delivered to Mendozer Investments.");
        form.reset();
        return;
      }

      if (result.code === "DELIVERY_NOT_CONFIGURED") {
        openMailto(fields);
        setSubmissionState("opening");
        setStatusMessage("Direct delivery is being configured. Your email app is opening with the enquiry addressed to Mendozer.");
        return;
      }

      setSubmissionState("error");
      setStatusMessage(result.message ?? "The enquiry could not be delivered. Please email contact@mendozer.com directly.");
    } catch {
      setSubmissionState("error");
      setStatusMessage("The enquiry could not be delivered. Please email contact@mendozer.com directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__honeypot" aria-hidden="true">
        <label>
          <span>Website</span>
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>
      <div className="contact-form__grid">
        <label>
          <span>Name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" name="name" required type="text" />
        </label>
        <label>
          <span>Organisation</span>
          <input autoComplete="organization" name="organisation" type="text" />
        </label>
        <label>
          <span>Email <b aria-hidden="true">*</b></span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          <span>Phone</span>
          <input autoComplete="tel" name="phone" type="tel" />
        </label>
      </div>
      <label>
        <span>Relevant sector</span>
        <select defaultValue="" name="sector">
          <option value="">Select a sector</option>
          {sectors.map((sector) => <option key={sector.slug} value={sector.title}>{sector.title}</option>)}
          <option value="Group enquiry">Group enquiry</option>
        </select>
      </label>
      <label>
        <span>How can we help? <b aria-hidden="true">*</b></span>
        <textarea name="message" required rows={6} />
      </label>
      <div className="contact-form__bottom">
        <button className="button button--primary" disabled={submissionState === "sending"} type="submit">
          {submissionState === "sending" ? "Sending enquiry" : "Send enquiry"} <ArrowIcon />
        </button>
        <p id="contact-form-note">Enquiries are sent securely when delivery is configured. If secure delivery is unavailable, your email app opens as a fallback. <a href="/privacy">Read the privacy notice.</a></p>
      </div>
      <p aria-live="polite" className={`contact-form__status contact-form__status--${submissionState}`}>
        {statusMessage}
      </p>
    </form>
  );
}
