"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CmsPage = {
  slug: string;
  title: string;
  description: string;
  markdown: string;
};

type CmsNavigationLink = {
  label: string;
  href: string;
};

type CmsSettings = {
  brandName: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  url: string;
  locale: string;
  logo: string;
  navigation: CmsNavigationLink[];
  social: {
    instagram: string;
    facebook: string;
  };
  theme: {
    accent: string;
    accentSoft: string;
    dark: string;
    light: string;
  };
  smtp: {
    host: string;
    port: string;
    user: string;
    pass: string;
    from: string;
    to: string;
    secure: boolean;
  };
};

export function AdminCmsClient() {
  const router = useRouter();
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [settings, setSettings] = useState<CmsSettings | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string>("home");
  const [selectedPage, setSelectedPage] = useState<CmsPage | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<string>("Not saved yet");
  const [newPageName, setNewPageName] = useState("");

  useEffect(() => {
    async function load() {
      const [settingsRes, pagesRes] = await Promise.all([
        fetch("/api/admin/settings"),
        fetch("/api/admin/pages"),
      ]);

      if (settingsRes.status === 401 || pagesRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const settingsData = settingsRes.ok ? await settingsRes.json() : null;
      const pagesData = pagesRes.ok ? await pagesRes.json() : { pages: [] };

      setSettings(settingsData?.settings ?? null);
      setPages(pagesData.pages ?? []);

      if ((pagesData.pages ?? []).length > 0) {
        const first = (pagesData.pages ?? [])[0];
        setSelectedSlug(first.slug);
        setSelectedPage(first);
      }

      setIsLoading(false);
    }

    void load();
  }, [router]);

  const currentPage = useMemo(() => {
    return pages.find((page) => page.slug === selectedSlug) ?? null;
  }, [pages, selectedSlug]);

  useEffect(() => {
    if (currentPage) {
      setSelectedPage(currentPage);
    }
  }, [currentPage]);

  function updateLastSaved() {
    setLastSaved(new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }));
  }

  async function savePage() {
    if (!selectedPage) return;
    setSaving(true);
    setStatus("");
    const response = await fetch(`/api/admin/pages/${selectedPage.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPage),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus(result.message || "Page could not be saved.");
      return;
    }

    setStatus("Saved successfully.");
    updateLastSaved();
    setPages((prev) => prev.map((page) => page.slug === selectedPage.slug ? selectedPage : page));
  }

  async function saveSettings() {
    if (!settings) return;
    setSaving(true);
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus(result.message || "Settings could not be saved.");
      return;
    }

    setStatus("Website settings saved.");
    updateLastSaved();
  }

  async function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !settings) return;

    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : settings.logo;
      setSettings({ ...settings, logo: value });
    };
    reader.readAsDataURL(file);
  }

  function updateNavigationLink(index: number, field: "label" | "href", value: string) {
    if (!settings) return;
    const nextNavigation = settings.navigation.map((link, linkIndex) => {
      if (linkIndex !== index) return link;
      return { ...link, [field]: value };
    });
    setSettings({ ...settings, navigation: nextNavigation });
  }

  function addNavigationLink() {
    if (!settings) return;
    setSettings({
      ...settings,
      navigation: [...settings.navigation, { label: "New link", href: "/" }],
    });
  }

  function removeNavigationLink(index: number) {
    if (!settings) return;
    if (settings.navigation.length <= 1) {
      setStatus("Keep at least one navigation link.");
      return;
    }
    setSettings({
      ...settings,
      navigation: settings.navigation.filter((_, linkIndex) => linkIndex !== index),
    });
  }

  async function createPage() {
    const title = newPageName.trim();
    if (!title) {
      setStatus("Enter a page name before creating a new page.");
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "page";
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        description: `Content for ${title}`,
        markdown: `# ${title}\n\nStart writing your new corporate page content here.`,
      }),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus(result.message || "The page could not be created.");
      return;
    }

    const nextPage = result.page as CmsPage;
    setPages((prev) => [...prev, nextPage].sort((a, b) => a.title.localeCompare(b.title)));
    setSelectedSlug(nextPage.slug);
    setSelectedPage(nextPage);
    setNewPageName("");
    setStatus(`Page "${nextPage.title}" created.`);
    updateLastSaved();
  }

  async function deleteCurrentPage() {
    if (!selectedPage) return;
    if (pages.length === 1) {
      setStatus("Keep at least one page in the CMS.");
      return;
    }

    setSaving(true);
    const response = await fetch(`/api/admin/pages/${selectedPage.slug}`, { method: "DELETE" });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus(result.message || "The page could not be deleted.");
      return;
    }

    const remaining = pages.filter((page) => page.slug !== selectedPage.slug);
    setPages(remaining);
    setSelectedSlug(remaining[0]?.slug ?? "");
    setSelectedPage(remaining[0] ?? null);
    setStatus(`Page "${selectedPage.title}" deleted.`);
    updateLastSaved();
  }

  if (isLoading) {
    return <div className="admin-loading">Loading CMS…</div>;
  }

  const stats = [
    { label: "Pages", value: String(pages.length) },
    { label: "Brand", value: settings?.brandName ?? "Draft" },
    { label: "Email", value: settings?.email ? "Live" : "Pending" },
    { label: "Last saved", value: lastSaved },
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand__mark">S</div>
          <div>
            <p className="admin-brand__eyebrow">Control</p>
            <h2>Skyline CMS</h2>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Dashboard sections">
          <button className="admin-nav__item admin-nav__item--active" type="button">
            Content
          </button>
          <button className="admin-nav__item" type="button">
            Settings
          </button>
        </nav>

        <div className="admin-section-label">Pages</div>

        <div className="admin-create-page">
          <input
            className="admin-input admin-input--dark"
            onChange={(event) => setNewPageName(event.target.value)}
            placeholder="New page name"
            type="text"
            value={newPageName}
          />
          <button className="button button--light admin-create-button" onClick={createPage} type="button">
            New page
          </button>
        </div>

        <ul className="admin-page-list">
          {pages.map((page) => (
            <li key={page.slug}>
              <button
                className={selectedSlug === page.slug ? "is-active" : ""}
                onClick={() => setSelectedSlug(page.slug)}
                type="button"
              >
                <span>{page.title}</span>
                <small>{page.slug}</small>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-kicker">Website dashboard</p>
            <h1>Content control centre</h1>
          </div>
          <div className="admin-topbar__actions">
            <button className="button button--light" onClick={() => router.push("/")} type="button">
              Preview site
            </button>
          </div>
        </header>

        <section className="admin-stat-grid">
          {stats.map((item) => (
            <article className="admin-stat-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>

        {status ? <div className="admin-status">{status}</div> : null}

        <section className="admin-card admin-card--wide">
          <div className="admin-card__header">
            <div>
              <p className="admin-kicker">Editor</p>
              <h2>Page content</h2>
            </div>
            {selectedPage ? (
              <div className="admin-card__actions">
                <button className="button button--ghost" disabled={saving} onClick={deleteCurrentPage} type="button">
                  Delete page
                </button>
                <button className="button button--primary" disabled={saving} onClick={savePage} type="button">
                  {saving ? "Saving…" : "Save page"}
                </button>
              </div>
            ) : null}
          </div>

          {selectedPage ? (
            <div className="admin-page-editor">
              <label className="admin-field admin-field--split">
                <span className="admin-field__label">Title</span>
                <input
                  className="admin-input"
                  onChange={(event) => setSelectedPage({ ...selectedPage, title: event.target.value })}
                  type="text"
                  value={selectedPage.title}
                />
              </label>

              <label className="admin-field admin-field--split">
                <span className="admin-field__label">Slug</span>
                <input className="admin-input admin-input--muted" readOnly type="text" value={selectedPage.slug} />
              </label>

              <label className="admin-field">
                <span className="admin-field__label">Description</span>
                <input
                  className="admin-input"
                  onChange={(event) => setSelectedPage({ ...selectedPage, description: event.target.value })}
                  type="text"
                  value={selectedPage.description}
                />
              </label>

              <label className="admin-field">
                <span className="admin-field__label">Markdown content</span>
                <textarea
                  className="admin-textarea"
                  onChange={(event) => setSelectedPage({ ...selectedPage, markdown: event.target.value })}
                  rows={18}
                  value={selectedPage.markdown}
                />
              </label>
            </div>
          ) : null}
        </section>

        {settings ? (
          <section className="admin-card">
            <div className="admin-card__header">
              <div>
                <p className="admin-kicker">Brand</p>
                <h2>Website settings</h2>
              </div>
              <button className="button button--primary" disabled={saving} onClick={saveSettings} type="button">
                {saving ? "Saving…" : "Save settings"}
              </button>
            </div>

            <div className="admin-settings-grid">
              <label className="admin-field">
                <span className="admin-field__label">Brand name</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, brandName: event.target.value })} type="text" value={settings.brandName} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Short name</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, shortName: event.target.value })} type="text" value={settings.shortName} />
              </label>
              <label className="admin-field admin-field--full">
                <span className="admin-field__label">Tagline</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, tagline: event.target.value })} type="text" value={settings.tagline} />
              </label>
              <label className="admin-field admin-field--full">
                <span className="admin-field__label">Description</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, description: event.target.value })} type="text" value={settings.description} />
              </label>

              <div className="admin-field admin-field--full">
                <span className="admin-field__label">Header logo</span>
                <div className="admin-logo-upload">
                  {settings.logo ? (
                    <img alt="Current header logo" className="admin-logo-preview" src={settings.logo} />
                  ) : null}
                  <input accept="image/*" className="admin-input" onChange={handleLogoUpload} type="file" />
                </div>
              </div>

              <div className="admin-field admin-field--full">
                <span className="admin-field__label">Navigation links</span>
                <div className="admin-navigation-editor">
                  {settings.navigation.map((link, index) => (
                    <div className="admin-navigation-row" key={`${link.label}-${index}`}>
                      <input
                        className="admin-input"
                        onChange={(event) => updateNavigationLink(index, "label", event.target.value)}
                        placeholder="Label"
                        type="text"
                        value={link.label}
                      />
                      <input
                        className="admin-input"
                        onChange={(event) => updateNavigationLink(index, "href", event.target.value)}
                        placeholder="/about"
                        type="text"
                        value={link.href}
                      />
                      <button className="button button--ghost" onClick={() => removeNavigationLink(index)} type="button">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button className="button button--light" onClick={addNavigationLink} type="button">
                    Add link
                  </button>
                </div>
              </div>

              <label className="admin-field">
                <span className="admin-field__label">Email</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, email: event.target.value })} type="email" value={settings.email} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Phone</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, phone: event.target.value })} type="text" value={settings.phone} />
              </label>
              <label className="admin-field admin-field--full">
                <span className="admin-field__label">Address</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, address: event.target.value })} type="text" value={settings.address} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Website URL</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, url: event.target.value })} type="url" value={settings.url} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Locale</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, locale: event.target.value })} type="text" value={settings.locale} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Instagram</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, social: { ...settings.social, instagram: event.target.value } })} type="url" value={settings.social.instagram} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Facebook</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, social: { ...settings.social, facebook: event.target.value } })} type="url" value={settings.social.facebook} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Accent</span>
                <input className="admin-input admin-input--color" onChange={(event) => setSettings({ ...settings, theme: { ...settings.theme, accent: event.target.value } })} type="color" value={settings.theme.accent} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Accent soft</span>
                <input className="admin-input admin-input--color" onChange={(event) => setSettings({ ...settings, theme: { ...settings.theme, accentSoft: event.target.value } })} type="color" value={settings.theme.accentSoft} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Dark</span>
                <input className="admin-input admin-input--color" onChange={(event) => setSettings({ ...settings, theme: { ...settings.theme, dark: event.target.value } })} type="color" value={settings.theme.dark} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Light</span>
                <input className="admin-input admin-input--color" onChange={(event) => setSettings({ ...settings, theme: { ...settings.theme, light: event.target.value } })} type="color" value={settings.theme.light} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">SMTP host</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, smtp: { ...settings.smtp, host: event.target.value } })} type="text" value={settings.smtp.host} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">SMTP user</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, smtp: { ...settings.smtp, user: event.target.value } })} type="text" value={settings.smtp.user} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">SMTP port</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, smtp: { ...settings.smtp, port: event.target.value } })} type="text" value={settings.smtp.port} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">SMTP from</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, smtp: { ...settings.smtp, from: event.target.value } })} type="email" value={settings.smtp.from} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">SMTP to</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, smtp: { ...settings.smtp, to: event.target.value } })} type="email" value={settings.smtp.to} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">SMTP password</span>
                <input className="admin-input" onChange={(event) => setSettings({ ...settings, smtp: { ...settings.smtp, pass: event.target.value } })} type="password" value={settings.smtp.pass} />
              </label>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
