# Mendozer Investments: Design Tokens

Extracted from source logo files (logo-full.png, icon-mark.png). Colors sampled directly from pixel data. Typography identified by letterform analysis: flagged where it is a closest-match assessment rather than a confirmed font file.

---

## 1. Color Tokens

### Brand gradient (icon mark)
| Token | Hex | Usage |
|---|---|---|
| `--brand-gradient-start` | `#1CABF1` | top-left of icon mark |
| `--brand-gradient-end` | `#1E4FC7` | bottom-right of icon mark |
| `--brand-gradient` | `linear-gradient(135deg, #1CABF1 0%, #1E4FC7 100%)` | icon fill, hero accents |

### Wordmark colors
| Token | Hex | Usage |
|---|---|---|
| `--brand-navy` | `#1C4E89` | "MENDOZER" wordmark, primary text on light bg |
| `--brand-blue` | `#2FA1DB` | "INVESTMENTS" subtext, secondary accents |

### Light theme
| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | page background |
| `--bg-secondary` | `#F5F8FC` | section alternation |
| `--text-primary` | `#1C4E89` | headings |
| `--text-body` | `#2B2F36` | body copy (not sampled from logo: standard near-black for readability) |
| `--border-subtle` | `#E3EAF2` | dividers, card borders |
| `--accent` | `#2FA1DB` | links, small accents |

### Dark theme
| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#0B1E3D` | page background (deep navy, darker than brand-navy for contrast headroom) |
| `--bg-secondary` | `#122A52` | section alternation |
| `--text-primary` | `#FFFFFF` | headings |
| `--text-body` | `#C7D3E3` | body copy |
| `--border-subtle` | `#1E3B66` | dividers, card borders |
| `--accent` | `#2FA1DB` | links, small accents (unchanged: already reads on dark) |

Note: the icon gradient (`--brand-gradient`) is used unchanged in both themes: it already has enough contrast against both white and deep navy.

---

## 2. Typography

**Closest-match assessment** (not extracted from an embedded font file: based on letterform geometry: perfectly circular counters, single-story geometric letterforms, flat stroke terminals, wide even letter-spacing on the subword):

- **Primary candidate: Poppins** (ExtraBold/Bold for "MENDOZER", Medium/SemiBold + letter-spacing for "INVESTMENTS")
- Close alternatives if Poppins doesn't render identically: Montserrat, Century Gothic

This also lines up with Tangison Studio's existing Poppins-based document system, so recommend standardizing on **Poppins** across the Mendozer site for consistency and to avoid licensing a second geometric sans unnecessarily.

### Type scale (proposed, web)
| Token | Size | Weight | Usage |
|---|---|---|---|
| `--font-display` | 48–64px | Poppins ExtraBold (800) | hero headline |
| `--font-h1` | 36px | Poppins Bold (700) | page titles |
| `--font-h2` | 28px | Poppins Bold (700) | section titles |
| `--font-h3` | 20px | Poppins SemiBold (600) | card titles |
| `--font-body` | 16px | Poppins Regular (400) | body copy |
| `--font-small` | 14px | Poppins Regular (400) | captions, footer |
| `--font-label` | 13px | Poppins Medium (500), letter-spacing 0.08em, uppercase | eyebrow labels, nav |

Wordmark-specific (matching the logo itself):
- "MENDOZER": Poppins ExtraBold, uppercase, tight tracking (~0em)
- "INVESTMENTS": Poppins Medium, uppercase, wide tracking (~0.25em)

---

## 3. Logo Spacing & Usage

- **Clear space**: minimum clear space around the logo = height of the icon mark's "M" peak (approx. 1x icon height on all sides)
- **Minimum size**: icon mark alone should not render below 24px height (favicon-scale is the floor); full lockup should not render below 120px width
- **Icon-to-wordmark gap** (in full lockup): approx. 0.33x icon width, already baked into the traced SVG: don't manually adjust spacing when placing the pre-built lockup

### Do
- Use SVG source files for all placements needing scaling (favicon, print, hero)
- Use the dark-theme/mono-white variant on navy, photo, or dark backgrounds
- Use the light-theme/mono-navy variant on white or light backgrounds

### Don't
- Don't recolor the gradient icon to a flat single color except in the dedicated mono-white/mono-navy variants (for watermarks, single-color print, embossing)
- Don't stretch or skew the lockup: icon and wordmark proportions are fixed relative to each other
- Don't place the full-color lockup on busy photographic backgrounds: use mono-white instead

---

## 4. Spacing Scale (proposed, for site build)

4px base unit, standard geometric progression:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`

---

## 5. Files Delivered

| File | Purpose |
|---|---|
| `mendozer-icon.svg` | icon mark, gradient, light backgrounds |
| `mendozer-logo-full.svg` | full lockup, light theme (navy/blue text) |
| `mendozer-logo-dark-theme.svg` | full lockup, dark theme (white/blue text) |
| `mendozer-logo-mono-white.svg` | single-color white, for dark/photo backgrounds |
| `mendozer-logo-mono-navy.svg` | single-color navy, for watermarks/stamps |
| `/favicon` | favicon.ico + apple-touch-icon + PNG sizes |
| `/png`, `/webp` | raster exports at standard web sizes |

---

*This document is a starting reference. Once the full super-prompt/brand brief comes through, this should be expanded into the complete design system (component tokens, shadows, radii, motion, imagery treatment).*
