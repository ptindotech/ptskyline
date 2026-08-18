import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { legalPages } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Website terms for Mendozer Investments introductory group and sector information.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPageTemplate page={legalPages.terms} />;
}
