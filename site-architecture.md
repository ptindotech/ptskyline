# SITE_ARCHITECTURE.md: Mendozer Investments

**Staging domain:** mendozer.tangison.com (now, during build)
**Production domain:** mendozer.com (at launch, requires explicit authorization to connect)
**Contact email (both phases):** contact@mendozer.com
**Model:** Branded House: one site, one SEO authority pool, dedicated first-class pages per sector (not subdomains, not separate domains)

## Sitemap

```
mendozer.com/
├── /                          Home: group overview, sector grid, CTA
├── /about                     Group overview, MD profile, reg details
├── /sectors/construction      Construction & Infrastructure
├── /sectors/technology        Technology & Systems
├── /sectors/cooling           Cooling & Cold Chain
├── /sectors/logistics         Logistics & Support Services
├── /sectors/energy            Fuel & Energy Distribution
├── /sectors/tourism           Tourism & Agriculture
├── /community                 Sponsorships (Miss Teen Namibia, Otjiwarongo Sports Bonanza)
└── /contact                   Contact form → contact@mendozer.com
```

*Sector slugs above are placeholders pending final sector-list confirmation (4 vs 6: see onboarding form item 9). Update this file once confirmed.*

## Per-sector page template (applies to all 6)

Each sector page is a full page, not a shared card: reinforces "one group, six real capabilities," not "one group, six bullet points."

1. Hero: large image (real photo once available, brand-gradient graphic placeholder until then) + short sector name + one-line description
2. What we do: 2-4 concrete services, image-paired, minimal copy per the image-first direction in brand-guidelines.md
3. Proof (once available): named projects, certifications: leave blank, don't invent
4. CTA back to /contact

## Notes
- Group homepage stays high-level: it's the investor/partner-facing entry point. Depth lives on the sector pages.
- Future option (not now): if one sector: most likely Tourism: outgrows the group site and needs its own consumer-facing brand/domain, that's a phase 2 decision, made after this site is live and proven.
- Contact routing: all forms → contact@mendozer.com until Johannes confirms per-sector routing (if any) is needed.
