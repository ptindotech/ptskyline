"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { sectors } from "@/content/site-content";

type SectorExplorerProps = {
  idPrefix: string;
  label?: string;
};

export function SectorExplorer({ idPrefix, label = "Mendozer working directions" }: SectorExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSector = sectors[activeIndex];

  function selectSector(index: number) {
    setActiveIndex(index);
  }

  function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = currentIndex;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (currentIndex + 1) % sectors.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + sectors.length) % sectors.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = sectors.length - 1;

    setActiveIndex(nextIndex);
    window.requestAnimationFrame(() => document.getElementById(`${idPrefix}-tab-${nextIndex}`)?.focus());
  }

  return (
    <div className="sector-explorer">
      <div className="sector-explorer__desktop">
        <div aria-label={label} className="sector-explorer__tabs" role="tablist">
          {sectors.map((sector, index) => (
            <button
              aria-controls={`${idPrefix}-panel`}
              aria-selected={index === activeIndex}
              id={`${idPrefix}-tab-${index}`}
              key={sector.slug}
              onClick={() => selectSector(index)}
              onKeyDown={(event) => handleTabKeys(event, index)}
              role="tab"
              tabIndex={index === activeIndex ? 0 : -1}
              type="button"
            >
              <span>{sector.number}</span>
              <span>{sector.title}</span>
              <span aria-hidden="true">+</span>
            </button>
          ))}
        </div>
        <div aria-labelledby={`${idPrefix}-tab-${activeIndex}`} className="sector-explorer__panel" id={`${idPrefix}-panel`} role="tabpanel">
          <figure className="sector-explorer__media">
            <Image alt={activeSector.hero.alt} fill sizes="(max-width: 900px) 100vw, 48vw" src={activeSector.hero.src} style={{ objectPosition: activeSector.hero.focus }} />
            <figcaption>{activeSector.hero.caption}</figcaption>
          </figure>
          <div className="sector-explorer__detail">
            <p className="eyebrow">{activeSector.eyebrow}</p>
            <h3>{activeSector.title}</h3>
            <p>{activeSector.description}</p>
            <Link className="text-link" href={`/sectors/${activeSector.slug}`}>Explore this direction <ArrowIcon /></Link>
          </div>
        </div>
      </div>

      <div className="sector-explorer__mobile">
        {sectors.map((sector) => (
          <details className="sector-explorer__accordion" key={sector.slug}>
            <summary>
              <span>{sector.number}</span>
              <span>{sector.title}</span>
              <span aria-hidden="true" className="sector-explorer__accordion-marker" />
            </summary>
            <div>
              <figure>
                <Image alt={sector.hero.alt} fill sizes="100vw" src={sector.hero.src} style={{ objectPosition: sector.hero.focus }} />
                <figcaption>{sector.hero.caption}</figcaption>
              </figure>
              <p>{sector.description}</p>
              <Link className="text-link" href={`/sectors/${sector.slug}`}>Explore this direction <ArrowIcon /></Link>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
