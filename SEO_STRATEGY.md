# SEO Strategy: Mendozer Investments

## Purpose

This document records the current on-page search strategy for the static Mendozer Investments website. It uses search-intent hypotheses, not invented search-volume claims. Search Console, Google Business Profile, confirmed company details, and approved service copy are required before the strategy can be validated against real query data.

## Search objective

Help a Namibian investor, institutional buyer, commercial partner, or sector-specific enquirer identify Mendozer Investments, understand the relevant working direction, and start a direct enquiry.

## Current page intent map

| Route | Primary intent theme | Supporting intent | Current evidence |
|---|---|---|---|
| `/` | Mendozer Investments Namibia | multi-sector solutions, construction, technology, logistics, energy, tourism | Group homepage, verified brand, sector directory |
| `/about` | About Mendozer Investments | diversified investment and operations group Namibia | Group framing, registration/VAT, verified licence reference |
| `/sectors` | Mendozer sectors | construction, technology, cooling, logistics, energy, tourism, agriculture Namibia | Crawlable sector directory |
| `/sectors/construction` | Construction and infrastructure Namibia | site works, built works, project coordination | Real construction-context imagery, generic copy pending confirmation |
| `/sectors/technology` | Technology systems Namibia | telecom infrastructure, field systems | Real tower/installation context imagery |
| `/sectors/cooling` | Cooling and cold chain Namibia | temperature-sensitive facility context | Real industrial facility imagery, client service detail pending |
| `/sectors/logistics` | Logistics and support services Namibia | site logistics, field coordination | Real vehicle/container/crew context imagery |
| `/sectors/energy` | Wholesale fuel distribution Namibia | fuel and energy infrastructure | Verified wholesale licence W/188/2017 and public Gazette source |
| `/sectors/tourism` | Tourism and agriculture Namibia | rural operations, land context | Real landscape/rural context imagery |
| `/work` | Mendozer work context | construction, field systems, logistics support context Namibia | Real supplied work-context imagery without named project claims |
| `/updates` | Mendozer updates and public records | community sponsorship, public licence record | Approved event context and publicly verifiable records |
| `/compliance` | Mendozer public records and licences | registration, VAT, wholesale fuel distribution licence Namibia | Verified registration values and Gazette source |
| `/community` | Mendozer community sponsorship | Miss Teen Namibia 2026, Otjiwarongo Sports Bonanza sponsor acknowledgement | Supplied event images and clearly labelled generated context image |
| `/contact` | Contact Mendozer Investments | group enquiry, sector enquiry | Server delivery route when configured, email fallback otherwise |

## Technical foundations already in place

- One clear H1 per route.
- Unique route titles and descriptions for core public pages.
- Clean readable URLs.
- Server-rendered Next.js content.
- Canonical URLs controlled by `NEXT_PUBLIC_SITE_URL`.
- XML sitemap and `robots.txt`.
- Open Graph and X card metadata.
- Organization and FAQPage structured data built from verified site data.
- Image alternatives and meaningful generic captions for unconfirmed project context.
- Internal links between group, sector, contact, legal, and community pages.
- No keyword stuffing, fake location address, fake phone number, or fabricated proof.

## Content upgrades required for stronger organic performance

1. Confirm the six active sector names and client-approved service descriptions.
2. Provide public project names, case studies, client permissions, certifications, and location/context where publishable.
3. Confirm physical address, telephone number, operating hours, service areas, and social profiles.
4. Create and verify a Google Business Profile using actual business data.
5. Verify Search Console, submit the staging or future production sitemap, and review real search queries before adding location pages.
6. Add local business schema only after verified address, phone, and operating-area data are available.
7. Build external links only from legitimate Namibian business, industry, partner, and press sources.

## Search operations after launch

- Add the exact Google Search Console verification value to Vercel as `GOOGLE_SITE_VERIFICATION`; the metadata layer will emit the required verification tag automatically.
- Add the exact Bing Webmaster Tools verification value to Vercel as `BING_SITE_VERIFICATION`; the metadata layer will emit `msvalidate.01` automatically.
- Submit `https://mendozer.com/sitemap.xml` to the authorised Google Search Console and Bing Webmaster Tools properties after the deployment using the production canonical environment is ready.
- Keep `https://mendozer.tangison.com/sitemap.xml` available as a staging validation source, not the primary production submission.
- Check index coverage, crawl errors, canonical selection, and mobile usability monthly for the first quarter.
- Track brand queries separately from sector-intent queries.
- Use actual search queries to decide whether a service-area or sector expansion page is justified.
- Do not create thin location pages, duplicate sector copy, or unsupported comparison content.
