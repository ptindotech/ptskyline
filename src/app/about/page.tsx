import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/brand/site-config";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About the Group",
  description: "Learn about Mendozer Investments, a multi-sector group built for Namibia.",
  alternates: { canonical: "/about" },
  openGraph: { images: [{ url: "/og/about.png", width: 1200, height: 630, alt: "About Mendozer Investments" }] },
};

export default function AboutPage() {
  const { about } = siteContent;
  return (
    <>
      <PageHero body={about.body} breadcrumbLabel="About" eyebrow={about.eyebrow} media={about.hero} title={about.title} />

      <section className="section section--surface">
        <div className="site-container about-intro">
          <SectionHeading
            body="A broad group view means each sector can be understood in relation to the people, systems, sites, and logistics around it."
            eyebrow="The Mendozer approach"
            title="One identity across multiple operating directions."
          />
          <Reveal delay={150}>
            <p className="about-intro__accent">The current site presents a six-sector working structure while service detail is being confirmed with the client.</p>
          </Reveal>
        </div>
      </section>

      <section className="section commitments-section">
        <div className="site-container">
          <SectionHeading eyebrow="How the group is introduced" title="A clear framework for a wider portfolio." />
          <div className="commitments-grid">
            {about.commitments.map((commitment, index) => (
              <Reveal delay={index * 100} key={commitment.number}>
                <article className="commitment-card">
                  <span>{commitment.number}</span>
                  <h2>{commitment.title}</h2>
                  <p>{commitment.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section leadership-section">
        <div className="site-container leadership-section__grid">
          <div className="leadership-section__index" aria-hidden="true" />
          <div>
            <SectionHeading eyebrow={about.leadership.eyebrow} title={about.leadership.title} />
            <Reveal delay={150}>
              <div className="leadership-card">
                <p className="eyebrow">Group leadership</p>
                <h2>{about.leadership.name}</h2>
                <p className="leadership-card__role">{about.leadership.role}</p>
                <p>{about.leadership.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark legal-section">
        <div className="site-container legal-section__grid">
          <div>
            <SectionHeading inverse eyebrow="Company details" title="Verified registration details." />
          </div>
          <Reveal delay={140}>
            <div>
              <dl>
                <div><dt>Registration no.</dt><dd>{siteConfig.registration}</dd></div>
                <div><dt>VAT no.</dt><dd>{siteConfig.vat}</dd></div>
                <div><dt>Contact</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
              </dl>
              <div className="legal-section__licence">
                <p className="eyebrow eyebrow--light">{about.fuelLicence.eyebrow}</p>
                <p>{about.fuelLicence.body}</p>
                <a href={about.fuelLicence.sourceUrl} rel="noreferrer" target="_blank">Source: {about.fuelLicence.sourceLabel}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Explore the group</p><h2>See the work through each sector.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/#sectors">Explore sectors <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
