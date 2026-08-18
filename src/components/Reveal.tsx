import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
};

/**
 * Server-rendered motion hook. MotionController is the single browser-side engine
 * that observes these markers, preserving a visible no-JS baseline.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  style,
  ...props
}: RevealProps) {
  return (
    <div
      className={className}
      data-reveal={variant}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
