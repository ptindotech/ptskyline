# Mendozer Investments

A production-ready, image-led corporate website for Mendozer Investments. Built with **Next.js, TypeScript, Tailwind, and Vercel** as a static-first site with a reusable Tangison multi-sector corporate starter architecture.

> **Domain plan:** `mendozer.com` is the authorised production canonical hostname. `mendozer.tangison.com` remains the staging hostname for ongoing validation.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local Next.js development server |
| `npm run typecheck` | Strict TypeScript validation |
| `npm run lint` | ESLint / Next Core Web Vitals rules |
| `npm run test:content` | Static content and architecture safety checks |
| `npm run build` | Production build |
| `npm run test:responsive` | Playwright responsive regression suite against a production build |
| `npm run test:a11y` | Axe accessibility test suite |
| `npm run qa` | Type-check, lint, content checks, and production build |

## Routes

- `/`: group homepage
- `/about`: group overview, working leadership card, verified registration details
- `/sectors`: crawlable directory of the six working directions
- `/sectors/construction`
- `/sectors/technology`
- `/sectors/cooling`
- `/sectors/logistics`
- `/sectors/energy`
- `/sectors/tourism`
- `/work`: real work-context archive with disciplined publication boundaries
- `/updates`: approved community context and public records
- `/compliance`: registration, VAT, and verified public licence record
- `/community`: sponsorship presence
- `/contact`: direct enquiry
- `/privacy`: factual privacy notice for the secure delivery workflow and mailto fallback
- `/terms`: website-use terms for current introductory group information

## Project structure

```text
src/
├── app/                       # Next.js routes and global presentation CSS
│   ├── sectors/[slug]/         # One statically-generated dynamic sector route
│   ├── about/ community/ contact/
│   ├── robots.ts sitemap.ts manifest.ts
│   └── globals.css
├── brand/                     # BRAND LAYER: tokens, deployment config, official asset map
│   ├── tokens.css
│   ├── site-config.ts
│   └── assets.ts
├── content/                   # CONTENT LAYER: Mendozer copy, route labels, sectors, image mapping
│   └── site-content.ts
└── components/                # STRUCTURAL LAYER: reusable components/templates, no brand copy
    ├── SectorPageTemplate.tsx
    ├── PageHero.tsx
    ├── SiteHeader.tsx / SiteFooter.tsx
    └── …
assets/                        # Exact supplied source logo/favicons; retained for provenance
public/
├── assets/                    # Byte-identical browser-served copies of official identity files
├── images/projects/           # Curated public copies of supplied reference photography
├── images/generated/          # Logged tangison-imagegen contextual masters only when a specific photo is unavailable
├── assets/vectors/            # Byte-identical served SVG output from the tangison-vectorgraphics route
└── og/                        # 1200×630 social-sharing images
reference/photography/         # Full delivered original photo archive; not transformed
scripts/                       # Deterministic build-time helpers (OG generation, checks)
```

## Brand / content / structure separation

This repository is intentionally organised as a **Tangison starter template** for future corporate multi-sector builds:

- **Brand layer:** swap `src/brand/tokens.css`, `src/brand/site-config.ts`, `src/brand/assets.ts`, `assets/`, and `public/assets/`. Components resolve tokens rather than hardcoding a palette or type pairing.
- **Content layer:** swap `src/content/site-content.ts`; it holds client-specific copy, navigation labels, sector data, media paths, and route content. The six sector pages come from one `sectors` array.
- **Structural layer:** retain `src/components/`, route shell, accessibility patterns, motion controller, and responsive CSS. `SectorPageTemplate` stays unchanged unless the future project needs a genuinely different page model.

### Fork recipe for a future Tangison client

1. Fork this repository and rename it.
2. Replace official identity assets under `assets/`, then copy them identically to `public/assets/`.
3. Replace the locked values in `src/brand/tokens.css` and update `src/brand/assets.ts`.
4. Replace `src/content/site-content.ts` with approved client content and update sector/media records.
5. Replace `/reference/photography/` and curate browser-ready copies under `/public/images/projects/`.
6. Update `ASSET_MANIFEST.md`, `BRAND.md`, `CONTENT_PLAN.md`, OG assets (`python3 scripts/generate-og.py`), metadata, and environment URL.
7. Run the full QA gate before deployment.

Do not use the reusable structure as a reason to carry Mendozer content, logo files, or token values into another client project.

## Content and asset integrity

- Mendozer logo files are supplied assets; they have not been regenerated.
- Sector photo tags are visual best-guesses pending client confirmation. Page captions deliberately avoid named project claims.
- Brand-gradient graphics are never used as substitutes for missing photography. When a specific placement lacks a relevant supplied photo, use one logged, ultra-minimal tangison-imagegen contextual master and disclose its non-documentary status in `ASSET_MANIFEST.md`.
- Sector icons, dividers, arrows, and decorative motifs are reusable SVG assets from the tangison-vectorgraphics route, not CSS/Tailwind approximations.
- No fake statistics, testimonials, certifications, named clients, or project claims are used.
- The current six-sector structure and generic sector descriptions need client confirmation; see `CONTENT_PLAN.md`.

## Motion and accessibility

The site uses a single `IntersectionObserver` reveal controller. On compact screens, horizontal reveal offsets convert to vertical offsets so client motion cannot create horizontal overflow. The homepage hero uses a supplied-photo motion loop with a static poster fallback; other movement is intentionally minimal. `prefers-reduced-motion: reduce` disables motion and leaves content visible.

Accessibility foundations include semantic landmarks, skip link, visible focus treatments, labelled form controls, local fonts, reduced motion, image alt text, responsive layouts, and an Axe/Playwright gate.

## Contact form delivery

The contact route now posts to the server-side `/api/contact` endpoint. It validates required fields, uses a honeypot, applies a basic in-memory rate limit, sends the group notification and a best-effort visitor confirmation through Resend when delivery is configured, and falls back to a prepared `mailto:` message when delivery credentials are absent.

Configure the following **server-only** Vercel environment variables before treating direct delivery as production-ready:

```bash
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=website@your-verified-sending-domain.example
CONTACT_TO_EMAIL=contact@mendozer.com
```

`CONTACT_FROM_EMAIL` must be a sender verified by the approved provider. Never place SMTP, Resend, or other delivery secrets in `NEXT_PUBLIC_*` variables. The in-memory limiter is a basic fallback only; use a durable rate-limit service before a production-domain launch.

## Deployment

### Environment

```bash
NEXT_PUBLIC_SITE_URL=https://mendozer.com
```

`NEXT_PUBLIC_SITE_URL` is the only canonical-domain setting. Production uses `https://mendozer.com`; previews and staging use `https://mendozer.tangison.com`.

### Vercel

1. Import the private GitHub repository into the intended Vercel account/team or deploy via the Vercel CLI.
2. Set `NEXT_PUBLIC_SITE_URL=https://mendozer.com` for production and `https://mendozer.tangison.com` for preview/staging.
3. Confirm production build success, canonical URLs, headers, mobile layout, metadata, redirects, and TLS.
4. Keep `mendozer.com` as the canonical hostname and redirect `www.mendozer.com` to the apex hostname with HTTP 308.
5. Retain `mendozer.tangison.com` as the staging hostname for validation and rollback checks.
6. Add Google and Bing verification values in Vercel when each platform provides its token, then submit `https://mendozer.com/sitemap.xml`.

`vercel.json` includes conservative browser security headers. The site has no database or server-side secrets.

## Documentation

- `SYSTEM.md`: original operating constraints
- `BUILD_PLAN.md`: supplied build plan
- `BRAND.md`: implementation brand reference
- `PRODUCT.md`: product scope and non-goals
- `CONTENT_PLAN.md`: content inventory/status
- `ASSET_MANIFEST.md`: source/usage/status of visual assets
- `PROOF.md`: intake, implementation, QA, and deployment record
- `LAUNCH_READINESS.md`: completed checklist items, intentional exclusions, and client-authority items before production-domain cutover
- `SEO_STRATEGY.md`: page-intent map, current technical SEO, and Search Console follow-up
- `OPERATIONS_MANUAL.md`: content, asset, verification, deployment, rollback, and maintenance procedure
- `AUDIT_REPORT.md`: prioritized code-level accessibility, performance, theming, responsive, security, and anti-pattern audit
