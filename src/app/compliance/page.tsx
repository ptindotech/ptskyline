import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { siteContent, verifiedFacts } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Public Records & Licences",
  description: "Verified Mendozer Investments registration details and public wholesale fuel distribution licence record.",
  alternates: { canonical: "/compliance" },
  openGraph: { images: [{ url: "/og/energy.png", width: 1200, height: 630, alt: "Mendozer Investments public records and licences" }] },
};

export default function CompliancePage() {
  const { compliance } = siteContent;
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;

  return (
    <>
      <PageHero body={compliance.body} breadcrumbLabel="Public Records & Licences" eyebrow={compliance.eyebrow} media={compliance.hero} title={compliance.title} />
      <section className="section compliance-page">
        <div className="site-container compliance-page__grid">
          <SectionHeading
            body="These are the records currently verified for publication. Additional licences, certifications, and sector compliance detail are added only when approval is in place."
            eyebrow="Verified for publication"
            title="The public record, without overstatement."
          />
          <Reveal delay={110} variant="right">
            <dl className="compliance-page__records">
              <div><dt>Registration no.</dt><dd>{siteConfig.registration}</dd></div>
              <div><dt>VAT no.</dt><dd>{siteConfig.vat}</dd></div>
              <div><dt>{fuelLicence.title}</dt><dd>{fuelLicence.body}</dd></div>
              <div><dt>Public source</dt><dd><a href={fuelLicence.sourceUrl} rel="noreferrer" target="_blank">{fuelLicence.sourceLabel}</a></dd></div>
            </dl>
          </Reveal>
        </div>
      </section>
      <section className="section section--surface compliance-page__note">
        <div className="site-container">
          <Reveal><p className="eyebrow">A clear boundary</p><h2>Only records that can be verified belong here.</h2><p>For sector-specific licences, certifications, or project documentation, contact the group directly and request the relevant approved information.</p></Reveal>
          <Reveal delay={110}><Link className="text-link" href="/contact">Prepare an enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
