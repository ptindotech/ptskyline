import Link from "next/link";
import { absoluteUrl } from "@/brand/site-config";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MediaFrame } from "@/components/MediaFrame";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorGlyph } from "@/components/SectorGlyph";
import { sectors, type Sector } from "@/content/site-content";

type SectorPageTemplateProps = {
  sector: Sector;
};

/** Reusable sector-page composition; content/data lives in src/content/site-content.ts. */
export function SectorPageTemplate({ sector }: SectorPageTemplateProps) {
  const currentIndex = sectors.findIndex((item) => item.slug === sector.slug);
  const nextSector = sectors[(currentIndex + 1) % sectors.length];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sectors", item: absoluteUrl("/sectors") },
      { "@type": "ListItem", position: 3, name: sector.title, item: absoluteUrl(`/sectors/${sector.slug}`) },
    ],
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} type="application/ld+json" />
      <PageHero
        body={sector.description}
        eyebrow={sector.eyebrow}
        index={sector.number}
        media={sector.hero}
        title={sector.title}
      />

      <div className="breadcrumbs-wrap">
        <div className="site-container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sectors", href: "/sectors" }, { label: sector.title }]} /></div>
      </div>

      <section className="section section--surface">
        <div className="site-container sector-intro">
          <Reveal variant="left">
            <div className="sector-intro__icon"><SectorGlyph name={sector.glyph} /></div>
          </Reveal>
          <div>
            <SectionHeading
              body="A closer view of the work context and the practical areas this sector is designed to address."
              eyebrow="What we do"
              title="Designed around the work on the ground."
            />
          </div>
        </div>
      </section>

      <section className="section section--services">
        <div className="site-container">
          <div className="service-list">
            {sector.services.map((service, index) => (
              <Reveal delay={index * 90} key={service.title}>
                <article className="service-item">
                  <span className="service-item__number">0{index + 1}</span>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                  <SectorGlyph name={sector.glyph} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {sector.verifiedFact ? (
        <section className="section sector-verified">
          <div className="site-container sector-verified__inner">
            <Reveal variant="left">
              <p className="eyebrow">{sector.verifiedFact.eyebrow}</p>
              <h2>{sector.verifiedFact.title}</h2>
            </Reveal>
            <Reveal delay={120} variant="right">
              <p>{sector.verifiedFact.body}</p>
              <a className="text-link" href={sector.verifiedFact.sourceUrl} rel="noreferrer" target="_blank">
                <span>Source: {sector.verifiedFact.sourceLabel}</span><ArrowIcon />
              </a>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="section section--gallery">
        <div className="site-container sector-gallery">
          <div className="sector-gallery__heading">
            <SectionHeading
              body="Client-supplied context photography is presented without named-project claims while sector tags remain to be confirmed."
              eyebrow="On site"
              title="The work is visible in the details."
            />
          </div>
          <div className="sector-gallery__media">
            <Reveal delay={80} variant="left"><MediaFrame asset={sector.gallery[0]} className="media-frame--portrait" /></Reveal>
            <Reveal delay={170} variant="right"><MediaFrame asset={sector.gallery[1]} className="media-frame--wide" /></Reveal>
          </div>
        </div>
      </section>

      <section className="sector-crossover">
        <div className="site-container sector-crossover__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">Working across the group</p>
            <p className="sector-crossover__quote">{sector.crossover}</p>
          </Reveal>
          <Link className="text-link text-link--light" href={`/sectors/${nextSector.slug}`}>
            <span>Next sector: {nextSector.shortTitle}</span><ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal>
            <p className="eyebrow">Let’s talk</p>
            <h2>Bring the right sector into the conversation.</h2>
          </Reveal>
          <Reveal delay={110}>
            <Link className="button button--primary" href="/contact">Contact Mendozer <ArrowIcon /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
