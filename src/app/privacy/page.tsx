import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { legalPages } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy notice for the Mendozer Investments website and contact workflow.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPageTemplate page={legalPages.privacy} />;
}
