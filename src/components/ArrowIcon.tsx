/**
 * Tangison vectorgraphics asset. CSS uses the SVG as a mask so each usage inherits
 * its contextual, token-driven color without redrawing the arrow in component code.
 */
export function ArrowIcon({ direction = "right" }: { direction?: "right" | "down" }) {
  return <span aria-hidden="true" className={`icon-arrow icon-arrow--${direction}`} />;
}
