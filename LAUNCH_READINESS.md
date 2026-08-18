# Launch Readiness: Mendozer Investments

This register maps the implemented website against the practical items in an industry-standard corporate website checklist. It distinguishes what is complete, what is intentionally out of scope, and what requires client, legal, DNS, or service-provider authority.

## Ready in the repository

### Strategy, structure, and content

- Group objective, investor and partner audience, customer journey, page structure, and primary contact action are documented in `PRODUCT.md`, `BUILD_PLAN.md`, and `CONTENT_PLAN.md`.
- The approved public route set is complete: Home, About, a sector directory, six sector pages, Work Context, Updates, Public Records and Licences, Community, Contact, Privacy Notice, Website Terms, and a custom 404 page.
- FAQ-style enquiry guidance is available on the homepage through accessible native disclosure controls.
- No testimonials, case studies, client logos, metrics, staff biography, service price, certification, location, phone number, hours, or social account is fabricated.
- The public wholesale fuel distribution licence fact is cited accurately from the Namibia Government Gazette source.

### Design and user experience

- Official supplied Mendozer and Tangison identity assets are used unchanged.
- Locked Mendozer colour, type, spacing, radius, and motion tokens drive the interface.
- Floating navigation uses a compact rectangular scrolled bar and a full-viewport group dialog. The dialog provides Group, Sectors, and Contact tabs, real contextual imagery, native sector disclosures, keyboard access, Escape handling, focus restoration, and inert background isolation.
- Homepage uses one direct sentence as its only hero heading, with supplied-photo WebM/MP4 motion and a static poster fallback. Motion remains available on compact screens unless reduced motion is requested. Sector exploration moves below the hero, using accessible tabs on larger screens and native disclosures on compact screens.
- Homepage includes an accessible FAQ accordion with enquiry guidance.
- Interior top-level pages expose semantic breadcrumb trails back to Home.
- A scroll-to-top control appears only after meaningful scroll distance. A WhatsApp control renders only when `NEXT_PUBLIC_WHATSAPP_NUMBER` contains an approved public number.
- Footer exposes group navigation, sector navigation, direct email, registration/VAT, privacy notice, website terms, the verified licence source, and the required Tangison Studio credit.
- Buttons are compact, rectangular, high-contrast controls. Cards and media use fine borders and restrained square geometry rather than glow effects or pervasive pills.

### Accessibility, SEO, performance, and technical quality

- Semantic landmarks, one H1 per route, semantic breadcrumbs, labelled form controls, descriptive links, alt text, visible focus states, keyboard menu access, a skip link, scroll-to-top behavior, and reduced-motion behavior are implemented.
- Axe WCAG 2 A/AA checks pass for Home, About, Technology, Community, Contact, Privacy, and Terms.
- Responsive checks cover 320px, 375px, 390px, 414px, 768px, and desktop. They cover post-motion overflow, first-frame menu opacity, floating navigation, breadcrumb trails, menu-route completion, scroll-to-top behavior, and utility-widget modal isolation.
- Organization and FAQ JSON-LD are emitted from crawlable HTML using verified site details only.
- Unique metadata, canonical URLs, XML sitemap, robots rules, Open Graph metadata, and social images are present.
- Next.js image optimization, modern formats, preloaded local Poppins files, a supplied-photo WebM/MP4 motion layer with static poster fallback, lazy loading for non-critical media, and Vercel CDN delivery are active. The latest local cold mobile audit recorded Lighthouse Performance 93, Accessibility 100, Best Practices 100, SEO 100, LCP 1.9s, TBT 300ms, and CLS 0. Desktop Lighthouse recorded 100 across all four categories with CLS 0.
- Security headers are configured through `vercel.json`: HSTS, content type protection, referrer policy, frame policy, and permissions policy.
- Dependency audit reports zero known production vulnerabilities.

## Intentionally out of scope

These items do not apply to the current approved static corporate build:

- E-commerce catalogue, stock, checkout, payment, delivery, refund, abandoned-cart, or product-schema functions.
- Booking engine, appointment availability, or payment confirmation flow.
- Customer accounts, authentication, database, uploads, CMS editing, or client portal.
- Third-party advertising pixels, social feeds, embedded maps, live chat, or heavy widgets.
- Testimonials, case studies, public client names, project metrics, or certificates that were not supplied for publication.

## Requires client or service-provider authority for full production operations

| Area | Required action | Why it cannot be completed autonomously |
|---|---|---|
| Contact delivery | Maintain approved Resend credentials, a verified sender, durable rate limiting, spam protection, and periodic recipient delivery testing | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` are configured as encrypted Vercel Production and Preview values. A controlled production request returned HTTP 200 with `ok: true`. The route has validation, a honeypot, a basic process-local rate limit, confirmation attempt, and mailto fallback. A durable distributed rate limit and independent inbox confirmation remain operational follow-up. |
| Contact details | Confirm public telephone number, physical address, operating hours, service areas, and social profiles | None were supplied as verified publishable facts. |
| Legal review | Have Privacy Notice, Website Terms, licences, and any sector-specific disclaimer reviewed by the client or legal adviser | The pages accurately describe current technical behavior, but legal ownership and required wording belong to the client. |
| Analytics and consent | Approve analytics platform, consent policy, conversion events, and cookie posture | The current build intentionally contains no analytics or advertising tracker. |
| Search operations | Verify Google Search Console, submit sitemap, connect a Google Business Profile, and confirm local directory listings | These require ownership of the relevant external accounts and verified business address/contact details. |
| Email domain | Confirm SPF, DKIM, DMARC, mailbox ownership, and sender reputation for `contact@mendozer.com` | DNS and mailbox administration are external to this repository. |
| Backup and monitoring | Confirm owner, backup policy, error monitoring, uptime monitoring, rollback contact, and support responsibility | Vercel hosts the static build, but operational ownership and support terms are not provided. |
| Content authority | Confirm active sector list, sector-specific services, named projects, clients, real case studies, leadership profile, and published imagery rights | The website does not invent supporting proof. |
| Production search operations | Add Google and Bing verification values, submit the production sitemap, and review index coverage | `mendozer.com` is authorised and attached; search-console ownership verification remains external. |

## Current staging and ownership state

- Private source repository: `https://github.com/tangison/mendozer-investments`
- Working Vercel preview: `https://mendozer-tangison-preview.vercel.app`
- Authorised staging hostname: `https://mendozer.tangison.com`
- Production canonical hostname: `https://mendozer.com`, HTTPS verified
- Secondary hostname: `https://www.mendozer.com`, HTTP 308 redirect verified to the apex hostname
- Canonical URL is configurable through `NEXT_PUBLIC_SITE_URL`; changing it at launch does not require component-level edits.

## Post-cutover production gate

After production deployment, confirm:

1. Approved final sector/service copy and publishable proof.
2. Approved contact-delivery provider and successful recipient test.
3. Verified legal/contact/business details.
4. Client ownership of domain, hosting, code repository, design assets, and email administration.
5. Search Console, sitemap submission, analytics/consent decision, monitoring, backup, and support-owner decisions.
6. Final mobile, accessibility, SEO, performance, form, external-link, and browser checks against the live staging hostname.
7. Google Search Console and Bing Webmaster Tools verification, sitemap submission, and initial index monitoring.
