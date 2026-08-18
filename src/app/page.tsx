import type { Metadata } from "next";
import Link from "next/link";
import { AccordionList } from "@/components/AccordionList";
import { ArrowIcon } from "@/components/ArrowIcon";
import { HeroFollowSection } from "@/components/HeroFollowSection";
import { HomeHero } from "@/components/HomeHero";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorExplorer } from "@/components/SectorExplorer";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments" }] },
};

export default function HomePage() {
  const { home } = siteContent;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: home.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} type="application/ld+json" />
      <HomeHero />
      <HeroFollowSection />

      <section className="section introduction-section">
        <div className="site-container introduction-section__grid">
          <div className="introduction-section__copy">
            <SectionHeading body={home.introduction.body} eyebrow={home.introduction.eyebrow} title={home.introduction.title} />
            <Reveal delay={160}>
              <Link className="text-link" href="/about">Read the group context <ArrowIcon /></Link>
            </Reveal>
          </div>
          <Reveal delay={100} variant="right">
            <MediaFrame asset={home.introduction.media} className="media-frame--tall" sizes="(max-width: 900px) 100vw, 43vw" />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface home-directions" id="sectors">
        <div className="site-container">
          <SectionHeading body={home.sectorIntro.body} eyebrow={home.sectorIntro.eyebrow} title={home.sectorIntro.title} />
          <Reveal delay={100} variant="up"><SectorExplorer idPrefix="home-directions" /></Reveal>
        </div>
      </section>

      <section className="section home-pathways">
        <div className="site-container">
          <SectionHeading body={home.connective.body} eyebrow={home.connective.eyebrow} title={home.connective.title} />
          <div className="home-pathways__list">
            <Link href="/work"><span>01</span><strong>Work context</strong><span>Real archive imagery, published carefully</span><ArrowIcon /></Link>
            <Link href="/updates"><span>02</span><strong>Updates</strong><span>Approved activity and public context</span><ArrowIcon /></Link>
            <Link href="/compliance"><span>03</span><strong>Public records</strong><span>Registration, VAT, and licensing record</span><ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="section community-feature">
        <div className="site-container community-feature__grid">
          <Reveal variant="left"><MediaFrame asset={home.community.media} className="media-frame--feature" sizes="(max-width: 900px) 100vw, 54vw" /></Reveal>
          <div className="community-feature__copy">
            <SectionHeading body={home.community.body} eyebrow={home.community.eyebrow} title={home.community.title} />
            <Reveal delay={160}><Link className="text-link" href="/community">View community context <ArrowIcon /></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark home-faq">
        <div className="site-container home-faq__grid">
          <SectionHeading body={home.faq.body} eyebrow={home.faq.eyebrow} inverse title={home.faq.title} />
          <Reveal delay={90} variant="right"><AccordionList items={home.faq.items} /></Reveal>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Start a conversation</p><h2>Bring the right work into focus.</h2></Reveal>
          <Reveal delay={100}><Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
