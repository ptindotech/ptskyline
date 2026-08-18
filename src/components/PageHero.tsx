import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import type { MediaAsset } from "@/content/site-content";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  media: MediaAsset;
  breadcrumbLabel?: string;
  index?: string;
};

export function PageHero({ eyebrow, title, body, media, breadcrumbLabel, index }: PageHeroProps) {
  return (
    <>
      <section className="page-hero">
        <div className="site-container page-hero__grid">
          <div className="page-hero__copy">
            <Reveal><p className="eyebrow eyebrow--light">{eyebrow}</p></Reveal>
            <Reveal delay={80}><h1>{title}</h1></Reveal>
            <Reveal delay={150}><p>{body}</p></Reveal>
            {index ? <span aria-hidden="true" className="page-hero__index">{index}</span> : null}
          </div>
          <Reveal delay={100} variant="right">
            <MediaFrame asset={media} caption priority sizes="(max-width: 820px) 100vw, 47vw" />
          </Reveal>
        </div>
      </section>
      {breadcrumbLabel ? (
        <div className="breadcrumbs-wrap">
          <div className="site-container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]} /></div>
        </div>
      ) : null}
    </>
  );
}
