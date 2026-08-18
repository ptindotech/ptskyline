import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPageTemplate } from "@/components/SectorPageTemplate";
import { getSector, sectors } from "@/content/site-content";

export const dynamicParams = false;

type SectorPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  const pathname = `/sectors/${sector.slug}`;
  return {
    title: sector.title,
    description: sector.description,
    alternates: { canonical: pathname },
    openGraph: {
      images: [{
        url: `/og/${sector.slug}.png`,
        width: 1200,
        height: 630,
        alt: `${sector.title} | Mendozer Investments`,
      }],
    },
  };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();
  return <SectorPageTemplate sector={sector} />;
}
