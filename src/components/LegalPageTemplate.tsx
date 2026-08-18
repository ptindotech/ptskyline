import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import type { LegalPage } from "@/content/site-content";

type LegalPageTemplateProps = {
  page: LegalPage;
};

/** Reusable, fact-led legal-information page without invented regulatory claims. */
export function LegalPageTemplate({ page }: LegalPageTemplateProps) {
  return (
    <>
      <section className="legal-hero">
        <div aria-hidden="true" className="legal-hero__accent" />
        <div className="site-container legal-hero__inner">
          <Reveal><p className="eyebrow">{page.eyebrow}</p></Reveal>
          <Reveal delay={90}><h1>{page.title}</h1></Reveal>
          <Reveal delay={180}><p>{page.intro}</p></Reveal>
        </div>
      </section>

      <div className="breadcrumbs-wrap">
        <div className="site-container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.eyebrow }]} /></div>
      </div>

      <section className="section legal-page">
        <div className="site-container legal-page__grid">
          <aside className="legal-page__aside">
            <p className="eyebrow">Mendozer Investments</p>
            <p>Information is kept clear, limited to the current website workflow, and reviewed when that workflow changes.</p>
          </aside>
          <div className="legal-page__sections">
            {page.sections.map((section, index) => (
              <Reveal delay={index * 90} key={section.heading}>
                <section>
                  <span>0{index + 1}</span>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Direct contact</p><h2>Start with a clear group enquiry.</h2></Reveal>
          <Reveal delay={110}><Link className="button button--primary" href="/contact">Prepare an enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
