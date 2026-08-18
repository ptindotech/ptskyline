import type { GlyphName } from "@/content/site-content";

/**
 * Tangison vectorgraphics sector icon system. The external SVG master files live
 * in /assets/vectors and are served byte-for-byte from /public/assets/vectors.
 */
export function SectorGlyph({ name }: { name: GlyphName }) {
  return <span aria-hidden="true" className={`sector-glyph sector-glyph--${name}`} />;
}
