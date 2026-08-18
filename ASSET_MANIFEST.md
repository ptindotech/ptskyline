# ASSET_MANIFEST.md: Mendozer Investments

## Intake record

- **2026-08-09:** Downloaded `https://filebin.net/archive/1w100ld2symajk2w/zip` before implementation began and expanded its contents.
- The Filebin archive contained **52 files total**: `mendozer-project-package.zip`, `mendozer-logo-assets.zip`, and **50 `IMG-20260808-WA*.jpg` files**. The supplied request describes 52 photographs; two additional image files were not present in the archive at intake. This is logged for follow-up but does not block the build using the supplied set.
- All 50 supplied `IMG-*` files are retained in `/reference/photography/`, exactly as delivered. Selected presentation copies are in `/public/images/projects/`; source originals remain untouched in `/reference/photography/`.
- Every sector assignment below is an **unconfirmed visual best-guess**. Do not use a filename or this inferred category as a public project name. On site, captions remain generic (for example, “Infrastructure work in progress”).

## Active asset policy: 2026-08-09 amendment

This amendment supersedes every prior instruction that permitted a brand-gradient graphic to stand in for missing photography.

1. **Supplied photography comes first.** Use the real Mendozer-context archive when it fits the individual page placement.
2. **Generated photography is the only missing-photo fallback.** If no relevant supplied or approved reusable generated master exists, commission one real-photography-style master through `tangison-imagegen`.
3. **Ultra-minimalism is mandatory.** A generated frame may contain only one, two, or three deliberate elements, with generous negative space. It must avoid staged corporate-stock scenes, crowded compositions, fake branding, fake text, and generic regional tropes.
4. **Mendozer context is mandatory.** Prompts are grounded in the actual supplied archive: telecom tower rigging, road construction, steel structural work, plant piping, crew/site visits, and relevant Namibian desert, Windhoek, or coastal industrial conditions. Generated output is contextual visual support, never evidence of a named project.
5. **Complete ledger required.** Every generated master records its exact prompt, source file path, target pages/placements, caption, alt text, and reuse in the generated-asset ledger below.
6. **Vector route required.** Icons, dividers, arrows, connection maps, and decorative motifs are packaged as reusable SVG outputs through `tangison-vectorgraphics`. CSS/Tailwind handles layout and motion, not imitations of vector artwork.
7. **No logo generation.** The official supplied Mendozer logo is never regenerated or inserted by an image model.

## Logos

| Asset | Source | Status | Use |
|---|---|---|---|
| `/assets/logos/mendozer-*.svg` | Client-supplied Filebin logo pack | Verified: exact supplied files | Primary brand mark, all placements |
| `/public/assets/logos/mendozer-*.svg` | Byte-for-byte delivery copies of `/assets/logos` | Verified by SHA-256 equality check | Browser-served logo assets |
| `/assets/favicon/*` and `/public/assets/favicon/*` | Client-supplied Filebin logo pack | Verified | Browser tab, app icon, manifest |
| `/assets/logos/tangison/tangison-logo-white.svg` | Client-supplied package | Verified | “Made by Tangison Studio” footer credit |

**Logo rule:** no Mendozer logo has been regenerated or redrawn for this build. The public copies were copied unchanged from the delivered source assets.

## Local typography assets

| Asset | Source and status | Use |
|---|---|---|
| `/src/fonts/poppins-latin-400-normal.woff2` | Local tracked Poppins 400 file, copied from the prior `@fontsource/poppins` package source before the package was removed from runtime dependencies | Hero display and body typography |
| `/src/fonts/poppins-latin-500-normal.woff2` | Local tracked Poppins 500 file | Headings and navigation |
| `/src/fonts/poppins-latin-600-normal.woff2` | Local tracked Poppins 600 file | Labels and controls |

`next/font/local` preloads these local files from `src/app/layout.tsx`. This removes the package runtime dependency and reduces font-driven layout shift without changing the approved family.

## Existing pre-sorted real project photography

| Folder | Files | Likely sector | Status |
|---|---|---|---|
| `/reference/photography/technology/` | `tower-full-view`, `tower-antenna-detail-1/2` | Technology & Systems | Real, unconfirmed sector tag |
| `/reference/photography/construction/` | `road-works-1/2`, `site-visit-1`, `steel-structure-detail` | Construction & Infrastructure | Real, unconfirmed sector tag |
| `/reference/photography/fuel-energy/` | `plant-piping` | Fuel & Energy Distribution | Real, unconfirmed sector tag |
| `/reference/photography/logistics/` | `crew-roadside`, `site-container-yard`, `founder-site-visit` | Logistics & Support Services | Real, unconfirmed sector tag |

## Filebin batch: visual-match classification (unconfirmed)

### Construction & Infrastructure: visual best-guess

`IMG-20260808-WA0032.jpg`, `IMG-20260808-WA0033.jpg`, `IMG-20260808-WA0034.jpg`, `IMG-20260808-WA0035.jpg`, `IMG-20260808-WA0036.jpg`, `IMG-20260808-WA0037.jpg`, `IMG-20260808-WA0038.jpg`, `IMG-20260808-WA0039.jpg`, `IMG-20260808-WA0040.jpg`, `IMG-20260808-WA0041.jpg`, `IMG-20260808-WA0042.jpg`, `IMG-20260808-WA0052.jpg`, `IMG-20260808-WA0053.jpg`, `IMG-20260808-WA0062.jpg`, `IMG-20260808-WA0068.jpg`.

**Rationale:** visible building shells, road workfronts, field/site visits, structural connections, or boundary/structural works. Some include people/selfies and are retained as source context rather than selected hero imagery.

### Technology & Systems: visual best-guess

`IMG-20260808-WA0056.jpg`, `IMG-20260808-WA0058.jpg`, `IMG-20260808-WA0060.jpg`, `IMG-20260808-WA0061.jpg`, `IMG-20260808-WA0063.jpg`, `IMG-20260808-WA0064.jpg`, `IMG-20260808-WA0065.jpg`.

**Rationale:** telecom tower structures, aerials, solar/tower safety markers, and tower-base detail.

### Cooling & Cold Chain: visual best-guess

`IMG-20260808-WA0044.jpg`, `IMG-20260808-WA0046.jpg`, `IMG-20260808-WA0047.jpg`, `IMG-20260808-WA0050.jpg`.

**Rationale:** site team and service-piping context around a facility. The facility’s exact use is not confirmed; no public caption identifies it as a cold room or named location.

### Logistics & Support Services: visual best-guess

`IMG-20260808-WA0031.jpg`, `IMG-20260808-WA0043.jpg`, `IMG-20260808-WA0048.jpg`, `IMG-20260808-WA0049.jpg`.

**Rationale:** crew movement, vehicles, containers, and site-support context. `WA0031` is a handset screenshot and is retained only as archive material, not used in the published site.

### Fuel & Energy Distribution: visual best-guess

`IMG-20260808-WA0045.jpg`.

**Rationale:** industrial storage/facility context. This tag is deliberately cautious; the published energy page uses the pre-sorted `plant-piping.jpg` as its primary image because it is the stronger supplied fit.

### Tourism & Agriculture: visual best-guess

`IMG-20260808-WA0055.jpg`, `IMG-20260808-WA0066.jpg`, `IMG-20260808-WA0067.jpg`, `IMG-20260808-WA0069.jpg`, `IMG-20260808-WA0070.jpg`, `IMG-20260808-WA0071.jpg`.

**Rationale:** landscape, rural access, outdoor equipment, and irrigation/pipe-context imagery. These are presented only as generic landscape or infrastructure context pending confirmation.

### Community / sponsorship: visual best-guess

`IMG-20260808-WA0076.jpg`, `IMG-20260808-WA0077.jpg`, `IMG-20260808-WA0078.jpg`.

**Rationale:** supplied event/backdrop photography visibly shows Mendozer sponsorship presence. Used only for the Community & Sponsorship page.

### Operations / no confident sector match: archive only

`IMG-20260808-WA0024.jpg`, `IMG-20260808-WA0025.jpg`, `IMG-20260808-WA0026.jpg`, `IMG-20260808-WA0027.jpg`, `IMG-20260808-WA0028.jpg`, `IMG-20260808-WA0029.jpg`, `IMG-20260808-WA0030.jpg`.

**Rationale:** green drum/equipment assembly and informal outdoor work context, with no reliable enough sector signal. These are intentionally not used in page-facing content until confirmed.

### Brand/reference material: not used as project photography

`IMG-20260808-WA0072.jpg`, `IMG-20260808-WA0074.jpg`, `IMG-20260808-WA0075.jpg`.

**Rationale:** visible brand/roll-up/business-card-style reference material. Per the brief, banners and business cards are reference only and are not republished as final project imagery.

## Event/sponsorship records

| Asset / record | Status | Use |
|---|---|---|
| Miss Teen Namibia 2026 event-backdrop photos (`WA0076–WA0078`) | Real, client-supplied | Community/Sponsorship page; describes sponsorship visibility, not event organisation |
| Otjiwarongo Sports Bonanza | Listed in original client-supplied manifest as a sponsor acknowledgement | No supplied usable event photo located in the intake batch; `/public/images/generated/community-otjiwarongo-sport-context.png` is an explicitly labelled generated local-sport context visual, not event documentation |

## Curated public page photography

| Public directory | Purpose | Status |
|---|---|---|
| `/public/images/projects/construction/` | Home and Construction page | Real supplied photos; generic captions only. `mendozer-home-hero.webp` is a WebP derivative of supplied `IMG-20260808-WA0033.jpg` for first-view hero delivery, not generated imagery. |
| `/public/images/projects/technology/` | Home and Technology page | Real supplied photos; generic captions only |
| `/public/images/projects/cooling/` | Cooling page | Real supplied photos; generic captions only |
| `/public/images/projects/logistics/` | About and Logistics page | Real supplied photos; generic captions only |
| `/public/images/projects/fuel-energy/`, `/energy/` | Energy page | Real supplied photos; generic captions only |
| `/public/images/projects/tourism/` | Tourism & Agriculture page | Real supplied photos; generic captions only |
| `/public/images/projects/community/` | Community/Sponsorship and Updates pages | Real supplied event images; no organiser claim |
| `/public/images/projects/work/` | Work Context page | Real supplied construction, field-systems, and logistics-support context; no named project claim |
| `/public/images/generated/community-otjiwarongo-sport-context.png` | Otjiwarongo Sports Bonanza sponsorship card and Updates archive item | `GEN-001` tangison-imagegen contextual visual; explicit non-documentary caption and complete ledger below |

## Retired placeholder assets: removed by the amendment

| Retired asset | Previous purpose | Replacement / result |
|---|---|---|
| `/public/images/placeholders/community-sport-gradient.svg` | Abstract fill for the Otjiwarongo Sports Bonanza card | Removed. Replaced by `GEN-001`, a labelled tangison-imagegen local-sport context master. |
| CSS `BrandArtwork` contact visual | Abstract contact-page background | Removed. Contact now reuses supplied real group-context photography (`IMG-20260808-WA0061.jpg`). |

## Generated-asset ledger

### GEN-001: Otjiwarongo local-sport context master

| Field | Record |
|---|---|
| File path | `/public/images/generated/community-otjiwarongo-sport-context.png` |
| Created through | `tangison-imagegen` route, using the available image-generation service |
| Relevant source grounding | `/reference/photography/IMG-20260808-WA0055.jpg`, `IMG-20260808-WA0067.jpg`, and `IMG-20260808-WA0076.jpg` supplied as visual references for Namibian light, semi-arid terrain, and restrained community-event context. |
| Purpose | A quiet, non-documentary local-sport context image for the Otjiwarongo Sports Bonanza sponsorship card because no usable supplied event photograph exists for that placement. |
| Page and placement | `/community`, Otjiwarongo Sports Bonanza sponsorship card; `/updates`, Otjiwarongo Sports Bonanza archive item. It is one reused contextual master, not multiple similar generated images. |
| Visible status / caption | `Generated local-sport context, not event documentation` |
| Alt text | `An empty local sport ground with a weathered football goal and low pavilion` |
| Authenticity guard | No Mendozer logo, text, signage, people, crowd, vehicle, or claim of actual event coverage appears in the generated frame. |

**Exact prompt used**

> Create a restrained, photorealistic editorial photograph for the Mendozer Investments Community page. Ground the atmosphere in the attached Mendozer reference photography: truthful Namibian light, semi-arid earth tones, practical regional built context, and unembellished documentary realism. Show a quiet local sports ground at late afternoon with exactly two deliberate elements: one weathered metal football goal and one low, empty pavilion edge in the far distance. Wide landscape composition, generous open dusty field and sky, no people, no vehicles, no crowd, no staged corporate scene, no text, no signage, no logos, no watermarks, no flags, no graphic overlays. It must be clearly a generic generated local-sport context image, not a documentary photograph of Otjiwarongo Sports Bonanza. Avoid generic African stock-photo clichés. Natural color, modest contrast, authentic camera perspective.

## Vector asset ledger

All entries below are real, reusable SVG outputs in both `/assets/vectors/` (source) and `/public/assets/vectors/` (byte-identical served copies). They are the tangison-vectorgraphics route for all interface iconography, dividers, and non-photographic motifs.

| Vector asset | Required use | Current implementation |
|---|---|---|
| `sector-structure.svg`, `sector-signal.svg`, `sector-cooling.svg`, `sector-route.svg`, `sector-energy.svg`, `sector-landscape.svg` | Six sector cards, sector intro/service areas, connected group map | External SVG masks used by `SectorGlyph`; no inline SVG icon geometry remains in React. |
| `arrow-right.svg` | CTA and text-link affordance | External SVG mask used by `ArrowIcon`. |
| `accordion-plus.svg` | Homepage enquiry FAQ disclosure control | External SVG mask used by the native details accordion. |
| `menu-two-line.svg`, `close-two-line.svg` | Floating navigation and off-canvas menu controls | External SVG masks used by the accessible floating navigation control. |
| `connected-network.svg` | Connected group map | Real SVG graphic rendered behind the six dynamically labelled sector nodes. |
| `section-orbit.svg` | Connected group section and sector cross-over accent | Real SVG motif replaces CSS-drawn rings. |
| `cta-accent.svg` | CTA and leadership decorative accent | Real SVG motif replaces CSS gradient/cutout shapes. |
| `eyebrow-rule-navy.svg`, `eyebrow-rule-blue.svg`, `vertical-rule.svg` | Eyebrow and vertical divider accents | Real SVG divider assets replace CSS line approximations. |

## Social sharing assets

| Assets | Source | Status |
|---|---|---|
| `/public/og/home.png`, `/about.png`, `/construction.png`, `/technology.png`, `/cooling.png`, `/logistics.png`, `/energy.png`, `/tourism.png`, `/community.png`, `/contact.png` | Deterministic composites created by `scripts/generate-og.py` from delivered logos, selected client photography, and locked brand colors | Layout-derived social assets; not generated project imagery |

## Explicitly not used

- Business card, roll-up banner, and step-and-repeat/banner reference images as final project imagery
- Any generated or placeholder graphic as a claimed project, employee, credential, or event photograph
- Brand-gradient placeholder graphics as substitutes for a missing photograph
- Named projects, named clients, testimonials, certifications, or metrics not verified in the brief

## Supplied-photo motion derivative

### MOT-001: Home hero motion loop

| Field | Record |
|---|---|
| Source image | `/public/images/projects/construction/mendozer-home-hero.webp`, a WebP derivative of supplied `IMG-20260808-WA0033.jpg` |
| Browser files | `/public/media/mendozer-hero-motion.webm` and `/public/media/mendozer-hero-motion.mp4` |
| Purpose | A quiet home-hero motion layer created from supplied Mendozer construction context. It replaces the request for an unverified third-party video and keeps image rights within the supplied archive. |
| Motion treatment | Ten-second, muted, looping slow push with minimal horizontal drift. The video contains no generated imagery, audio, added people, added objects, logo, text, or project claim. |
| Size and performance | WebM: 157 KB. MP4 fallback: 286 KB. The home page uses the existing 72 KB WebP as the poster and keeps motion available on compact layouts. `prefers-reduced-motion` hides video and preserves the poster. |
| Page and placement | `/`, full-bleed home hero background only |
| Visible caption | `Building work in progress` |
| Alt treatment | Decorative background motion. The visible hero content is conveyed in text, and the poster has no duplicated alternate text. |
| Authenticity guard | This is a supplied-photo derivative, not a documentary video of a named project and not an AI-generated visual. |
