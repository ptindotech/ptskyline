import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type CmsThemeSettings = {
  accent: string;
  accentSoft: string;
  dark: string;
  light: string;
};

export type CmsSmtpSettings = {
  host: string;
  port: string;
  user: string;
  pass: string;
  from: string;
  to: string;
  secure: boolean;
};

export type CmsSiteSettings = {
  brandName: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  url: string;
  locale: string;
  social: {
    instagram: string;
    facebook: string;
  };
  theme: CmsThemeSettings;
  smtp: CmsSmtpSettings;
};

export type CmsPage = {
  slug: string;
  title: string;
  description: string;
  markdown: string;
};

export type CmsContentItem = {
  id: string;
  title: string;
  description: string;
  body: string;
};

export type CmsWebsiteContent = {
  pages: CmsPage[];
  posts: CmsContentItem[];
  events: CmsContentItem[];
  sectors: CmsContentItem[];
  services: CmsContentItem[];
  updates: CmsContentItem[];
  settings: CmsSiteSettings;
};

export const cmsRoot = path.join(process.cwd(), "src/content/cms");
export const siteSettingsPath = path.join(cmsRoot, "site-settings.json");
export const pagesRoot = path.join(cmsRoot, "pages");
export const websiteContentPath = path.join(cmsRoot, "website-content.json");

const defaultSettings: CmsSiteSettings = {
  brandName: "Mendozer Investments",
  shortName: "Mendozer",
  tagline: "Six working directions. One accountable group. Built for Namibia.",
  description: "Mendozer Investments is a multi-sector operating group focused on infrastructure, energy, logistics and community delivery.",
  email: "contact@mendozer.com",
  phone: "+264 81 000 0000",
  address: "Windhoek, Namibia",
  url: "https://mendozer.tangison.com",
  locale: "en_NA",
  social: {
    instagram: "https://www.instagram.com/mendozer_investments",
    facebook: "https://www.facebook.com/61593183452392",
  },
  theme: {
    accent: "#0B1E3D",
    accentSoft: "#5E8BD8",
    dark: "#06142D",
    light: "#F5F7FB",
  },
  smtp: {
    host: "",
    port: "587",
    user: "",
    pass: "",
    from: "",
    to: "",
    secure: true,
  },
};

function readJson<T>(filePath: string, fallback: T): Promise<T> {
  return readFile(filePath, "utf8")
    .then((content) => JSON.parse(content) as T)
    .catch(() => fallback);
}

export async function getSiteSettings(): Promise<CmsSiteSettings> {
  const parsed = await readJson<CmsSiteSettings>(siteSettingsPath, defaultSettings);
  return { ...defaultSettings, ...parsed, theme: { ...defaultSettings.theme, ...(parsed.theme ?? {}) }, social: { ...defaultSettings.social, ...(parsed.social ?? {}) }, smtp: { ...defaultSettings.smtp, ...(parsed.smtp ?? {}) } };
}

export async function saveSiteSettings(input: Partial<CmsSiteSettings>): Promise<CmsSiteSettings> {
  const current = await getSiteSettings();
  const next: CmsSiteSettings = {
    ...current,
    ...input,
    theme: { ...current.theme, ...input.theme },
    social: { ...current.social, ...input.social },
    smtp: { ...current.smtp, ...input.smtp },
  };
  await mkdir(cmsRoot, { recursive: true });
  await writeFile(siteSettingsPath, JSON.stringify(next, null, 2) + "\n", "utf8");
  return next;
}

export async function listCmsPages(): Promise<CmsPage[]> {
  await mkdir(pagesRoot, { recursive: true });
  const entries = await import("node:fs/promises").then((fs) => fs.readdir(pagesRoot, { withFileTypes: true }));
  const pages = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.md$/, "");
        const markdown = await readFile(path.join(pagesRoot, entry.name), "utf8");
        const subject = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
        const metadata = subject ? subject[1].split(/\n/).reduce<Record<string, string>>((acc, line) => {
          const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
          if (match) acc[match[1]] = match[2];
          return acc;
        }, {}) : {};
        return {
          slug,
          title: metadata.title || slug,
          description: metadata.description || "CMS page",
          markdown: markdown.replace(/^---\n[\s\S]*?\n---\n?/, "").trim(),
        } satisfies CmsPage;
      }),
  );
  return pages.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPageMarkdown(slug: string): Promise<CmsPage | null> {
  const file = path.join(pagesRoot, `${slug}.md`);
  try {
    const markdown = await readFile(file, "utf8");
    const subject = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
    const metadata = subject ? subject[1].split(/\n/).reduce<Record<string, string>>((acc, line) => {
      const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (match) acc[match[1]] = match[2];
      return acc;
    }, {}) : {};
    return {
      slug,
      title: metadata.title || slug,
      description: metadata.description || "CMS page",
      markdown: markdown.replace(/^---\n[\s\S]*?\n---\n?/, "").trim(),
    };
  } catch {
    return null;
  }
}

export async function createPageMarkdown(slug: string, title: string, description: string, markdown: string): Promise<CmsPage> {
  await mkdir(pagesRoot, { recursive: true });
  const sanitizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "") || "page";
  const file = path.join(pagesRoot, `${sanitizedSlug}.md`);

  try {
    await readFile(file, "utf8");
    throw new Error("Page already exists");
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") {
      throw error;
    }
  }

  const doc = [
    "---",
    `title: ${title || "New page"}`,
    `description: ${description || "Page description"}`,
    "---",
    "",
    (markdown || "# New page\n\nStart writing content here.").trim(),
    "",
  ].join("\n");

  await writeFile(file, doc, "utf8");
  return { slug: sanitizedSlug, title: title || "New page", description: description || "Page description", markdown: (markdown || "# New page\n\nStart writing content here.").trim() };
}

export async function deletePageMarkdown(slug: string): Promise<void> {
  const file = path.join(pagesRoot, `${slug}.md`);
  await import("node:fs/promises").then((fs) => fs.unlink(file)).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") {
      throw error;
    }
  });
}

export async function savePageMarkdown(slug: string, title: string, description: string, markdown: string): Promise<CmsPage> {
  await mkdir(pagesRoot, { recursive: true });
  const doc = [
    "---",
    `title: ${title}`,
    `description: ${description}`,
    "---",
    "",
    markdown.trim(),
    "",
  ].join("\n");
  const file = path.join(pagesRoot, `${slug}.md`);
  await writeFile(file, doc, "utf8");
  return { slug, title, description, markdown: markdown.trim() };
}

export async function getWebsiteContent(): Promise<CmsWebsiteContent> {
  const [settings, pages] = await Promise.all([getSiteSettings(), listCmsPages()]);

  try {
    const content = await readJson<CmsWebsiteContent>(websiteContentPath, {
      pages,
      posts: [],
      events: [],
      sectors: [],
      services: [],
      updates: [],
      settings,
    });

    return {
      pages: Array.isArray(content.pages) && content.pages.length ? content.pages : pages,
      posts: Array.isArray(content.posts) ? content.posts : [],
      events: Array.isArray(content.events) ? content.events : [],
      sectors: Array.isArray(content.sectors) ? content.sectors : [],
      services: Array.isArray(content.services) ? content.services : [],
      updates: Array.isArray(content.updates) ? content.updates : [],
      settings: { ...settings, ...(content.settings ?? {}) },
    };
  } catch {
    return {
      pages,
      posts: [],
      events: [],
      sectors: [],
      services: [],
      updates: [],
      settings,
    };
  }
}

export async function saveWebsiteContent(input: Partial<CmsWebsiteContent> = {}): Promise<CmsWebsiteContent> {
  const current = await getWebsiteContent();
  const next: CmsWebsiteContent = {
    pages: input.pages ?? current.pages,
    posts: input.posts ?? current.posts,
    events: input.events ?? current.events,
    sectors: input.sectors ?? current.sectors,
    services: input.services ?? current.services,
    updates: input.updates ?? current.updates,
    settings: { ...current.settings, ...(input.settings ?? {}) },
  };

  await mkdir(cmsRoot, { recursive: true });
  await writeFile(websiteContentPath, JSON.stringify(next, null, 2) + "\n", "utf8");

  if (next.settings) {
    await saveSiteSettings(next.settings);
  }

  return next;
}
