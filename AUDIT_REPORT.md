# Impeccable Technical Quality Audit: Mendozer Investments

**Audit date:** 2026-08-10  
**Scope:** Current Next.js 16 production build, source review, automated accessibility and responsive suites, static analysis, package audit, and local Lighthouse runs.  
**Mode:** Audit only. No production implementation fixes were made as part of this report.

## Context gathered

- Framework: Next.js 16.3.0, App Router, static and SSG routes
- Package manager: npm with `package-lock.json`
- Brand context: locked Mendozer token layer in `src/brand/tokens.css`
- Rendering: server-rendered public pages plus focused client widgets for navigation, contact form, and hero sector explorer
- Deployment: Vercel with custom preview and `mendozer.tangison.com` staging host
- Test coverage reviewed: Axe, keyboard skip link, 27 responsive and route/widget checks
- Existing design system: supplied Mendozer logo, Poppins, verified palette, spacing scale, vector asset route, real project context photography

## Audit Health Score

| Dimension | Score | Key finding |
|---|---:|---|
| 1. Accessibility | **3/4** | Automated WCAG AA checks pass, but the auto-advancing hero requires a user pause control and a few mobile targets fall below the 44px design target. |
| 2. Performance | **3/4** | Warm local Lighthouse is strong, but cold image optimization produced a 4.1s LCP and the scroll header re-renders React state on every animation-frame update. |
| 3. Responsive Design | **3/4** | No horizontal overflow across tested widths, but the menu control and sector-tab controls are 42px and 38px high on small screens. |
| 4. Theming | **4/4** | Runtime styling is token-led. The only literal runtime colours are static PWA/theme metadata values. |
| 5. Anti-Patterns | **4/4** | The design is specific to Mendozer, avoids fake metrics and generic proof, and uses a restrained visual system. |

**Total: 17/20, Good**  
Address the P1 launch-readiness issues before a final production-domain release. Address P2 items in the next refinement pass.

## Anti-Patterns Verdict

**Pass:** The implementation does not read as generic AI landing-page output.

Positive signals:

- Official logo assets are used without regeneration or redraw.
- Real Mendozer-context images lead the sector experience.
- Generated imagery is disclosed and logged rather than passed off as project proof.
- The navigation is an intentional editorial system, not a generic SaaS navbar.
- The site avoids fake metrics, testimonials, client logos, pricing, and “trusted by” proof bars.
- Buttons are rounded by request, but content cards retain restrained radii and are not all converted into pills.
- No gradient text, purple default palette, dashboard mockup, stock-team scene, or meaningless counter appears.

## Executive Summary

The site is technically solid and visually coherent. Type-checking, linting, build output, package audit, live staging headers, automated Axe coverage, and responsive route tests all pass. The existing token system is strong, the image treatment is disciplined, and the code avoids unnecessary UI dependencies.

The most meaningful remaining concerns are operational rather than visual:

- The hero sector slider changes automatically without a visible pause control.
- The static mailto contact workflow cannot provide server-side validation, anti-spam, recipient delivery confirmation, rate limiting, or conversion tracking.
- The current Vercel security-header set lacks a Content Security Policy.
- Mobile controls in the header and hero sector rail do not meet the project’s own preferred 44px touch-target floor.

## Detailed Findings

### [P1] Auto-advancing hero does not expose a pause or stop control

**Location:** `src/components/HomeHero.tsx:23-31`  
**Category:** Accessibility  
**Impact:** The sector image and selected sector content change every 7.2 seconds. A visitor reading the sector panel can lose the current content before completing it. Reduced-motion users are protected, but other users cannot pause the update.  
**WCAG/Standard:** WCAG 2.2.2 Pause, Stop, Hide applies to auto-updating content that starts automatically and lasts longer than five seconds.  
**Recommendation:** Add a visible pause/play control adjacent to the hero sector tabs. Persist the user selection for the page session and stop auto-rotation after direct interaction.  
**Suggested command:** `/quieter` followed by `/adapt`

### [P1] Contact conversion path is not production-grade lead handling

**Location:** `src/components/ContactForm.tsx:35-54`  
**Category:** Forms and lead handling  
**Impact:** The default workflow opens a visitor email application. It does not provide server-side validation, spam protection, rate limiting, recipient delivery confirmation, lead storage, confirmation email, or measurable form conversion. The optional public endpoint variable is not sufficient without an approved backend.  
**WCAG/Standard:** Operational launch requirement and lead-handling best practice.  
**Recommendation:** Before `mendozer.com` is connected, provision an approved server-side mail or form provider. Validate on the server, rate limit, add spam protection, send confirmation, notify the group, and update Privacy Notice and Terms.  
**Suggested command:** `/harden`

### [P2] Mobile menu and hero tabs are below the 44px preferred touch target

**Location:** `src/app/globals.css:431-432`, `src/app/globals.css:443`  
**Category:** Responsive Design and Accessibility  
**Impact:** The mobile menu control is 2.65rem, about 42px. Hero tab controls are 2.4rem, about 38px high. They remain usable and exceed WCAG 2.5.8 minimum size, but they fall short of the project’s stated 44px Hallmark touch-target floor.  
**WCAG/Standard:** WCAG 2.5.8 Target Size Minimum is met; 44px is a stronger mobile usability target.  
**Recommendation:** Raise menu and tab minimum heights to at least 2.75rem. Retain the horizontal scroll-snap behavior.  
**Suggested command:** `/adapt`

### [P2] Header scroll-progress behavior re-renders React state throughout scrolling

**Location:** `src/components/SiteHeader.tsx:40-61`  
**Category:** Performance  
**Impact:** The requestAnimationFrame handler updates `isScrolled` and `scrollProgress` state while scrolling. This is controlled by one frame guard, but it still re-renders the client header and hidden menu tree frequently on long pages.  
**WCAG/Standard:** Render efficiency best practice.  
**Recommendation:** Keep the threshold state in React only when it changes. Write scroll-progress directly to a CSS custom property on the progress element through a ref, or use a dedicated minimal component that avoids re-rendering the menu tree.  
**Suggested command:** `/optimize`

### [P2] Cold local Lighthouse shows costly initial image optimization

**Location:** `src/components/HomeHero.tsx:52-61`, Vercel and Next image delivery path  
**Category:** Performance  
**Impact:** The first local Lighthouse run scored Performance 61 with LCP 4.1s and TBT 1,100ms. A warm run improved to Performance 93 with LCP 3.1s and TBT 50ms. The variance indicates initial image transformation and local cold-start cost rather than a layout problem, but first-visit production behavior should be measured on staging over a throttled mobile network.  
**WCAG/Standard:** Core Web Vitals and first-visit performance best practice.  
**Recommendation:** Measure the staging host on a cold cache. Consider pre-generating a hero WebP/AVIF derivative, preloading only the first hero image, and keeping slider image changes non-priority after initial render.  
**Suggested command:** `/optimize`

### [P2] Off-canvas dialog does not inert the background document

**Location:** `src/components/SiteHeader.tsx:107-177`  
**Category:** Accessibility  
**Impact:** The menu uses `role="dialog"`, `aria-modal="true"`, focus restoration, and a local focus loop. These are strong practices. However, the rest of the page is not marked inert or hidden while the overlay is open, so screen-reader behavior can vary by browser and assistive technology.  
**WCAG/Standard:** ARIA dialog pattern and modal isolation best practice.  
**Recommendation:** Apply `inert` to the main content and footer while the menu is open, or use a dialog implementation that manages background isolation natively.  
**Suggested command:** `/harden`

### [P2] No Content Security Policy is configured

**Location:** `vercel.json:8-18`  
**Category:** Security  
**Impact:** HSTS, type protection, referrer policy, frame policy, and permissions policy are present. A CSP is absent, leaving a meaningful defense-in-depth gap against injected scripts or unexpected third-party content if the site evolves.  
**WCAG/Standard:** OWASP secure headers best practice.  
**Recommendation:** Design and test a restrictive CSP compatible with Next.js output, local fonts, optimized images, and any approved future form endpoint. Apply it first on staging.  
**Suggested command:** `/harden`

### [P3] Static PWA theme values duplicate token colors

**Location:** `src/app/layout.tsx:50-53`, `src/app/manifest.ts:11-12`  
**Category:** Theming  
**Impact:** Runtime CSS is fully token-driven. The manifest and viewport metadata use literal brand hex values because browser manifests do not consume CSS variables. This is a contained duplication, not a broad token-system failure.  
**WCAG/Standard:** Token consistency best practice.  
**Recommendation:** Document these platform-required values alongside the token source or generate them from a single metadata constant.  
**Suggested command:** `/colorize`

### [P3] Breadcrumbs are semantic but do not emit BreadcrumbList JSON-LD

**Location:** `src/components/Breadcrumbs.tsx:11-24`, `src/components/SectorPageTemplate.tsx`  
**Category:** Technical SEO  
**Impact:** Visible breadcrumbs and internal linking are already useful to visitors and crawlers. BreadcrumbList schema is optional but would strengthen deep-sector route interpretation.  
**WCAG/Standard:** Schema.org BreadcrumbList best practice.  
**Recommendation:** Add BreadcrumbList JSON-LD per sector route after confirming the canonical route hierarchy will remain stable.  
**Suggested command:** `/optimize`

### [P3] Social image specificity is incomplete for utility routes

**Location:** `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/sectors/page.tsx`  
**Category:** Social sharing and SEO  
**Impact:** Core pages have dedicated Open Graph assets. The sectors hub reuses home imagery, while Privacy and Terms inherit global social metadata. This is acceptable but less precise when utility pages are shared.  
**WCAG/Standard:** Open Graph and X card completeness best practice.  
**Recommendation:** Decide whether utility pages should be shareable. If yes, provide restrained dedicated social cards. If not, consider `noindex` only if the legal pages are not intended for public search.  
**Suggested command:** `/optimize`

## Patterns and Systemic Issues

1. **Launch operations need external authority.** Mail delivery, analytics, consent, Search Console, Google Business Profile, email DNS, backups, monitoring, public contact details, and legal approval are documented in `LAUNCH_READINESS.md`. They cannot be truthfully completed from code alone.
2. **Motion has been added intentionally but needs one ownership control.** The hero slider is carefully scoped, but the lack of pause control is a systemic pattern to avoid as future widgets are introduced.
3. **Responsive testing is strong, but the visual target floor is stricter than the minimum standard.** No overflow was detected across 320px through desktop, yet a few targets fall below the project’s 44px preference.
4. **The token system is healthy.** Color usage is centralized in `src/brand/tokens.css`. Static browser metadata is the only meaningful token duplication.

## Positive Findings

- Full TypeScript, ESLint, content-integrity, production build, and production dependency-audit checks pass.
- npm production audit reports zero vulnerabilities.
- Automated Axe checks pass on Home, About, Technology, Community, Contact, Privacy, and Terms.
- Keyboard skip navigation, two-line menu open/close, Escape behavior, and focus restoration are covered.
- Responsive tests cover 320px, 375px, 390px, 414px, 768px, and desktop. No horizontal overflow is detected.
- Official logo assets are preserved and source/public asset equality is checked.
- Images are served through Next.js optimization, non-critical media is lazy-loaded, and no raw `<img>` tag is used in source components.
- The site uses semantic links, buttons, details/summary accordions, landmarks, labels, canonical URLs, sitemap, robots, Open Graph, X metadata, Organization schema, and FAQ schema.
- Vercel headers provide HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, and Permissions-Policy.
- The site avoids fabricated proof and documents unresolved client-content dependencies instead of pretending they are final.

## Recommended Actions

1. **[P1] `/quieter`**: Add a visible pause/play control and stop auto-rotation after direct sector-tab interaction.
2. **[P1] `/harden`**: Replace the mailto-only production lead path with an approved server-side delivery workflow, spam protection, validation, rate limiting, confirmation, and recipient testing.
3. **[P2] `/adapt`**: Increase mobile menu and sector-tab touch targets to 44px or larger.
4. **[P2] `/optimize`**: Decouple scroll-progress painting from React state and measure cold-cache staging LCP before launch.
5. **[P2] `/harden`**: Add and test a CSP on staging, then isolate background content while the modal navigation is open.
6. **[P3] `/colorize`**: Centralize PWA/theme metadata values with the brand-token source.
7. **[P3] `/optimize`**: Add BreadcrumbList schema and decide utility-page social-card/noindex policy.
8. **[P3] `/polish`**: Re-run the visual pass after the higher-priority accessibility and performance work is complete.

You can ask me to run these one at a time, all at once, or in any order you prefer. Re-run `/audit` after fixes to see the score improve.

## Remediation Follow-Up: 2026-08-10

The user requested a focused mobile, hero, off-canvas, and footer refinement after the initial audit. The following previously reported items were addressed and re-tested.

| Previous finding | Remediation | Evidence | Status |
|---|---|---|---|
| P1 auto-advancing hero lacked a pause control | Added an explicit pause/resume rotation control on the desktop sector explorer. Any direct tab selection pauses rotation. Mobile hides the explorer and disables auto-rotation so the hero remains intentionally focused. | `src/components/HomeHero.tsx`; responsive test checks `aria-pressed` and Resume state | Resolved |
| P2 mobile touch targets below 44px | Increased the mobile menu target to 44px, increased sector links in the off-canvas menu to 44px minimum, and removed the small hero tab rail from compact mobile hero layouts. | `src/app/globals.css`; responsive mobile target test | Resolved |
| P2 modal navigation did not isolate background content | Main content and footer receive `inert` while the menu is open and are restored after close. | `src/components/SiteHeader.tsx`; off-canvas regression test | Resolved |
| P2 mobile hero felt overloaded | Mobile hero now contains only the brand statement, image, and two direct actions. Sector discovery remains available in the sector hub and off-canvas navigation. | `src/components/HomeHero.tsx`, `src/app/globals.css`; 320px through 414px responsive checks | Resolved |
| P3 footer lacked a dominant brand row | Footer now begins with the official Mendozer dark-theme lockup at large full-row scale and keeps all operational links below it compact. | `src/components/SiteFooter.tsx`, `src/app/globals.css` | Resolved |

### Follow-Up Health Score

| Dimension | Score | Current key finding |
|---|---:|---|
| Accessibility | **4/4** | Automated WCAG AA checks pass; hero pause control, background inert behavior, focus restoration, and keyboard navigation are covered. |
| Performance | **3/4** | Cold first-image optimization and header scroll state remain the main measurable improvement areas. |
| Responsive Design | **4/4** | Mobile hero is intentionally reduced, controls meet the 44px target where applicable, and no overflow appears across tested widths. |
| Theming | **4/4** | Token-led runtime styling remains consistent. |
| Anti-Patterns | **4/4** | The editorial navigation, large identity row, real imagery, and restrained widgets remain intentional and distinct. |

**Follow-Up Total: 19/20, Excellent**

### Remaining prioritized findings

1. **[P1] `/harden`**: Replace the mailto-only production lead path with approved server-side delivery, validation, spam protection, rate limiting, recipient confirmation, and tracking.
2. **[P2] `/optimize`**: Decouple scroll-progress painting from React state and measure cold-cache staging LCP.
3. **[P2] `/harden`**: Design and test a CSP on staging.
4. **[P3] `/colorize`**: Centralize static PWA metadata values with token-source documentation.
5. **[P3] `/optimize`**: Add BreadcrumbList schema and decide utility-page social-card policy.
6. **[P3] `/polish`**: Perform a final visual pass after any future form/backend implementation.

## Delivery, Security, and Performance Follow-Up: 2026-08-10

| Previous finding | Remediation | Evidence | Status |
|---|---|---|---|
| P1 mailto-only lead flow | Added server-side `/api/contact` route with required-field validation, email validation, control-character cleanup, honeypot handling, basic in-memory rate limiting, Resend group delivery, visitor confirmation attempt, and mailto fallback. | `src/app/api/contact/route.ts`, `tests/contact-api.spec.ts` | Code resolved; direct live delivery remains configuration-dependent until approved Resend credentials and verified sender are set in Vercel. |
| P2 scroll-progress React re-renders | Scroll progress now writes a CSS custom property directly through a ref. React state changes only when the scrolled threshold changes. | `src/components/SiteHeader.tsx` | Resolved |
| P2 cold hero image cost | Added a 1600x900 WebP derivative of supplied construction photography for initial hero delivery and serves it directly for the first hero frame. | `public/images/projects/construction/mendozer-home-hero.webp`, `src/components/HomeHero.tsx` | Resolved locally: Lighthouse Performance 98, LCP 1.9s, TBT 130ms, CLS 0. |
| P2 missing CSP | Added CSP configuration alongside the existing Vercel security headers. | `vercel.json` | Implemented; staging header verification required after deployment. |
| P3 PWA metadata token duplication | Moved static browser theme values into `siteConfig.browserTheme` and reused them from viewport and manifest exports. | `src/brand/site-config.ts`, `src/app/layout.tsx`, `src/app/manifest.ts` | Resolved |
| P3 BreadcrumbList and utility route policy | Added BreadcrumbList JSON-LD to sector pages. Privacy and Terms now use `noindex, follow` while remaining linked and accessible. | `src/components/SectorPageTemplate.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Resolved |

### Current Audit Status

The implementation-level follow-up score is **19/20, Excellent**. The only remaining P1 is provisioning the approved Resend credentials, verified sender domain, and durable production rate limiter in Vercel. That action requires external account authority and cannot be truthfully simulated in source code.

### Deployment Verification

The remediation deployment was verified at both `https://mendozer-tangison-preview.vercel.app` and `https://mendozer.tangison.com`.

- The Content-Security-Policy header is present and the pages render successfully.
- HSTS, type protection, referrer policy, frame policy, and permissions policy remain present.
- The desktop pause control and first-view WebP hero derivative are present in delivered HTML.
- The only remaining production-readiness dependency is Vercel configuration of `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, plus an approved durable distributed rate limiter. Those secrets and provider ownership cannot be created from repository code.

## Structural and Content Follow-Up: 2026-08-11

A direct structural review highlighted thin sector depth, no public proof mechanism, limited activity context, one visible leadership name, generic repeated captions, and weak internal discoverability of deep pages. The following response preserves factual restraint.

| Observation | Response | Status |
|---|---|---|
| Sector pages were perceived as thin | Reworked generic service labels, descriptions, cross-sector context, CTAs, and sector captions for clearer capabilities language without inventing scope, clients, service areas, or results. | Improved, client service detail still pending |
| No public work or project mechanism | Added `/work`, a real archive-context page that provides portfolio structure while explicitly withholding unapproved project names, client names, locations, and scope claims. | Resolved without fabricated case studies |
| No visible activity mechanism | Added `/updates`, limited to approved community context and publicly verifiable records. | Resolved with factual publication boundary |
| Licence buried in footer | Added `/compliance` with registration, VAT, verified wholesale fuel licence, and Gazette source. | Resolved |
| Repeated generic image captions | Replaced generic repeated captions with sector-context captions such as construction work, field systems work, facility support, logistics support, energy infrastructure, and rural operating context. | Resolved |
| Region acknowledgment needed | Copy now states Namibian working context and formal local business audience directly. Specific city/service-area claims remain excluded until verified. | Resolved within available facts |
| Leadership depth limited | Kept Johannes Negumbo as the only named leader because no other client-approved team data exists. The site now has a visible work, records, and updates structure rather than invented leadership profiles. | Requires client data |

The direct review correctly identified that unapproved information should not be faked to make a group site feel more active. The current site now has mechanisms for approved proof, work contexts, public records, and updates to be added without redesigning the architecture.

## Editorial redesign and evidence-research validation: 2026-08-12

### Reference boundary

The live COLLINS website at `https://wearecollins.com/` was reviewed as a public reference for broad editorial principles only: direct hierarchy, quiet navigation, media-led pacing, and clear program discovery. The Mendozer implementation does not copy Collins code, text, assets, CSS, markup, layout, wireframe, or page composition. It uses the locked Mendozer identity, supplied assets, factual content boundary, and original React/CSS implementation.

### Design outcome

| Area | Result |
|---|---|
| Typography | Retained local Poppins, the verified brand family, and reduced active weights to 400, 500, and 600. Large displays now use 400 rather than heavy 700 or 800 treatment. |
| Hero | Replaced the rotating sector widget with a direct full-viewport group statement, two actions, a supplied-photo WebM/MP4 motion derivative, and a static WebP poster. Compact and reduced-motion views use the poster only. |
| Controls | Removed glow, shadow, gradient-driven UI, and rounded action treatment. Controls are compact rectangular elements with visible borders, clear focus states, and 44px mobile targets. |
| Navigation | Rebuilt the menu as a full-viewport modal dialog with original Group, Sectors, and Contact tabs. It provides real contextual imagery, sector disclosures, keyboard tab navigation, Escape close, focus restoration, and inert background isolation. |
| Discovery | Added an original sector explorer below the home hero. Desktop uses keyboard-accessible tabs. Compact layouts use native disclosures. No sector auto-rotation remains. |
| Page system | Re-art-directed all 16 public routes and the not-found state through the shared editorial page system, retaining every verified fact, public record, legal route, contact route, and sitemap entry. |
| Evidence research | Added `RESEARCH_LOG.md`. The June 2025 Gazette confirms the existing licence listing. A Kunene Regional Council candidate procurement record remains unpublished because its legal-name match and publication approval are unresolved. No founder or team claim was invented. |

### Impeccable and Hallmark review

- **Hierarchy:** Each public route now begins with a distinct, direct image-plus-editorial composition rather than a generic card stack.
- **Authenticity:** The motion layer is a ten-second derivative of supplied construction photography. No arbitrary YouTube media, stock footage, generated logo, fake client, or unverified project is used.
- **Restraint:** The interface has no glow, card-shadow decoration, dashboard UI, gradient text, fake proof, counter, testimonial, or copied agency treatment.
- **Mobile:** The hero remains one-screen, legible, and action-led at 320px through 414px. The full-screen dialog is scrollable, contained, and uses large targets.
- **Accessibility:** The original redesign corrected light-surface contrast issues before final verification. Native disclosures, focus visibility, semantic tabs, and reduced-motion behavior remain intact.

### Final measured verification

| Gate | Method | Result |
|---|---|---|
| Type safety | `npm run typecheck` | PASS |
| Lint | `npm run lint` | PASS, zero warnings |
| Content and asset integrity | `npm run test:content` | PASS: six sectors, 36 mapped assets, 10 OG images, supplied logo equality, motion ledger and files verified |
| Production build | `npm run build` | PASS: 21 outputs including dynamic contact API |
| Responsive and interaction | `npx playwright test tests/responsive.spec.ts` | PASS: 24 tests across all public routes, 320px through desktop, full-screen dialog, desktop tabs, mobile disclosures, and simple motion hero |
| Accessibility | `npx playwright test tests/accessibility.spec.ts` | PASS: 11 Axe and keyboard tests |
| Contact route | `npx playwright test tests/contact-api.spec.ts` | PASS: 3 validation, honeypot, and delivery-configuration tests |
| Route smoke | Local production server and curl across 20 pages, feeds, and media paths | PASS: all returned HTTP 200 |
| Dependency audit | `npm audit --omit=dev` | PASS: zero vulnerabilities |
| Secret and style guard | Source scan | PASS: no tracked credential pattern, em dash, glow, shadow, or radial-gradient styling |
| Mobile Lighthouse | Cold local production audit | Performance 96, Accessibility 100, Best Practices 100, SEO 100. FCP 0.8s, LCP 1.7s, TBT 210ms, CLS 0.053. |
| Desktop Lighthouse | Local production audit | Performance 100, Accessibility 100, Best Practices 100, SEO 100. FCP 0.3s, LCP 0.6s, TBT 0ms, CLS 0.003. |

### Remaining external dependencies

1. Maintain the configured Resend variables, verify the recipient inbox and visitor confirmation independently, and replace the process-local limiter with a durable distributed service before relying on the form at high volume.
2. Confirm whether the candidate Kunene Regional Council procurement record refers to Mendozer Investments CC before any public publication.
3. Supply approved founder, leadership, team, project, client, location, and service information before expanding those content areas.

## Systematic mobile debugging and utility pass: 2026-08-12

### Phase 1: root-cause evidence

Production mobile diagnostics ran at 320px, 375px, 390px, and 414px with browser console, failed-request, geometry, focus, and navigation capture.

| Observed symptom | Evidence | Root cause |
|---|---|---|
| Compact horizontal overflow after client hydration | Production document width grew by 1px to 4px after motion initialized. The overflow trace identified below-fold `Reveal` wrappers with `data-reveal="left"` and `data-reveal="right"` outside the viewport. | Global horizontal `translateX` entrance transforms contributed to document scroll width on narrow screens. |
| Underlying page briefly visible through opened navigation | The modal root had computed opacity below 1 immediately after opening. The production capture showed `0.26314` at the first inspected frame. | The menu applied its entrance animation to the opaque modal root instead of to an inner element. |
| Menu links reported as disconnected by an early diagnostic | Production navigation trace used `waitForURL` and verified Group, Sectors, Contact, and footer routes. | No product defect. The earlier check read route state before Next.js navigation completed. |
| Desktop layout shift in performance audit | Lighthouse attributed CLS 0.063 to the hero content container. | Local Poppins assets loaded after initial fallback text layout. |

### Phase 2 and 3: pattern analysis and hypothesis checks

- The existing `Reveal` component already supports vertical movement. The compact breakpoint now uses that working vertical pattern for left and right variants instead of adding horizontal movement.
- A modal backdrop must be opaque from its first frame. Removing the root opacity animation keeps the full-screen menu solid while preserving the dialog interaction model.
- `next/font/local` supplies a preloaded local-font pattern. Three tracked Poppins WOFF2 files replace the unused package import and prevent font-induced hero movement.

New regression tests were added before each corresponding fix. The pre-fix compact-overflow and first-frame-opacity tests failed. They pass after the source-level fixes.

### Phase 4: completed implementation

| Area | Verified result |
|---|---|
| Motion containment | Horizontal reveal transforms convert to vertical offsets below 50rem. Post-motion 320px overflow test passes. |
| Modal integrity | Full-screen navigation root is opaque from the first rendered frame. Underlying content no longer flashes through. |
| Navigation | The scrolled header becomes an inset floating rectangular bar without glow or pill geometry. Menu links complete client-side routing. |
| Hero | The home hero has one main sentence, no hero eyebrow or support paragraph, and keeps supplied-photo video motion available on compact screens unless reduced motion is requested. |
| Decorative rules | Shared eyebrow rules now appear below labels instead of as dash-like marks before text. |
| Breadcrumbs | Nine top-level interior routes now expose semantic breadcrumb trails back to Home. Sector breadcrumbs remain unchanged. |
| Utility controls | Scroll-to-top appears only after meaningful scrolling. WhatsApp remains absent without a configured public number and was separately verified with a temporary test number to produce a correctly normalized `wa.me` URL. Utility controls are inert while the menu is open. |
| Font delivery | Poppins 400, 500, and 600 are preloaded through `next/font/local`. Mobile and desktop final Lighthouse runs recorded CLS 0. |

### Final verification

- `npm ci`, type-check, lint, content integrity, dependency audit, and production build passed.
- 47 combined responsive, accessibility, route, navigation, widget, and API tests passed.
- 20 local page, feed, and motion-asset paths returned HTTP 200.
- Lighthouse local production results: mobile Performance 96, Accessibility 100, Best Practices 100, SEO 100, FCP 0.8s, LCP 2.7s, TBT 90ms, CLS 0. Desktop Performance 100, Accessibility 100, Best Practices 100, SEO 100, FCP 0.2s, LCP 0.6s, TBT 0ms, CLS 0.

The only unresolved WhatsApp dependency is the public number itself. No number has been fabricated or enabled in production configuration.

## Runtime font-token and test-server correction: 2026-08-12

### Systematic debugging record

A browser trace against the deployed mobile site completed root-cause investigation before implementation.

| Symptom | Evidence | Root cause | Source-level correction |
|---|---|---|---|
| Typography rendered as Times New Roman on live mobile pages | `getComputedStyle(document.body).fontFamily` returned `"Times New Roman"`; `--font-sans` and `--font-display` were empty while `--font-poppins` existed only on `body`. The focused regression failed before the change. | `next/font/local` attached `--font-poppins` to `body`, but root-scoped tokens resolved their `var(--font-poppins)` reference at `:root`, where the variable did not exist. | Moved the local-font variable class to `<html>`, so the root token layer resolves Poppins before children inherit it. The focused test now passes. |
| Full browser suite became unstable after many routes under test | The same 34 responsive tests passed against a local production server. The Next development server run lost its connection during the breadcrumb pass and caused false follow-on failures. | Development-server HMR and compiler lifetime were the failing component, not breadcrumbs, routing, or utility widgets. | Playwright now builds and starts the production server when no external test base URL is supplied. The complete 48-test suite passes through the standard test command. |
| Intermittent 390px navigation diagnostic | Direct DOM inspection at 390px found visible, enabled Group, Sectors, and Contact tabs with correct geometry. A fresh interaction trace selected Sectors successfully. | The earlier broad diagnostic mixed a long-lived external-page sequence with an incomplete race capture. It did not reproduce as a product failure. | Retained the existing navigation regression tests and verified menu interaction, routing, inert isolation, and compact containment through the full production test suite. |

### Verification after correction

- Type-check, lint, content integrity, production build, dependency audit, and the full 48 Playwright tests passed.
- Poppins now resolves in computed styles at 390px, and the corrected mobile screenshot shows the approved light Poppins hierarchy instead of a serif fallback.
- The home hero retains one direct sentence, supplied-photo motion, no watermark, no external video dependency, two direct actions, the floating scrolled navigation bar, conditional utility controls, breadcrumbs, and below-label blue rules.
- Latest local Lighthouse: mobile Performance 93, Accessibility 100, Best Practices 100, SEO 100, FCP 0.8s, LCP 1.9s, TBT 300ms, CLS 0. Desktop is 100 across all categories with CLS 0.

### Live release confirmation

The correction is live on `https://mendozer.com`, `https://mendozer.tangison.com`, and `https://mendozer-tangison-preview.vercel.app`.

- Browser checks at 320px, 390px, and 414px confirm Poppins resolves through the token layer, the one-sentence hero remains contained, supplied-photo motion reaches ready state 4, scroll-to-top appears after scrolling, and WhatsApp remains absent without an approved number.
- The full-screen menu opens, exposes working sector tabs, keeps the main content inert, and remains inside the viewport without horizontal overflow.
- The About breadcrumb returns `/` for Home, and the public `www` host retains its 308 redirect to `https://mendozer.com/`.
