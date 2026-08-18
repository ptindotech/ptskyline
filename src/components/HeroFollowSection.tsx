"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteContent } from "@/content/site-content";

/**
 * Second section: 2-column layout that "pushes" 20% up into the hero.
 *
 * - Right column renders the same hero loop in a 60%-width rounded 16px card with drop-shadow.
 * - Card translates -20% vertically to overlap the hero section above.
 * - Mobile: columns stack, video becomes full-width, no overlap.
 * - Honours prefers-reduced-motion.
 */
export function HeroFollowSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const updateMotion = () => setReduceMotion(mqMotion.matches);
    const updateMobile = () => setIsMobile(mqMobile.matches);
    updateMotion();
    updateMobile();
    mqMotion.addEventListener("change", updateMotion);
    mqMobile.addEventListener("change", updateMobile);
    return () => {
      mqMotion.removeEventListener("change", updateMotion);
      mqMobile.removeEventListener("change", updateMobile);
    };
  }, []);

  const { hero } = siteContent;
  const poster = "/images/projects/construction/mendozer-home-hero.webp";
  const desktopSrc = "/media/mendozer-hero-motion.mp4";
  const desktopWebm = "/media/mendozer-hero-motion.webm";
  const mobileSrc = "/media/mendozer-hero-motion-mobile.mp4";
  const mobileWebm = "/media/mendozer-hero-motion-mobile.webm";

  return (
    <section className="hero-follow" aria-labelledby="hero-follow-title">
      <div className="site-container hero-follow__grid">
        <div className="hero-follow__copy">
          <p className="eyebrow">{hero.followEyebrow ?? "The Mendozer group"}</p>
          <h2 id="hero-follow-title" className="hero-follow__title">
            {hero.followTitle ?? "One accountable group across six working directions."}
          </h2>
          <p className="hero-follow__body">
            {hero.followBody ??
              "Construction, technology, cooling, logistics, energy and tourism are connected by one operational backbone. Start with the sector closest to the work in front of you, and bring the group in when the brief crosses disciplines."}
          </p>
          <div className="hero-follow__actions">
            <Link className="text-link" href="/about">
              <span>Read the group context</span>
              <ArrowIcon />
            </Link>
            <Link className="text-link" href="/sectors">
              <span>See the six directions</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="hero-follow__media">
          <figure className="hero-follow__figure">
            {reduceMotion ? (
              <Image alt="Mendozer Investments site context" className="hero-follow__poster" fill sizes="(max-width: 900px) 100vw, 60vw" src={poster} unoptimized />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                className="hero-follow__video"
                loop
                muted
                playsInline
                poster={poster}
                preload="metadata"
              >
                <source media="(max-width: 768px)" src={isMobile ? mobileWebm : desktopWebm} type="video/webm" />
                <source media="(max-width: 768px)" src={isMobile ? mobileSrc : desktopSrc} type="video/mp4" />
                <source src={desktopWebm} type="video/webm" />
                <source src={desktopSrc} type="video/mp4" />
              </video>
            )}
            <figcaption>{hero.media.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
