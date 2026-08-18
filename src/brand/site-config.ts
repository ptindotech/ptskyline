/** Centralized deployment configuration. Change the environment variable at cutover. */
export const siteConfig = {
  name: "Mendozer Investments",
  shortName: "Mendozer",
  description: "Mendozer Investments is a multi-sector Namibian group spanning construction, technology, cooling, logistics, energy and tourism, built for local delivery.",
  email: "contact@mendozer.com",
  stagingUrl: "https://mendozer.tangison.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mendozer.tangison.com",
  locale: "en_NA",
  registration: "CC/2009/2399",
  vat: "04948459-015",
  browserTheme: {
    background: "#FFFFFF",
    dark: "#0B1E3D",
  },
  social: {
    instagram: "https://www.instagram.com/mendozer_investments",
    facebook: "https://www.facebook.com/61593183452392",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
