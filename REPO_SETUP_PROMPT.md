# Repo Setup Prompt: Mendozer Investments

Paste this to your build agent (Claude Code / Codex / whichever harness) after attaching `mendozer-project-package.zip`.

---

Use Webman in ultra-think mode, per the standing Webman build prompt already in your instructions.

Create a fresh GitHub repository named `mendozer-investments`. Private visibility by default. Initialize on `main`. This is a real production build, not a demo, but deploys only to `mendozer.tangison.com` until I explicitly authorize connecting `mendozer.com`.

Unzip `mendozer-project-package.zip` into the repo root. Read `SYSTEM.md` first, then `BUILD_PLAN.md`, `brand-guidelines.md`, `design-tokens.md`, `site-architecture.md`, `ASSET_MANIFEST.md`, and `client-onboarding-form.md`, in that order. These files are the complete brief: do not re-plan, do not re-ask questions already answered in them.

Structure this repo so it can also serve as a reusable Tangison starter template for future corporate multi-sector client builds: keep the Mendozer-specific brand tokens, copy, and content cleanly separated from the structural/component layer (design tokens as CSS variables or a single config file, not hardcoded inline; sector-page template as a reusable component driven by data, not six hand-copied files). Document this separation in the README so a future project can fork the structure and swap the brand layer.

Build the full site per `site-architecture.md`: home, about, six sector pages, community/sponsorship, contact. Use the real project photography in `/reference/photography` where it fits a sector: sector tags there are unconfirmed best-guesses, so caption generically ("infrastructure work in progress") rather than naming a specific project. Do not use brand-gradient placeholder graphics as photography substitutes. Where a specific placement has no relevant supplied photo, generate one ultra-minimal real-photography-style contextual master through `tangison-imagegen`, grounded in the supplied Mendozer reference archive; log its prompt, file path, placement, caption, and reuse in `ASSET_MANIFEST.md`. Route every icon, divider, and decorative motif through reusable SVG output from `tangison-vectorgraphics`, not Tailwind/CSS or raster approximations. Use the exact supplied Mendozer logo files in `/assets/logos`, never regenerate them. Add the "Made by Tangison Studio" credit link in the footer using `/assets/logos/tangison/tangison-logo-white.svg`, linking to https://studio.tangison.com.

Route through Hallmark, Impeccable, and tangison-motion-master as foundation skills on every visual and motion decision, but defer to `design-tokens.md` as the locked design system: do not let a foundation skill reinvent the Mendozer palette or typography. Use the hero section spec below (or the equivalent one delivered separately) as the animation-quality bar for the homepage hero specifically.

Create PRODUCT.md, BRAND.md (fold in brand-guidelines.md + design-tokens.md), CONTENT_PLAN.md, and PROOF.md alongside implementation, not instead of it. Generate the README as a proper project README (setup, structure, how to swap brand layer for a future starter use, deployment notes) plus a short section explaining this is also usable as a Tangison starter template.

Work autonomously through the full build. Record every material action in PROOF.md. Stop only when the site is complete and passes the standard pre-release gate (type-check, lint, build, responsive checks, accessibility, Hallmark audit, Impeccable critique), or when a decision genuinely requires my authority. Push the verified commit and confirm local/remote SHA match before reporting done. Do not connect mendozer.com. Do not deploy past a Vercel preview / mendozer.tangison.com without my separate go-ahead.
