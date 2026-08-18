# BRAND.md: Mendozer Investments Brand Layer

This document folds the implementation-relevant direction from `brand-guidelines.md` and `design-tokens.md` into one build reference. The supplied identity and locked design tokens take precedence over generic foundation-skill preferences.

## Brand stance

### Proposed strategic direction: pending client confirmation

- **Purpose:** dependable, multi-sector infrastructure and operational solutions across Namibia.
- **Positioning:** one accountable group spanning Construction & Infrastructure, Technology & Systems, Cooling & Cold Chain, Logistics & Support Services, Fuel & Energy Distribution, and Tourism & Agriculture.
- **Archetype:** Ruler with a Sage undertone: authoritative, structured, credible, not flashy.
- **Audience:** investors/business partners; institutional/commercial clients; community stakeholders.
- **Voice:** confident, direct, credible, and plain-spoken. Prefer “built for Namibia,” “multi-sector,” “delivered,” and “accountable.” Avoid inflated language such as “world-class,” “cutting-edge,” “synergy,” or “revolutionize.”

The six-sector list remains a working assumption pending client confirmation. No strategy copy in the site is treated as proof of a client-specific claim.

## Locked visual system

### Color tokens

| CSS token | Value | Use |
|---|---:|---|
| `--color-brand-gradient-start` | `#1CABF1` | Gradient top-left / bright signal |
| `--color-brand-gradient-end` | `#1E4FC7` | Gradient bottom-right / depth |
| `--brand-gradient` | `linear-gradient(135deg, #1CABF1 0%, #1E4FC7 100%)` | Controlled CTA and abstract brand accent |
| `--color-brand-navy` | `#1C4E89` | Primary light-theme heading / wordmark navy |
| `--color-brand-blue` | `#2FA1DB` | Secondary wordmark / small accent / links |
| `--color-bg-primary` | `#FFFFFF` | Light page background |
| `--color-bg-secondary` | `#F5F8FC` | Alternating light surface |
| `--color-text-body` | `#2B2F36` | Body copy |
| `--color-border-subtle` | `#E3EAF2` | Light dividers / card boundaries |
| `--color-bg-dark-primary` | `#0B1E3D` | Deep navy hero/footer surface |
| `--color-bg-dark-secondary` | `#122A52` | Alternate deep surface |
| `--color-text-dark-primary` | `#FFFFFF` | Dark-surface headings |
| `--color-text-dark-body` | `#C7D3E3` | Dark-surface body copy |
| `--color-border-dark-subtle` | `#1E3B66` | Dark dividers |

No component hardcodes a replacement brand palette. All component colors resolve through `src/brand/tokens.css`.

### Typography

- **Family:** Poppins, with Avenir Next / Century Gothic / Arial as fallbacks.
- **Display:** Regular / 400, large and compactly tracked.
- **Headings:** Medium / 500.
- **Card labels:** SemiBold / 600.
- **Body:** Regular / 400.
- **Eyebrows/navigation:** SemiBold / 600, uppercase, open tracking.

The web build tracks the required Poppins 400, 500, and 600 WOFF2 files under `src/fonts/` and preloads them through `next/font/local`. No third-party font request is required at runtime. The approximate source scale is preserved: hero 48–64px+, H1 36px+, H2 28px+, H3 20px, body 16px, caption/footer 14px, label 13px.

### Editorial refinement: 2026-08-12

The approved interface continues to use Poppins because it is the verified closest-match family in the brand source and the supplied wordmark must not be reverse engineered or redrawn. The live implementation now uses only 400, 500, and 600 weights: 400 for the large display system, 500 for headings and navigation, and 600 for compact labels and actions. This gives the site a lighter, calmer typographic voice without changing the protected identity.

### Spacing and shape

The verified 4px scale is retained as CSS variables: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.

Structural additions in `tokens.css` (`--container-max`, restrained square control radii, and motion timing) are implementation-only extensions. They do not introduce an alternate palette or type pairing. Geometry remains restrained: simple panels, fine borders, wide media, compact rectangular actions, and no decorative glow.

## Logo usage

### Primary lockups (production)

The production logo set lives in `assets/logos/` (source) and `public/assets/logos/` (served). These are the **only** logos used by the live site:

| File | Variant | Usage |
|---|---|---|
| `mendozer-logo-full.svg` | Full lockup, light theme (navy/blue text on white) | Header on light surfaces, quiet light backgrounds |
| `mendozer-logo-dark-theme.svg` | Full lockup, dark theme (white/blue text on navy) | Header over dark hero, footer, dark panels |
| `mendozer-logo-mono-white.svg` | Single-color white | Watermarks, dark photo overlays, print |
| `mendozer-logo-mono-navy.svg` | Single-color navy | Stamps, light print, embossing |
| `mendozer-icon.svg` | Icon mark only, gradient | Favicon, app icon, standalone mark |
| `mendozer-icon-*.png` | Icon in multiple sizes (16-1024px) | Favicon set, social, PWA |
| `tangison/tangison-logo-white.svg` | Tangison credit, white | Footer "Made by" credit only |

### Logo rules

- Use supplied SVG lockups as delivered; do not redraw, recolor, stretch, skew, or separate their internal icon/wordmark spacing.
- Minimum full-lockup width: 120px. Minimum icon height: 24px.
- Use `mendozer-logo-full.svg` on quiet light surfaces and `mendozer-logo-dark-theme.svg` on navy/dark surfaces.
- Do not place the full-color lockup over busy photography. The site uses it only in quiet header/footer fields and social layout panels.
- Tangison's supplied white logo is used only in the required footer credit link.
- The icon mark gradient (`#1CABF1` to `#1E4FC7`) is never flattened to a single color except in the mono-white and mono-navy variants.

### Alternate logo set (2026-08, archived, not in production)

An alternate set of 8 SVG variants was supplied on 2026-08-13 and archived in `reference/logos/new-set-2026-08/`. These use a different gradient (`#00c0ff` to `#4218b8`, more purple than the locked brand) and are **not** used by the live site. They are retained for reference only. If the client confirms a brand refresh to the new gradient, the swap requires updating `src/brand/tokens.css` colour values, replacing `public/assets/logos/` files, regenerating OG images, and re-running the full QA gate.

### Hero video logo treatment

The homepage hero video has a 0.3 opacity navy (`#0B1E3D`) overlay baked into the video file plus a CSS gradient veil. The header logo switches to `mendozer-logo-dark-theme.svg` (white text) over the hero via the `site-header--over-dark` class. No logo is placed over the video itself; the video is background texture only.

## Imagery and vector policy

- Use client-supplied photography where it visually fits the individual placement.
- All sector assignments are **unconfirmed visual matches**. Captions therefore say “Infrastructure work in progress” or another generic observational phrase, never a named project.
- Event imagery is restricted to Community & Sponsorship.
- A missing specific photograph uses a recorded `tangison-imagegen` real-photography-style master only after the supplied archive and existing generated masters have been assessed.
- Generated frames are ultra-minimal: one, two, or three deliberate elements, generous negative space, no staged corporate stock composition, no generated logos, no fake text, and no generic regional trope.
- Generated imagery is grounded in the supplied Mendozer archive and clearly captioned as contextual visual support when it could be confused with documentary coverage. It never represents a real named project, staff member, credential, or event.
- Brand-gradient graphics are not used as photo stand-ins.
- `tangison-vectorgraphics` supplies real reusable SVG assets for sector icons, arrows, dividers, connection maps, and decorative motifs. CSS is limited to layout, state, and motion rather than imitating those assets.

## Motion system

The implementation follows a single motion language rather than applying effects per component:

1. **Hero:** staggered entrance, clip-revealed display words, custom expressive ease.
2. **Scroll content:** one `IntersectionObserver` controller reveals marked elements once, with small directional offsets.
3. **Interaction:** cards and CTAs use only a slight lift / image scale; no looping novelty animation.
4. **Accessibility:** `prefers-reduced-motion: reduce` disables animation and leaves all content immediately visible.

This meets the requested animation-quality bar while remaining restrained and production-appropriate for the Ruler/Sage brand stance.

## Hallmark / Impeccable application

- **Hallmark:** strong page-level hierarchy, every page has a distinct composition, media drives rhythm rather than a repetitive card grid, and the sector template varies image placement without duplicating structure.
- **Impeccable:** no fake proof blocks, no stock corporate-suit imagery, no over-rounded “SaaS” UI language, no loud gradients behind every section, and no unsupported performance claims.
- **Deference rule:** these quality lenses shape structure, editorial restraint, and motion only. `design-tokens.md` remains the sole authority for Mendozer color and type.
