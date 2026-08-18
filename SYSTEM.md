# SYSTEM.md: Mendozer Investments

## Operating mode
Full production build. Not a demo. Static site (no database, no auth, no CMS: content is compiled at build time from CONTENT_PLAN.md and approved assets).

## Reading order
1. `SYSTEM.md` (this file)
2. `PRODUCT.md`
3. `BRAND.md` (= `brand-guidelines.md` + `design-tokens.md`)
4. `BUILD_PLAN.md`
5. `CONTENT_PLAN.md` (once populated by tangison-web-content)
6. `ASSET_MANIFEST.md`
7. `site-architecture.md`

## Exact deliverable
A large, high-production static corporate website for Mendozer Investments, covering the group homepage, About, six dedicated sector pages, a Community/Sponsorship page, and Contact: per `site-architecture.md`. Image-led design, minimal copy, bold typography carrying weight where images aren't present yet. Social sharing assets (Open Graph images, social banners) are part of this deliverable, not an afterthought.

## Domain / staging plan
- **Now (build + demo phase):** `mendozer.tangison.com`: subdomain of the Tangison demo infrastructure, safe to iterate on publicly without touching the client's real domain
- **At launch (explicit authorization required):** cut over to `mendozer.com`: production domain, DNS controlled separately, do not connect without direct authorization
- Contact form and any hardcoded email references: `contact@mendozer.com` (this stays the same across both phases: it's the real inbox, not a staging placeholder)
- Do not hardcode `mendozer.tangison.com` into anything that would break on cutover: use an environment variable or config value for the canonical domain, so launch is a config change, not a rebuild

## Identity and asset rules
- Use the exact supplied Mendozer logo files (`/svg`, `/png`, `/favicon`, `/webp`). Never regenerate the logo with an image model.
- Generated imagery (brand-gradient graphics, placeholder visuals) is allowed only until real photography arrives, and must be labelled as placeholder in `ASSET_MANIFEST.md`.
- Never present generated imagery as real projects, staff, or credentials.
- Colors, type, spacing: use `design-tokens.md` as the single source of truth. Do not invent new tokens ad hoc.

## Factual restrictions
- Sector list unresolved (4 vs 6). Proceeding with the 6-sector banner version as the working assumption since it's more complete: flagged as `[PLACEHOLDER: confirm sector list]`.
- No testimonials, named clients, certifications, or metrics exist. Do not invent. Leave those blocks out entirely rather than filling with placeholder text: an absent section is honest, a fake stat is not.
- Reg No. CC/2009/2399, VAT 04948459-015 are verified: safe to publish.

## Placeholder content policy (active: client is not supplying content on this timeline)
Building autonomously now rather than waiting on client input. Every placeholder must be:
- Visually complete (real layout, real spacing, real image treatment: not a grey box)
- Textually marked in source comments as `{/* PLACEHOLDER: replace with client copy */}` so a future pass can find and swap it
- Never a fabricated fact (no invented testimonials, prices, certifications, named projects): service descriptions can be reasonable/generic since they're descriptive, not factual claims about Mendozer specifically
- Documented in `ASSET_MANIFEST.md` as placeholder, not real

This is a demo/working build, not final production copy. Do not deploy to the live mendozer.com domain without a review pass once real content exists.

## Skill routing (Webman pipeline)
| Phase | Skill | Status |
|---|---|---|
| Discovery & architecture | `tangison-web-plan` | Done: see `BUILD_PLAN.md`, `site-architecture.md` |
| Brand strategy | `branding` (marketing-skills) | Done: see `brand-guidelines.md` |
| Visual identity / tokens | `brand-visual-generator` equivalent (done manually) | Done: see `design-tokens.md` |
| Logo vectorization | manual (potrace, verified against source) | Done: see `/svg` |
| Content research + copywriting | `tangison-web-content` → `tangison-copywriting-master` | Pending client onboarding form return |
| Decorative/vector graphics (dividers, icons) | `tangison-vectorgraphics` | Pending: needed once section design starts |
| Implementation | `tangison-web-build` | Not started: blocked on content |
| QA / audit | `tangison-web-audit` | Not started |
| Deployment | `tangison-web-deploy` | Not started: target: mendozer.com |
| Handoff packaging | `tangison-project-launchpad` | This package is the starter pack |

## Foundation skills (Hallmark, Taste, Impeccable, motion)
Mendozer already has a locked brand identity (`design-tokens.md`): colors, typography, spacing are not open for these skills to reinvent. Hallmark/Taste/Impeccable govern structural variety, layout rhythm, motion quality, and anti-slop discipline, but must read and defer to `design-tokens.md` as the project's `design.md`-equivalent locked system. Do not let a foundation skill substitute its own palette or type pairing over the verified Mendozer tokens.

## Motion direction
Reference example supplied for animation quality/pattern (staggered fade-up on load, clip-reveal headline words, custom easing): this is a pattern reference for *how* animation should feel, not literal content to reuse (that example's purple accent, video hero, and copy belong to a different brand). Apply the same discipline to Mendozer: staggered entrance animation on hero elements, restrained scroll motion elsewhere, full reduced-motion fallback. One primary motion engine, per `tangison-motion-master` and Ponytail discipline in the build prompt.

## Deployment authorization amendment
Direct authorization has now been received to connect and deploy `mendozer.com` as the production canonical hostname. Retain `mendozer.tangison.com` for staging. Do not make unrelated DNS changes or remove the staging host.

## Verification and release gate
Before this project is considered ready for `tangison-web-build`:
- [ ] Sector list confirmed
- [ ] Onboarding form returned (or partial, with gaps explicitly marked)
- [ ] Positioning/values/voice in `brand-guidelines.md` approved by Johannes
- [ ] Domain (mendozer.com) confirmed registered and accessible
