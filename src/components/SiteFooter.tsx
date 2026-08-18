import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent, verifiedFacts } from "@/content/site-content";

/**
 * Hyper-minimal Collins-style footer.
 *
 * - Single quiet wordmark at top, generous negative space.
 * - One direct enquiry line: email + registration number.
 * - Navigation hidden in native <details> accordions (Group, Sectors, Company).
 * - Social links as a single inline row.
 * - Bottom row: copyright, Tangison credit.
 * - No background media, no heavy logo lockup, no multi-column grid clutter.
 */
export function SiteFooter() {
  const fuelLicence = verifiedFacts.wholesaleFuelLicence;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div className="site-footer__top">
          <Link aria-label="Mendozer Investments home" className="site-footer__wordmark" href="/">
            <Image alt="Mendozer Investments" height={32} src={brandAssets.logoMonoWhite} style={{ height: "1.75rem", width: "auto" }} unoptimized width={160} />
          </Link>
          <a className="site-footer__email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>

        <div className="site-footer__accordions">
          <details className="site-footer__accordion">
            <summary>
              <span>Group</span>
              <span aria-hidden="true" className="site-footer__accordion-marker" />
            </summary>
            <nav aria-label="Group pages" className="site-footer__accordion-body">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/sectors">Sectors</Link>
              <Link href="/work">Work context</Link>
              <Link href="/updates">Updates</Link>
              <Link href="/compliance">Public records</Link>
              <Link href="/community">Community</Link>
              <Link href="/blog/otjiwarongo-sports-bonanza-2026">Sports Bonanza 2026</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/brand">Brand</Link>
            </nav>
          </details>

          <details className="site-footer__accordion">
            <summary>
              <span>Sectors</span>
              <span aria-hidden="true" className="site-footer__accordion-marker" />
            </summary>
            <nav aria-label="Sector pages" className="site-footer__accordion-body">
              {sectors.map((sector) => (
                <Link href={`/sectors/${sector.slug}`} key={sector.slug}>{sector.shortTitle}</Link>
              ))}
            </nav>
          </details>

          <details className="site-footer__accordion">
            <summary>
              <span>Company</span>
              <span aria-hidden="true" className="site-footer__accordion-marker" />
            </summary>
            <div className="site-footer__accordion-body site-footer__accordion-body--details">
              <span>Registration {siteContent.footer.registrationLabel}</span>
              <span>{siteContent.footer.vatLabel}</span>
              <a href={fuelLicence.sourceUrl} rel="noreferrer" target="_blank">Wholesale fuel licence W/188/2017</a>
              <Link href="/privacy">Privacy notice</Link>
              <Link href="/terms">Website terms</Link>
            </div>
          </details>
        </div>

        <div className="site-footer__social">
          <a href={siteConfig.social.instagram} aria-label="Mendozer Investments on Instagram" rel="noreferrer" target="_blank">Instagram</a>
          <span aria-hidden="true" className="site-footer__social-dot" />
          <a href={siteConfig.social.facebook} aria-label="Mendozer Investments on Facebook" rel="noreferrer" target="_blank">Facebook</a>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} Mendozer Investments</p>
          <a className="tangison-credit" href="https://studio.tangison.com" rel="noreferrer" target="_blank">
            <span>Site by Tangison</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
