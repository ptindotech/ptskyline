"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Collins-grade full-bleed video hero.
 *
 * - 100vh full-viewport background video, autoplay/muted/loop/playsinline.
 * - 0.3 opacity navy (#0B1E3D) overlay baked into the video and a CSS veil for text legibility.
 * - Huge Red Hat Display headline, generous negative space, single primary CTA.
 * - Serves 720p mobile variant on small screens via media attribute on <source>.
 * - No video controls. Honours prefers-reduced-motion by replacing video with the poster image.
 * - Subtle text-shadow on all hero copy for readability over any frame.
 */
export function HomeHero() {
  const { hero } = siteContent;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(mqMotion.matches);
    updateMotion();
    mqMotion.addEventListener("change", updateMotion);
    return () => {
      mqMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  const desktopSrc = "/videos/hero/desert-loop.mp4";
  const poster = "/videos/hero/desert-loop-poster.jpg";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div aria-hidden="true" className="hero__media">
        {reduceMotion ? (
          /* Reduced-motion users get the static poster; no autoplaying video. */
          <Image alt="Namibian desert landscape at dawn, dunes stretching to the horizon" className="hero__poster" fill priority sizes="100vw" src={poster} unoptimized />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            className="hero__video"
            loop
            muted
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={desktopSrc} type="video/mp4" />
          </video>
        )}
        <div aria-hidden="true" className="hero__veil" />
        <div aria-hidden="true" className="hero__grain" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{hero.eyebrow ?? "Mendozer Investments"}</p>
          <h1 id="hero-title" className="hero__title">
            {hero.title}
          </h1>
          <p className="hero__subtext">{hero.subtext ?? "Multi-sector solutions, built for Namibia."}</p>
          <div className="hero__actions">
            <Link className="hero__cta" href={hero.primaryCta.href}>
              <span>{hero.primaryCta.label}</span>
              <ArrowIcon />
            </Link>
            <Link className="hero__cta hero__cta--ghost" href={hero.secondaryCta.href}>
              <span>{hero.secondaryCta.label}</span>
              <ArrowIcon />
            </Link>
          </div>
          {hero.proofBadge ? (
            <p className="hero__proof">{hero.proofBadge}</p>
          ) : null}
        </div>
        <div aria-hidden="true" className="hero__meta">
          <span>One group</span>
          <span className="hero__meta-dot" />
          <span>Six directions</span>
          <span className="hero__meta-dot" />
          <span>Namibia</span>
        </div>
      </div>

      <div aria-hidden="true" className="hero__scroll">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
