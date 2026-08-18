# Operations Manual: Mendozer Investments Website

## Current platform

- Framework: Next.js 16 static and SSG output
- Package manager: npm
- Hosting: Vercel
- Source repository: private GitHub repository `tangison/mendozer-investments`
- Working staging hostname: `mendozer.tangison.com`
- Preview hostname: `mendozer-tangison-preview.vercel.app`
- Production canonical hostname: `mendozer.com`
- `www.mendozer.com` redirects to `mendozer.com`

## Routine content update process

1. Update approved Mendozer copy only in `src/content/site-content.ts`.
2. Update the corresponding route metadata if the page purpose or primary search intent changes.
3. Add real images first. If a specific photo is unavailable, follow the locked image-generation policy in `BUILD_PLAN.md` and log every generated master in `ASSET_MANIFEST.md`.
4. Update `CONTENT_PLAN.md` when the factual status of copy, people, services, proof, or imagery changes.
5. Run the verification commands below before committing.
6. Commit, push to `main`, wait for the Vercel deployment, then verify both preview and staging URLs.

## Required local verification

```bash
npm ci
npm run typecheck
npm run lint
npm run test:content
npm run build
npm run test:a11y
npm run test:responsive
npm audit --omit=dev
```

The responsive suite covers the public route set, 320px through desktop viewport behavior, the single-sentence supplied-photo hero, compact motion, sector-explorer tabs and mobile disclosures, FAQ disclosures, floating navigation, full-screen navigation, breadcrumbs, scroll-to-top behavior, and utility-widget modal isolation. The Playwright configuration builds and starts the production server for its default browser gate, avoiding development-server instability during the full route suite. The accessibility suite runs Axe checks plus keyboard skip-link coverage.

## Environment variables

| Variable | Purpose | Safe value now |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph base URL | Production: `https://mendozer.com`; preview/staging: `https://mendozer.tangison.com` |
| `RESEND_API_KEY` | Server-side Resend credential | Required for direct server delivery. Keep secret in Vercel only. |
| `CONTACT_FROM_EMAIL` | Verified Resend sender address | Required for direct server delivery. |
| `CONTACT_TO_EMAIL` | Group recipient address | Configured in Vercel only. Do not place an address in public source unless approved. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional public WhatsApp control | Leave empty until a verified public number is approved. When empty, no WhatsApp control renders. |

Never place SMTP credentials, API keys, Vercel tokens, GitHub tokens, or other secrets in `NEXT_PUBLIC_*` variables or committed files.

## Contact workflow

The contact form posts to the server-side `/api/contact` route. The route validates required data, trims control characters, uses a honeypot, applies a basic in-memory rate limit, sends the group notification through Resend when configured, and attempts a visitor confirmation email. If server delivery is not configured, the form opens a prepared mailto fallback addressed to `contact@mendozer.com`.

## Utility controls

- The scroll-to-top control appears only after the visitor has moved beyond the configured scroll threshold. It uses smooth scrolling unless reduced motion is requested.
- The WhatsApp control is deliberately conditional. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` only after a verified public number is approved. Leave it empty to keep the control out of the rendered page.
- Utility controls are marked inert with the rest of the background while the full-screen navigation dialog is open.


Before a production-domain launch, configure a verified Resend sender, a durable distributed rate limiter, approved spam protection, recipient delivery testing, sender-domain authentication, lead-storage/privacy decisions, and monitoring. Update the Privacy Notice and Terms after the final workflow is approved.

## Image and vector rules

- Use the exact supplied Mendozer logos without redrawing or image-model regeneration.
- Keep source identity assets under `/assets` and byte-identical served copies under `/public/assets`.
- Keep real source photography in `/reference/photography`.
- Keep browser-served, selected images under `/public/images/projects`.
- Keep supplied-photo motion derivatives under `/public/media`, with a static poster, no audio, a reduced-motion fallback, and a complete ledger entry in `ASSET_MANIFEST.md`.
- Use documented generated masters under `/public/images/generated` only when no relevant supplied image exists for a placement.
- Keep SVG icon/divider/motif source assets under `/assets/vectors` with byte-identical public copies under `/public/assets/vectors`.

## Deployment and rollback

1. Vercel deploys `main` through the linked GitHub repository.
2. Verify the Vercel deployment reaches `READY`.
3. Check homepage, sector hub, one individual sector, Community, Contact, Privacy, Terms, sitemap, and robots on the deployment URL.
4. Verify TLS, response headers, canonical URLs, sitemap, and redirects on `mendozer.com`, `www.mendozer.com`, and `mendozer.tangison.com`.
5. If a release is faulty, revert the Git commit, push the revert to `main`, and verify the next Vercel deployment.

## Maintenance schedule

| Cadence | Actions |
|---|---|
| Monthly | Review broken links, staging uptime, Vercel deployment history, form workflow, dependency advisories, and contact delivery. |
| Quarterly | Run the full QA suite, Lighthouse, accessibility audit, visual review, image optimization review, and Search Console review once access exists. |
| On content update | Confirm permissions for project imagery and client references; update asset/content logs; re-run full build and responsive checks. |
| Before production-domain cutover | Complete every client-authority item in `LAUNCH_READINESS.md`, obtain direct written authority, and test all live operational flows. |

## Ownership and access record

Ownership of the domain, Vercel workspace, GitHub repository, design assets, email administration, analytics, Search Console, backups, and maintenance support must be confirmed with the client/Tangison project owner. Store access details in an approved password manager, not in the repository.
