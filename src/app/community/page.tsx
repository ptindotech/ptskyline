import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Community & Sponsorship",
  description: "Mendozer Investments community sponsorship presence: local events, sports, and initiatives supported across Namibia.",
  alternates: { canonical: "/community" },
  openGraph: { images: [{ url: "/og/community.png", width: 1200, height: 630, alt: "Mendozer Investments community sponsorship" }] },
};

export default function CommunityPage() {
  const { community } = siteContent;
  return (
    <>
      <PageHero body={community.body} breadcrumbLabel="Community & Sponsorship" eyebrow={community.eyebrow} media={community.hero} title={community.title} />
      <section className="section section--surface">
        <div className="site-container community-intro">
          <SectionHeading
            body="The current archive shows Mendozer sponsorship visibility at public-facing events. Specific event photography is preserved as supplied and is not presented as an organiser credit."
            eyebrow="Sponsorship presence"
            title="A visible role in moments that matter locally."
          />
        </div>
      </section>
      <section className="section initiatives-section">
        <div className="site-container initiatives-grid">
          {community.initiatives.map((initiative, index) => (
            <Reveal delay={index * 120} key={initiative.title} variant={index === 0 ? "left" : "right"}>
              <article className="initiative-card">
                <MediaFrame asset={initiative.media} className="media-frame--initiative" sizes="(max-width: 900px) 100vw, 50vw" />
                <div className="initiative-card__body">
                  <p className="eyebrow">Sponsorship</p>
                  <h2>{initiative.title}</h2>
                  <p>{initiative.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section community-gallery-section">
        <div className="site-container">
          <SectionHeading
            body="Client-supplied event photography is retained with generic event context while the broader sponsorship record is confirmed."
            eyebrow="Event archive"
            inverse
            title="Community moments, documented."
          />
          <div className="community-gallery">
            {[community.hero, community.initiatives[0].media, siteContent.home.community.media].map((asset, index) => (
              <Reveal delay={index * 90} key={asset.src}>
                <MediaFrame asset={asset} className={`community-gallery__item community-gallery__item--${index + 1}`} sizes="(max-width: 760px) 100vw, 33vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Connect with the group</p><h2>Start the conversation with Mendozer.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
