import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorExplorer } from "@/components/SectorExplorer";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Explore Mendozer Investments working directions across construction, technology, cooling, logistics, energy, tourism, and agriculture in Namibia.",
  alternates: { canonical: "/sectors" },
  openGraph: { images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments sectors" }] },
};

export default function SectorsPage() {
  const { sectorHub } = siteContent;

  return (
    <>
      <PageHero body={sectorHub.body} breadcrumbLabel="Sectors" eyebrow={sectorHub.eyebrow} media={sectorHub.hero} title={sectorHub.title} />
      <section className="section sector-hub">
        <div className="site-container">
          <SectionHeading
            body="Choose the nearest starting point. If the scope crosses disciplines, use the group contact route and explain the full brief."
            eyebrow="Six working directions"
            title="Find the closest fit."
          />
          <Reveal delay={100}><SectorExplorer idPrefix="sector-directory" label="Mendozer sector directory" /></Reveal>
        </div>
      </section>
      <section className="section section--cta">
        <div className="site-container cta-panel">
          <Reveal><p className="eyebrow">Cross-sector enquiry</p><h2>Bring the full scope into one conversation.</h2></Reveal>
          <Reveal delay={100}><Link className="button button--primary" href="/contact">Prepare an enquiry <ArrowIcon /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
