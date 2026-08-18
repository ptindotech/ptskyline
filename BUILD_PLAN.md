# BUILD_PLAN.md: Mendozer Investments

## Scope change (this revision)

Original plan assumed a lean, rush-timeline brochure site. Scope is now upgraded: this is a **large, high-production corporate website**, not a shallow brochure. It remains static, with no CMS, database, or authentication, but each approved route carries the visual and editorial depth appropriate to a multi-sector group.

## What "big" means here, concretely

- Each of the 6 sector pages gets full section depth: hero, services breakdown, visual context, cross-sector connection, and CTA. No route is a single-scroll stub.
- Homepage carries multiple image-led sections, not only a hero and grid.
- Community/Sponsorship gets a supplied-event gallery and separate sponsorship context.
- Social sharing is a first-class deliverable: Open Graph image per major page, not only a favicon.
- All supplied photography is assessed before any generated asset is commissioned.
- Where a specific image placement has no relevant supplied photography, use a **tangison-imagegen real-photography-style master asset**, not a brand-gradient placeholder.
- Icons, dividers, and decorative motifs are delivered as actual SVG vector assets through the `tangison-vectorgraphics` route, not approximated with Tailwind shapes, CSS beams, or raster substitutes.

## Architecture (unchanged, confirmed)

- Static site, Next.js + Tailwind + Vercel
- No auth, no payments, no database
- Production canonical domain: `mendozer.com`; `mendozer.tangison.com` remains the staging hostname
- Model: Branded House, one site, dedicated sector pages (see `site-architecture.md`)

## Rejected alternatives

- Subdomains per sector: rejected, adds build and maintenance cost without benefit for a static site.
- Separate domains per sector: rejected, undermines one accountable group positioning.
- CMS-backed dynamic site: rejected for now, content update frequency does not justify it; revisit if Mendozer needs self-service editing later.
- Brand-gradient placeholder photography: rejected by the active asset policy. Abstract branded geometry is allowed only as a documented vector decoration, never as a substitute for a missing photograph.

## Active asset generation policy: locked amendment

### Photo selection order

1. Use a relevant, supplied Mendozer-context photograph when it exists for the **specific placement**.
2. Reuse an existing approved generated master asset when it fits the placement.
3. Only if neither exists, commission a new real-photography-style master through `tangison-imagegen`.

### Generated photography standard

Every tangison-imagegen output must:

- Read as real, restrained Mendozer-context photography, not stock imagery or an invented project record.
- Use **one, two, or three deliberate elements maximum** in the frame, with generous negative space.
- Avoid busy compositions, staged corporate teams, generic African-continent visual tropes, fake text, fake logos, or false project documentation.
- Ground its subject in the supplied Mendozer reference archive: telecom tower rigging, road construction, steel structural work, plant piping, crew/site visits, Namibian desert tonal conditions, and relevant Windhoek or coastal built context.
- Use real industry equipment appropriate to the sector, not generic “innovation” imagery.
- Never recreate or alter the supplied Mendozer logo. Generated images must not contain generated Mendozer branding or fabricated text.
- Be labelled as an **AI-generated contextual visual, not documentary project photography** wherever a visitor could otherwise confuse it for a confirmed project/event record.

### Generated-asset ledger and reuse

For every generated master asset, `ASSET_MANIFEST.md` must record:

- Asset ID and exact file path
- Full prompt used
- Generation purpose and relevant visual grounding
- Every page and placement where it appears
- Alt text and visible caption/status

A generated master is reused across compatible placements instead of generating near-duplicates. Asset prompts are revised only when a new subject, framing, or confirmed context is genuinely required.

### Vectorgraphics route

- Sector icons, dividers, arrows, connection maps, and non-photographic decorative motifs must be real SVG assets produced through the `tangison-vectorgraphics` route.
- Vector assets draw only on locked Mendozer geometry and tokens. They do not redraw the official logo.
- CSS remains responsible for layout, states, and motion, not for imitating iconography or decorative artwork.

## Milestones

1. Content return from Johannes (onboarding form): still a client-content dependency, with gaps clearly marked.
2. `tangison-web-content` + `tangison-copywriting-master` pass: maintain `CONTENT_PLAN.md` and content status.
3. Asset audit: use supplied photography, then create only any uncovered specific-placement masters under the active policy.
4. `tangison-vectorgraphics` pass: package vector icon/divider/motif system as reusable SVG assets.
5. `tangison-web-build` implementation: complete all routes and reusable template behavior.
6. `tangison-web-audit` full pass: accessibility, performance, SEO, responsive, content accuracy, Hallmark, and Impeccable review.
7. Social asset generation: Open Graph images and sharing metadata.
8. `tangison-web-deploy`: production `mendozer.com`, apex canonical redirect policy, preview/staging validation, and search-verification handoff.

## Acceptance criteria

- All 6 sector pages are full routes with depth, not stub cards.
- No placeholder copy is presented as final factual copy.
- No brand-gradient or generic graphic substitutes for missing photography.
- Every tangison-imagegen asset has a complete ledger record in `ASSET_MANIFEST.md`, including prompt, path, pages, caption status, and reuse.
- All icon, divider, and decorative motif assets are reusable SVG vector files, not CSS/Tailwind approximations or raster stand-ins.
- No generated visual is presented as a real named project, staff portrait, credential, or event photograph.
- Passes `tangison-web-audit` before deployment approval or final release reporting.

## Editorial redesign and evidence-research pass: 2026-08-12

### Approved outcome

Refresh the complete Mendozer experience as an original editorial corporate site with a more restrained, lighter typographic voice, a simple media-led hero, a rebuilt full-screen navigation system, and consistent page-level refinement across the existing public route set. The reference study of `https://wearecollins.com/` informs only high-level principles such as direct editorial hierarchy, image-led pacing, strong navigation clarity, and careful use of motion. No Collins code, assets, copy, markup, CSS, layout reproduction, or pixel-for-pixel wireframe may be used.

### Locked redesign deliverables

1. **Typography and controls:** retain the verified Poppins family because it is the approved closest-match brand family, but shift the page system to lighter 400, 500, and 600 weights. Remove heavy 700 and 800 display treatment, glow effects, inflated shadows, and pervasive pill controls. Actions must become clear, compact, high-contrast, and touch-safe.
2. **Hero:** replace the rotating sector explorer with one simple group statement, two direct actions, a supplied-photo-first motion treatment, and a static poster fallback. Any moving media must be created from or licensed for supplied Mendozer context. Do not download, embed, or repurpose an arbitrary YouTube video.
3. **Full-screen navigation:** rebuild the off-canvas implementation from first principles as a full-viewport modal dialog with accessible Group, Sectors, and Contact tabs; structured sector disclosures; real contextual images; keyboard navigation; Escape handling; focus restoration; and inert background isolation.
4. **Page system:** re-art-direct the existing 16 public routes and not-found state through shared original components and a coherent CSS system. Preserve the existing route map, SEO, public records, image policy, accessible form, and legal pages. Do not add speculative Team, Careers, Case Studies, location, or service routes without verified content.
5. **Evidence research:** maintain `RESEARCH_LOG.md`, use official sources first, and publish no tender, founder, team, project, client, value, location, or outcome claim without exact identity evidence and client approval.
6. **Asset stewardship:** use supplied real imagery before creating derivatives. A motion derivative is permitted only from supplied real photography and must be logged in `ASSET_MANIFEST.md`. The official logo remains unmodified.
7. **Verification:** run type-check, lint, content integrity, production build, Axe, responsive interaction tests, cold-cache performance measurement, visual review at mobile and desktop, secret scan, GitHub SHA comparison, and Vercel `READY` deployment verification. Record only verified outcomes in `PROOF.md`.

### Scope count and completion gate

The delivery count is one coherent redesign covering 16 listed public routes plus the not-found state, one rebuilt full-screen navigation dialog, one simple motion-capable hero, and one public-research ledger. The release is not complete until every route uses the shared system without regressions, no unauthorised factual claims are introduced, and all listed verification gates pass.

## Mobile robustness, utility, and navigation pass: 2026-08-12

### Investigation evidence

Production mobile diagnostics at 320px, 375px, 390px, and 414px found two reproducible implementation defects.

1. Unrevealed `Reveal` elements using horizontal `translateX` transforms enlarge the document width after client motion initializes. This produced a 1px to 4px horizontal overflow on compact pages.
2. The full-screen navigation applies its entrance animation to the opaque modal root. Its opacity begins below 1, briefly showing the underlying page through the menu background.

The menu route links themselves were traced and verified on production. Sector, contact, group, and footer links navigate to the correct routes. The prior diagnostic that reported Home after a menu click read the URL before client navigation completed and was not a product defect.

### Locked deliverables

1. Correct the mobile Reveal transform rule at its source and add a post-motion compact-overflow regression test.
2. Make the full-screen menu backdrop immediately opaque and add a first-frame opacity regression test.
3. Refine the scrolled header into a compact floating rectangular navigation bar without glow or pill styling.
4. Simplify the home hero to one approved main sentence, remove the secondary hero label and support line, and enable the existing supplied-photo motion loop on compact screens except for reduced-motion users.
5. Move the decorative eyebrow rule from before text to below text across the shared system.
6. Add reusable breadcrumb trails to the nine interior top-level routes that do not already have sector breadcrumbs.
7. Add an accessible scroll-to-top control that appears only after meaningful scroll distance.
8. Add a WhatsApp control that renders only when an approved `NEXT_PUBLIC_WHATSAPP_NUMBER` is configured. It must remain absent when no verified number is supplied.
9. Add and run navigation, breadcrumb, widget, responsive, accessibility, build, performance, and deployed smoke regressions. Commit, push, wait for Vercel `READY`, and record the verified result.

### Completion gate

The pass is complete only when mobile client motion introduces no horizontal overflow, the menu root is opaque from the first frame, all tested menu links and breadcrumb trails navigate correctly, the conditional WhatsApp control remains hidden without a configured number, all existing public routes remain intact, and the deployed production, staging, and preview aliases pass live verification.

## Runtime font-token and verification-stability correction: 2026-08-12

### Root-cause correction scope

A post-deployment browser trace found that the local Poppins variable was attached to `body`, while `--font-sans` and `--font-display` resolve in the root token layer. CSS custom-property resolution therefore invalidated both font tokens at `:root`, making live mobile typography fall back to Times New Roman. A separate long-suite failure came from Playwright booting the Next development server, which was unstable under the complete route and browser workload even though the production server passed the same suite.

### Locked correction deliverables

1. Apply the `next/font/local` variable class to the document root so Poppins resolves through the shared token layer on every route and viewport.
2. Add a focused failing regression proving that `--font-sans` resolves and the computed home font includes Poppins.
3. Run browser evidence at 320px, 375px, 390px, 414px, and desktop to confirm the mobile hero, floating bar, menu tabs, sector disclosures, breadcrumbs, motion, and utility widgets remain connected.
4. Run Playwright against a production build rather than a development server so the 48-test browser gate measures the released architecture and does not fail due to dev-server instability.
5. Rebuild, rerun type, lint, content, accessibility, responsive, API, audit, performance, live production, GitHub, and Vercel release gates before marking the correction complete.
