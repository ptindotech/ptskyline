import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Brand identity",
  description: "Mendozer Investments brand identity: logo variants, colour system, typography, and usage guidelines for the 2026 alternate logo set.",
  alternates: { canonical: "/brand" },
  openGraph: { images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Mendozer Investments brand" }] },
  robots: { index: false, follow: true },
};

type LogoVariant = {
  file: string;
  name: string;
  description: string;
  usage: string;
  background: "light" | "dark";
};

const variants: LogoVariant[] = [
  {
    file: "/assets/logos/brand-set/logo-02.svg",
    name: "Primary horizontal",
    description: "Full lockup with gradient icon mark and wordmark. The default for header navigation on light surfaces and letterhead.",
    usage: "Light backgrounds, header on white, print letterhead, business cards",
    background: "light",
  },
  {
    file: "/assets/logos/brand-set/logo-03.svg",
    name: "Stacked vertical",
    description: "Icon mark above wordmark, centred. Use when horizontal width is constrained or for centred compositions.",
    usage: "Splash screens, narrow columns, centred cards, social profile headers",
    background: "light",
  },
  {
    file: "/assets/logos/brand-set/logo-04.svg",
    name: "Icon mark only",
    description: "Gradient icon mark without wordmark. Use at small sizes where the full lockup would be illegible.",
    usage: "Favicons, app icons, watermarks, standalone mark on light surfaces",
    background: "light",
  },
  {
    file: "/assets/logos/brand-set/logo-08.svg",
    name: "Mono dark",
    description: "Single-colour dark charcoal lockup for single-ink print and high-contrast light surfaces.",
    usage: "Print, fax, embroidery, single-colour stamps on light backgrounds",
    background: "light",
  },
  {
    file: "/assets/logos/brand-set/logo-01.svg",
    name: "Mono gray",
    description: "Single-colour gray lockup for understated placements and partner co-branding on light surfaces.",
    usage: "Grayscale print, partner co-brand, secondary placements on light",
    background: "light",
  },
];

const colours = [
  { name: "Gradient start", hex: "#00C0FF", usage: "Icon mark top-left, bright signal" },
  { name: "Gradient end", hex: "#4218B8", usage: "Icon mark bottom-right, depth" },
  { name: "Mid blue", hex: "#0D4D9A", usage: "Gradient midpoint, transition" },
  { name: "Charcoal", hex: "#303030", usage: "Mono dark variant, single-ink print" },
  { name: "Gray", hex: "#686868", usage: "Mono gray variant, understated placements" },
];

export default function BrandPage() {
  return (
    <>
      <section className="page-hero page-hero--text-only">
        <div className="site-container page-hero__copy">
          <Reveal><p className="eyebrow">Brand identity</p></Reveal>
          <Reveal delay={80}><h1>The 2026 alternate logo set.</h1></Reveal>
          <Reveal delay={150}>
            <p>Five transparent-background logo variants supplied on 2026-08-13. This page documents each variant, its colour values, and its correct usage slot. The production site uses the locked Mendozer brand tokens; this set is retained as an alternate for future brand refresh work.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <SectionHeading
            eyebrow="Logo variants"
            title="Five transparent lockups."
            body="Each variant has a transparent background. None use an opaque tile. Choose the variant that matches the surface colour and the placement width."
          />

          <div className="brand-grid">
            {variants.map((variant) => (
              <figure key={variant.file} className={`brand-card brand-card--${variant.background}`}>
                <div className="brand-card__media">
                  <Image
                    alt={`${variant.name} logo variant`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    src={variant.file}
                    unoptimized
                  />
                </div>
                <figcaption className="brand-card__body">
                  <p className="brand-card__name">{variant.name}</p>
                  <p className="brand-card__description">{variant.description}</p>
                  <p className="brand-card__usage">
                    <span className="brand-card__label">Use on</span>
                    <span>{variant.usage}</span>
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="site-container">
          <SectionHeading
            eyebrow="Colour system"
            title="Five verified colours."
            body="Sampled directly from the SVG stop-color and fill values in the supplied logo files. These are the alternate-set colours, not the locked production brand tokens."
          />

          <div className="brand-colours">
            {colours.map((colour) => (
              <div key={colour.hex} className="brand-colour">
                <div className="brand-colour__swatch" style={{ background: colour.hex }} />
                <div className="brand-colour__body">
                  <p className="brand-colour__name">{colour.name}</p>
                  <p className="brand-colour__hex">{colour.hex}</p>
                  <p className="brand-colour__usage">{colour.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="site-container">
          <SectionHeading
            eyebrow="Usage rules"
            title="Use the right variant for the surface."
            body="These rules apply to the alternate set. The production site continues to use the locked brand tokens until a brand refresh is approved."
            inverse
          />

          <div className="brand-rules">
            <div className="brand-rule">
              <p className="brand-rule__number">01</p>
              <p className="brand-rule__text">Never place a light-background variant on a dark surface. Use a mono-white reversed lockup instead, or commission one if it is missing from this set.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">02</p>
              <p className="brand-rule__text">Never stretch, skew, or recolour the gradient icon mark. The gradient direction and stop positions are fixed in the SVG source.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">03</p>
              <p className="brand-rule__text">Minimum full-lockup width is 120px. Minimum icon-mark height is 24px. Below these sizes, legibility degrades and the brand loses recognition.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">04</p>
              <p className="brand-rule__text">Do not place the full-colour gradient lockup over busy photography. Restrict it to quiet single-colour surfaces where the gradient can read cleanly.</p>
            </div>
            <div className="brand-rule">
              <p className="brand-rule__number">05</p>
              <p className="brand-rule__text">The mono variants are for single-ink print and understated placements only. Do not use them as a substitute for the full-colour lockup on screen.</p>
            </div>
          </div>

          <div className="brand-cta">
            <Link className="text-link text-link--light" href="/contact">
              <span>Request the full brand kit</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
