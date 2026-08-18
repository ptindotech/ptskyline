import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mendozer Investments to start a group or sector enquiry. Direct delivery to contact@mendozer.com with a secure form and mailto fallback.",
  alternates: { canonical: "/contact" },
  openGraph: { images: [{ url: "/og/contact.png", width: 1200, height: 630, alt: "Contact Mendozer Investments" }] },
};

export default function ContactPage() {
  const { contact } = siteContent;
  return (
    <>
      <PageHero body={contact.body} breadcrumbLabel="Contact" eyebrow={contact.eyebrow} media={contact.media} title={contact.title} />
      <section className="section contact-section">
        <div className="site-container contact-section__grid">
          <div className="contact-section__details">
            <SectionHeading
              body="For a direct enquiry, email the group or use the form. Secure delivery is used when it is configured, with your email application available as a fallback."
              eyebrow="Get in touch"
              title="The direct route to Mendozer."
            />
            <Reveal delay={170}>
              <a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </Reveal>
            <Reveal delay={230}>
              <dl className="contact-legal">
                <div><dt>Registration no.</dt><dd>{siteConfig.registration}</dd></div>
                <div><dt>VAT no.</dt><dd>{siteConfig.vat}</dd></div>
              </dl>
            </Reveal>
          </div>
          <Reveal delay={120} variant="right"><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
