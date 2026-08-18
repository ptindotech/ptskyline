"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/brand/assets";
import { siteConfig } from "@/brand/site-config";
import { sectors, siteContent } from "@/content/site-content";

type SiteSettingsResponse = {
  settings: {
    logo?: string;
    navigation?: Array<{ label: string; href: string }>;
  };
};

type MenuTab = "group" | "sectors" | "contact";

const menuTabs: readonly { id: MenuTab; label: string }[] = [
  { id: "group", label: "Group" },
  { id: "sectors", label: "Sectors" },
  { id: "contact", label: "Contact" },
];

const defaultPrimaryLinks = [
  { label: "Home", href: "/" },
  ...siteContent.navigation,
  { label: "Contact", href: "/contact" },
] as const;

function usesDarkHero(pathname: string) {
  return pathname === "/" || pathname === "/about" || pathname === "/sectors" || pathname.startsWith("/sectors/") || pathname === "/work" || pathname === "/updates" || pathname === "/compliance" || pathname === "/community" || pathname === "/contact";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>("group");
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [customNavigation, setCustomNavigation] = useState<Array<{ label: string; href: string }>>([]);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSiteSettings() {
      try {
        const response = await fetch("/api/site-settings", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as SiteSettingsResponse;
        if (!active) return;
        if (data.settings?.logo) setCustomLogo(data.settings.logo);
        if (data.settings?.navigation && data.settings.navigation.length > 0) {
          setCustomNavigation(data.settings.navigation);
        }
      } catch {
        // Fall back to the static content when settings are unavailable.
      }
    }

    void loadSiteSettings();
    return () => {
      active = false;
    };
  }, []);

  const isOverDarkHero = usesDarkHero(pathname);
  const navigationLinks = customNavigation.length > 0 ? [{ label: "Home", href: "/" }, ...customNavigation, { label: "Contact", href: "/contact" }] : [...defaultPrimaryLinks];
  const logoSrc = customLogo || (isOverDarkHero && !isScrolled ? brandAssets.logoDark : brandAssets.logoLight);
  const menuFeature = siteContent.home.introduction.media;

  useEffect(() => {
    const updateScrollState = () => setIsScrolled((current) => {
      const next = window.scrollY > 20;
      return current === next ? current : next;
    });

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);


  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundRegions = [
      headerRef.current,
      document.getElementById("main-content"),
      document.querySelector("footer"),
      document.querySelector(".utility-widgets"),
    ].filter(Boolean) as HTMLElement[];

    document.body.style.overflow = "hidden";
    backgroundRegions.forEach((region) => region.setAttribute("inert", ""));
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      backgroundRegions.forEach((region) => region.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  function openMenu() {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveTab("group");
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function selectTab(tab: MenuTab) {
    setActiveTab(tab);
  }

  function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>, currentTab: MenuTab) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = menuTabs.findIndex((tab) => tab.id === currentTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + menuTabs.length) % menuTabs.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % menuTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = menuTabs.length - 1;

    const nextTab = menuTabs[nextIndex].id;
    setActiveTab(nextTab);
    window.requestAnimationFrame(() => document.getElementById(`mendozer-menu-tab-${nextTab}`)?.focus());
  }

  return (
    <>
      <header className={`site-header ${isOverDarkHero ? "site-header--over-dark" : ""} ${isScrolled ? "site-header--scrolled" : ""}`} ref={headerRef}>
        <div className="site-container site-header__inner">
          <Link aria-label="Mendozer Investments home" className="site-header__brand" href="/">
            <Image alt="Mendozer Investments" height={56} priority src={logoSrc} unoptimized width={178} />
          </Link>
          <button
            aria-controls="mendozer-navigation"
            aria-expanded={isOpen}
            aria-label="Open navigation"
            className="site-header__menu-toggle"
            onClick={openMenu}
            type="button"
          >
            <span aria-hidden="true" className="site-header__menu-label">Menu</span>
            <span aria-hidden="true" className="menu-icon" />
          </button>
        </div>
      </header>

      {isOpen ? (
        <div className="site-menu">
          <div aria-label="Mendozer group navigation" aria-modal="true" className="site-menu__dialog" id="mendozer-navigation" ref={menuRef} role="dialog">
            <div className="site-container site-menu__top">
              <Image alt="Mendozer Investments" height={56} priority src={brandAssets.logoDark} unoptimized width={178} />
              <button aria-label="Close navigation" className="site-menu__close" onClick={closeMenu} ref={closeRef} type="button">
                <span aria-hidden="true" className="menu-icon menu-icon--close" />
              </button>
            </div>

            <div className="site-container site-menu__main">
              <div aria-label="Navigation sections" className="site-menu__tabs" role="tablist">
                {menuTabs.map((tab) => (
                  <button
                    aria-controls={`mendozer-menu-panel-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    id={`mendozer-menu-tab-${tab.id}`}
                    key={tab.id}
                    onClick={() => selectTab(tab.id)}
                    onKeyDown={(event) => handleTabKeys(event, tab.id)}
                    role="tab"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
                <Link className="site-menu__login-link" href="/admin/login" onClick={closeMenu}>Login</Link>
              </div>

              {activeTab === "group" ? (
                <section aria-labelledby="mendozer-menu-tab-group" className="site-menu__panel site-menu__panel--group" id="mendozer-menu-panel-group" role="tabpanel">
                  <div className="site-menu__primary">
                    <p className="eyebrow eyebrow--light">Mendozer Investments</p>
                    <nav aria-label="Group pages" className="site-menu__links">
                      {navigationLinks.map((item, index) => (
                        <Link href={item.href} key={`${item.label}-${item.href}`} onClick={closeMenu}>
                          <span>{item.label}</span>
                          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <figure className="site-menu__feature">
                    <Image alt={menuFeature.alt} fill priority sizes="(max-width: 760px) 100vw, 35vw" src={menuFeature.src} />
                    <figcaption>{menuFeature.caption}</figcaption>
                  </figure>
                </section>
              ) : null}

              {activeTab === "sectors" ? (
                <section aria-labelledby="mendozer-menu-tab-sectors" className="site-menu__panel site-menu__panel--sectors" id="mendozer-menu-panel-sectors" role="tabpanel">
                  <div className="site-menu__sectors-heading">
                    <p className="eyebrow eyebrow--light">Six working directions</p>
                    <p>Start with the closest fit. Use the group contact route when the work crosses disciplines.</p>
                  </div>
                  <div className="site-menu__sector-list">
                    {sectors.map((sector) => (
                      <details className="site-menu__sector" key={sector.slug}>
                        <summary>
                          <span>{sector.number}</span>
                          <span>{sector.title}</span>
                          <span aria-hidden="true" className="site-menu__sector-marker" />
                        </summary>
                        <div className="site-menu__sector-detail">
                          <figure>
                            <Image alt={sector.hero.alt} fill loading="eager" sizes="(max-width: 760px) 100vw, 35vw" src={sector.hero.src} />
                          </figure>
                          <div>
                            <p>{sector.description}</p>
                            <Link href={`/sectors/${sector.slug}`} onClick={closeMenu}>Explore {sector.shortTitle}</Link>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {activeTab === "contact" ? (
                <section aria-labelledby="mendozer-menu-tab-contact" className="site-menu__panel site-menu__panel--contact" id="mendozer-menu-panel-contact" role="tabpanel">
                  <div>
                    <p className="eyebrow eyebrow--light">Start a conversation</p>
                    <h2>Bring the right work into focus.</h2>
                    <p>Tell the group what needs attention and choose the closest sector. The contact route can carry a group enquiry when more than one direction is involved.</p>
                    <Link className="button button--light" href="/contact" onClick={closeMenu}>Prepare an enquiry</Link>
                  </div>
                  <dl className="site-menu__contact-details">
                    <div><dt>Email</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
                    <div><dt>Registration</dt><dd>{siteConfig.registration}</dd></div>
                    <div><dt>VAT</dt><dd>{siteConfig.vat}</dd></div>
                    <div><dt>Public record</dt><dd><Link href="/compliance" onClick={closeMenu}>Licences and records</Link></dd></div>
                  </dl>
                </section>
              ) : null}
            </div>

            <div className="site-container site-menu__footer">
              <span>One group. Six directions.</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
