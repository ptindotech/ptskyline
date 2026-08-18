# PRODUCT.md: Mendozer Investments Website

## Product definition

A high-production, image-led corporate site for **Mendozer Investments**, built as a static Next.js application. It introduces the group, gives each of the six working sectors a complete first-class page, documents community sponsorship presence, and gives prospective partners a direct way to start a conversation.

The website is deliberately a **branded house**, not six sub-brands: the group identity leads, while the sector pages provide focused entry points.

## Primary audiences

1. **Business partners and investors**: need a credible, easy-to-scan view of the group’s breadth.
2. **Institutional and commercial enquiries**: need to identify a relevant sector and make contact without navigating a complex organisation.
3. **Community stakeholders**: need a clear, factual view of visible sponsorship presence.

## Experience principles

- **Image first:** supplied work and event photography does the visual work; copy stays concise.
- **Clear hierarchy:** a confident group introduction, clear sector routes, then a direct contact path.
- **Factual restraint:** no invented statistics, named projects, testimonials, clients, certifications, hours, or social handles.
- **Portable architecture:** Mendozer content is isolated from the reusable component and template layer.
- **Accessible by default:** semantic landmarks, keyboard-visible focus, labelled controls, meaningful photo alternatives, skip link, and reduced-motion support.

## Implemented routes

| Route | Product role | Core elements |
|---|---|---|
| `/` | Group overview | Motion-led image hero, group introduction, six-sector directory, connected-group visual, community feature, CTA |
| `/about` | Group context | Group framing, operating approach, leadership placeholder, verified registration details |
| `/sectors` | Services hub | Crawlable directory for all six Mendozer working directions |
| `/sectors/construction` | Dedicated sector route | Hero, services, supplied visual context, cross-sector connection, contact CTA |
| `/sectors/technology` | Dedicated sector route | Same reusable sector template, data-driven content |
| `/sectors/cooling` | Dedicated sector route | Same reusable sector template, data-driven content |
| `/sectors/logistics` | Dedicated sector route | Same reusable sector template, data-driven content |
| `/sectors/energy` | Dedicated sector route | Same reusable sector template, data-driven content |
| `/sectors/tourism` | Dedicated sector route | Same reusable sector template, data-driven content |
| `/work` | Work context | Real archive imagery with no unverified project, client, or location claims |
| `/updates` | Updates and public records | Approved sponsorship context and publicly verifiable activity records |
| `/compliance` | Public records and licences | Registration, VAT, verified fuel licence, and public source link |
| `/community` | Sponsorship presence | Event hero, factual sponsorship cards, supplied event gallery |
| `/contact` | Enquiry conversion | Secure delivery route when configured, direct email fallback, verified legal details |
| `/privacy` | Privacy notice | Factual explanation of secure delivery when configured and the mailto fallback |
| `/terms` | Website terms | Clear website-use context with no invented service, project, or availability claim |

## Functional requirements implemented

- Static compilation through Next.js; no database, CMS, authentication, payment, or tracking dependency.
- SEO metadata, canonical URLs, Open Graph assets per major page, `robots.txt`, `sitemap.xml`, and a web manifest.
- Canonical URL sourced from `NEXT_PUBLIC_SITE_URL`, with production set to `https://mendozer.com` and staging set separately without component changes.
- Official supplied logo and favicon assets served unchanged from `/public/assets`.
- Reusable `SectorPageTemplate` driven by the `sectors` content array: no duplicated sector-page implementations.
- Header navigation, mobile navigation, footer route map, Tangison Studio credit, and accessible contact form.
- Contact form uses a server-side delivery route with validation, honeypot, basic rate limit, approved Resend configuration, group notification, visitor confirmation, and mailto fallback when delivery credentials are absent.

## Intentional non-features

- No claims based on unavailable source information.
- No CMS or editor interface; content is compiled from `src/content/site-content.ts`.
- No database-backed lead store, CRM, or client portal. The server-side delivery route activates only after approved Resend variables are configured in Vercel.
- No CMS, database, payment, or unapproved third-party tracking integration.
- No private analytics or third-party tracking script.

## Content release condition

The delivered six-sector structure follows the more complete banner version in the brief. The client must still confirm the active sector list and sector-specific service copy. The source identifies these generic descriptions as placeholders rather than presenting them as verified client claims.
