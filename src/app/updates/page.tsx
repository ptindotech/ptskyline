import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { publicUpdates, siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Updates & Public Records",
  description: "Approved Mendozer Investments community context and publicly verifiable records.",
  alternates: { canonical: "/updates" },
  openGraph: { images: [{ url: "/og/community.png", width: 1200, height: 630, alt: "Mendozer Investments updates and public records" }] },
};

export default function UpdatesPage() {
  const { updates } = siteContent;

  return (
    <>
      <PageHero body={updates.body} breadcrumbLabel="Updates & Public Records" eyebrow={updates.eyebrow} media={updates.hero} title={updates.title} />
      <section className="section updates-page">
        <div className="site-container">
          <SectionHeading
            body="The site records only approved community context and publicly verifiable information. It does not present unconfirmed site images as news or project proof."
            eyebrow="Published with care"
            title="Activity that can be checked."
          />
          <div className="updates-page__grid">
            {publicUpdates.map((update, index) => (
              <Reveal delay={index * 100} key={update.title}>
                <article className="update-card">
                  <MediaFrame asset={update.media} className="media-frame--update" sizes="(max-width: 760px) 100vw, 33vw" />
                  <div>
                    <p className="eyebrow">{update.eyebrow}</p>
                    <h2>{update.title}</h2>
                    <p>{update.body}</p>
                    {update.sourceUrl && update.sourceLabel ? (
                      <a className="text-link" href={update.sourceUrl} rel="noreferrer" target="_blank">Source: {update.sourceLabel} <ArrowIcon /></a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Group context</p><h2>Explore the directions behind the work.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/sectors">See the sectors <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
