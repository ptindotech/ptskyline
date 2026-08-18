/**
 * MENDOZER CONTENT LAYER
 *
 * This is the only source of brand copy, IA labels, and asset-to-sector assignments.
 * Components consume these objects and remain reusable for future Tangison corporate builds.
 * All visual sector matches are unconfirmed client-supplied context photographs; captions stay generic.
 */

export type SectorSlug =
  | "construction"
  | "technology"
  | "cooling"
  | "logistics"
  | "energy"
  | "tourism";

export type GlyphName =
  | "structure"
  | "signal"
  | "cooling"
  | "route"
  | "energy"
  | "landscape";

export type MediaAsset = {
  src: string;
  alt: string;
  caption: string;
  status: "real" | "generated";
  focus?: string;
};

export type Service = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LegalPage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
};

export type WorkContext = {
  sector: string;
  title: string;
  body: string;
  media: MediaAsset;
  href: string;
};

export type PublicUpdate = {
  eyebrow: string;
  title: string;
  body: string;
  sourceLabel?: string;
  sourceUrl?: string;
  media: MediaAsset;
};

export type VerifiedFact = {
  eyebrow: string;
  title: string;
  body: string;
  sourceLabel: string;
  sourceUrl: string;
};

/** Independently verifiable public record, safe to state without a client-verification marker. */
export const verifiedFacts = {
  wholesaleFuelLicence: {
    eyebrow: "Verified public record",
    title: "Wholesale fuel distribution licence",
    body: "Mendozer Investments CC is listed as a wholesale distributor under licence W/188/2017 in the Government Gazette.",
    sourceLabel: "Namibia Government Gazette No. 8655, 4 June 2025, Annexure 1",
    sourceUrl: "https://www.lac.org.na/laws/2025/8655.pdf",
  },
} as const satisfies Record<string, VerifiedFact>;

export type Sector = {
  slug: SectorSlug;
  number: string;
  navLabel: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  glyph: GlyphName;
  hero: MediaAsset;
  gallery: [MediaAsset, MediaAsset];
  services: Service[];
  crossover: string;
  verifiedFact?: VerifiedFact;
};

export const siteContent = {
  navigation: [
    { label: "About", href: "/about" },
    { label: "Sectors", href: "/sectors" },
    { label: "Work", href: "/work" },
    { label: "Updates", href: "/updates" },
    { label: "Public records", href: "/compliance" },
    { label: "Community", href: "/community" },
  ],
  hero: {
    eyebrow: "Mendozer Investments",
    title: "Multi-sector infrastructure, built for Namibia.",
    subtext: "Six working directions. One accountable group. Construction, technology, cooling, logistics, energy and tourism, delivered across Namibia since 2009.",
    primaryCta: { label: "Start an enquiry", href: "/contact" },
    secondaryCta: { label: "Explore directions", href: "/#sectors" },
    proofBadge: "CC/2009/2399 / Since 2009 / Six sectors",
    followEyebrow: "The Mendozer group",
    followTitle: "One accountable group across six working directions.",
    followBody: "Construction, technology, cooling, logistics, energy and tourism are connected by one operational backbone. Start with the sector closest to the work in front of you, and bring the group in when the brief crosses disciplines. Every direction carries the same standard: real site context, verified records, and work delivered with care.",
    media: {
      src: "/images/projects/construction/road-works-2.jpg",
      alt: "A site team beside active infrastructure work",
      caption: "Construction work in progress",
      status: "real",
      focus: "50% 55%",
    } satisfies MediaAsset,
  },
  sectorHub: {
    eyebrow: "Mendozer sectors",
    title: "Choose the right working direction.",
    body: "Start with the sector closest to the work in front of you. If the scope crosses disciplines, use the group contact route.",
    hero: {
      src: "/images/projects/construction/road-works-2.jpg",
      alt: "Site team beside active infrastructure work",
      caption: "Construction work in progress",
      status: "real",
      focus: "50% 55%",
    } satisfies MediaAsset,
  },
  work: {
    eyebrow: "Work context",
    title: "Published carefully, grounded in the work.",
    body: "These client-supplied images show site, field and facility context from the Mendozer archive. Project names and client details are published only when approval is in place.",
    hero: {
      src: "/images/projects/work/IMG-20260808-WA0034.jpg",
      alt: "A broad view across a building work site",
      caption: "Construction work in progress",
      status: "real",
      focus: "50% 52%",
    } satisfies MediaAsset,
  },
  updates: {
    eyebrow: "Updates & public records",
    title: "Activity, recorded with care.",
    body: "This page brings together approved community context and publicly verifiable records. It does not turn unapproved site images into project claims.",
    hero: {
      src: "/images/projects/community/IMG-20260808-WA0077.jpg",
      alt: "Attendees in front of a Mendozer-branded community event backdrop",
      caption: "Community sponsorship event",
      status: "real",
      focus: "50% 38%",
    } satisfies MediaAsset,
  },
  compliance: {
    eyebrow: "Public records & licences",
    title: "Verified details, stated plainly.",
    body: "Mendozer publishes registration detail and public licensing records that can be verified. Additional compliance material is added only when it is approved for publication.",
    hero: {
      src: "/images/projects/fuel-energy/plant-piping.jpg",
      alt: "Piping and infrastructure at an operational plant",
      caption: "Energy infrastructure work in progress",
      status: "real",
      focus: "54% 52%",
    } satisfies MediaAsset,
  },
  home: {
    introduction: {
      eyebrow: "The Mendozer group",
      title: "Start with the work in front of you.",
      body: "Choose the working direction closest to the need. If the brief crosses more than one area, begin with one accountable group.",
      media: {
        src: "/images/projects/technology/tower-full-view.jpg",
        alt: "A communications tower above a work site",
        caption: "Field systems work in progress",
        status: "real",
        focus: "52% 42%",
      } satisfies MediaAsset,
    },
    sectorIntro: {
      eyebrow: "Our sectors",
      title: "Find the right starting point.",
      body: "Six working directions, one clear route to the group.",
    },
    connective: {
      eyebrow: "A connected view",
      title: "One group keeps the whole brief in view.",
      body: "A site, system, facility and supply route can be connected. Start with the need, then bring the right direction into the conversation.",
    },
    faq: {
      eyebrow: "Starting point",
      title: "Start with the work in front of you.",
      body: "A few practical answers before you prepare a group or sector enquiry.",
      items: [
        {
          question: "Which sector should I choose?",
          answer: "Choose the working direction closest to the enquiry. If the work crosses more than one area, select Group enquiry in the contact form.",
        },
        {
          question: "What should I include in an enquiry?",
          answer: "Include a short description of the work or opportunity, the relevant sector, any useful site or operating context, and the best person to contact.",
        },
        {
          question: "Can I contact the group directly?",
          answer: "Yes. The contact route lets you prepare a message to contact@mendozer.com without storing the enquiry on this website.",
        },
        {
          question: "Where can I find published project detail?",
          answer: "Project and service detail is added only when it has been approved for publication. The site does not use unverified project claims as proof.",
        },
      ] satisfies FaqItem[],
    },
    community: {
      eyebrow: "In the community",
      title: "Visible support for local moments.",
      body: "Explore the sponsorship context currently approved for publication.",
      media: {
        src: "/images/projects/community/IMG-20260808-WA0076.jpg",
        alt: "Guests at a Mendozer-branded community event backdrop",
        caption: "Community sponsorship event",
        status: "real",
        focus: "50% 42%",
      } satisfies MediaAsset,
    },
  },
  about: {
    eyebrow: "About the group",
    title: "One group for work that crosses disciplines.",
    body: "Mendozer Investments brings six working directions into one group conversation for partners, institutions and commercial enquiries.",
    hero: {
      src: "/images/projects/logistics/crew-roadside.jpg",
      alt: "A work crew gathered beside a road",
      caption: "Site support work in progress",
      status: "real",
      focus: "50% 30%",
    } satisfies MediaAsset,
    commitments: [
      {
        number: "01",
        title: "Start in one place",
        body: "One direct route for enquiries that need more than one capability.",
      },
      {
        number: "02",
        title: "Choose the closest fit",
        body: "Begin with the sector that matches the immediate work, then widen the conversation where needed.",
      },
      {
        number: "03",
        title: "Built for Namibia",
        body: "The group is introduced through local working context, not a generic imported template.",
      },
    ],
    leadership: {
      eyebrow: "Leadership",
      title: "A clear line of accountability.",
      name: "Johannes Negumbo",
      role: "Managing Director",
      note: "A fuller leadership profile is published only when it is approved for public use.",
    },
    fuelLicence: verifiedFacts.wholesaleFuelLicence,
  },
  community: {
    eyebrow: "Community & sponsorship",
    title: "Sponsorship visible where people gather.",
    body: "Mendozer’s approved event archive records sponsorship visibility at community-facing occasions.",
    hero: {
      src: "/images/projects/community/IMG-20260808-WA0077.jpg",
      alt: "Attendees in front of a Mendozer-branded event backdrop",
      caption: "Community sponsorship event",
      status: "real",
      focus: "50% 38%",
    } satisfies MediaAsset,
    initiatives: [
      {
        title: "Miss Teen Namibia 2026",
        body: "Client-supplied event imagery records Mendozer sponsorship visibility at the event.",
        media: {
          src: "/images/projects/community/IMG-20260808-WA0078.jpg",
          alt: "Guests at a Mendozer-branded event backdrop",
          caption: "Community sponsorship event",
          status: "real",
          focus: "50% 35%",
        } satisfies MediaAsset,
      },
      {
        title: "Otjiwarongo Sports Bonanza",
        body: "Listed in the client-supplied sponsorship record as a Mendozer sponsor acknowledgement, not an organiser credit. The visual is generated local-sport context, not event documentation.",
        media: {
          src: "/images/generated/community-otjiwarongo-sport-context.png",
          alt: "An empty local sport ground with a weathered football goal and low pavilion",
          caption: "Generated local-sport context, not event documentation",
          status: "generated",
          focus: "50% 54%",
        } satisfies MediaAsset,
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start with the work in front of you.",
    body: "Tell the group what needs attention, which sector is closest, and how to contact you. Secure delivery is used where configured, with direct email available as a fallback.",
    media: {
      src: "/images/projects/technology/IMG-20260808-WA0061.jpg",
      alt: "A communications tower above a prepared site",
      caption: "Tower and systems work in progress",
      status: "real",
      focus: "50% 53%",
    } satisfies MediaAsset,
    email: "contact@mendozer.com",
  },
  footer: {
    statement: "Multi-sector direction, one group.",
    registrationLabel: "CC/2009/2399",
    vatLabel: "VAT 04948459-015",
  },
} as const;

export const sectors: Sector[] = [
  {
    slug: "construction",
    number: "01",
    navLabel: "Construction",
    title: "Construction & Infrastructure",
    shortTitle: "Construction",
    eyebrow: "Sector 01",
    description: "Construction and infrastructure work starts with the conditions on the ground.",
    glyph: "structure",
    hero: {
      src: "/images/projects/construction/IMG-20260808-WA0033.jpg",
      alt: "A building under construction on an open site",
      caption: "Building work in progress",
      status: "real",
      focus: "50% 55%",
    },
    gallery: [
      {
        src: "/images/projects/construction/road-works-1.jpg",
        alt: "A crew beside roadside infrastructure work",
        caption: "Road and site work in progress",
        status: "real",
        focus: "52% 50%",
      },
      {
        src: "/images/projects/construction/IMG-20260808-WA0035.jpg",
        alt: "A broad view of a building work site",
        caption: "Building work in progress",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Site preparation", description: "Plan practical work around access, ground conditions and the active site." },
      { title: "Built structures", description: "Bring structural and supporting work into one clear scope." },
      { title: "Site coordination", description: "Keep people, materials and workfronts aligned." },
    ],
    crossover: "Construction often meets logistics, technology and energy on the same brief.",
  },
  {
    slug: "technology",
    number: "02",
    navLabel: "Technology",
    title: "Technology & Systems",
    shortTitle: "Technology",
    eyebrow: "Sector 02",
    description: "Technology and systems work where field infrastructure supports day-to-day operations.",
    glyph: "signal",
    hero: {
      src: "/images/projects/technology/IMG-20260808-WA0061.jpg",
      alt: "A communications tower on a prepared site",
      caption: "Tower and systems work in progress",
      status: "real",
      focus: "50% 55%",
    },
    gallery: [
      {
        src: "/images/projects/technology/IMG-20260808-WA0056.jpg",
        alt: "Communications equipment mounted on a tower",
        caption: "Tower equipment work in progress",
        status: "real",
        focus: "50% 45%",
      },
      {
        src: "/images/projects/technology/IMG-20260808-WA0060.jpg",
        alt: "Structural base work at a communications installation",
        caption: "Tower base work in progress",
        status: "real",
        focus: "50% 48%",
      },
    ],
    services: [
      { title: "Systems direction", description: "Define the operational need before choosing the system response." },
      { title: "Telecom infrastructure", description: "Support the tower, equipment and site context that keep teams linked." },
      { title: "Field coordination", description: "Coordinate work around active operating environments." },
    ],
    crossover: "Technology must work with the physical infrastructure that carries it.",
  },
  {
    slug: "cooling",
    number: "03",
    navLabel: "Cooling",
    title: "Cooling & Cold Chain",
    shortTitle: "Cooling",
    eyebrow: "Sector 03",
    description: "Cooling and cold-chain work where facility continuity depends on controlled conditions.",
    glyph: "cooling",
    hero: {
      src: "/images/projects/cooling/IMG-20260808-WA0047.jpg",
      alt: "Industrial piping beside a facility building",
      caption: "Facility infrastructure work in progress",
      status: "real",
      focus: "52% 54%",
    },
    gallery: [
      {
        src: "/images/projects/cooling/IMG-20260808-WA0046.jpg",
        alt: "A team walking beside industrial service equipment",
        caption: "Facility support work in progress",
        status: "real",
        focus: "52% 52%",
      },
      {
        src: "/images/projects/cooling/IMG-20260808-WA0044.jpg",
        alt: "A team walking through an operational facility area",
        caption: "Operational facility work in progress",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Cold-chain planning", description: "Plan the route from controlled environment to delivery point." },
      { title: "Cooling facilities", description: "Focus facility work on the systems that protect continuity." },
      { title: "Operational coordination", description: "Align site work with the requirements of active facilities." },
    ],
    crossover: "Cold-chain continuity can involve cooling, logistics and site support.",
  },
  {
    slug: "logistics",
    number: "04",
    navLabel: "Logistics",
    title: "Logistics & Support Services",
    shortTitle: "Logistics",
    eyebrow: "Sector 04",
    description: "Logistics and support work that keeps sites, crews and materials moving.",
    glyph: "route",
    hero: {
      src: "/images/projects/logistics/founder-site-visit.jpg",
      alt: "Vehicles and people gathered beside an unpaved work route",
      caption: "Logistics support work in progress",
      status: "real",
      focus: "50% 53%",
    },
    gallery: [
      {
        src: "/images/projects/logistics/IMG-20260808-WA0048.jpg",
        alt: "People beside a container at a work site",
        caption: "Container support work in progress",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/logistics/IMG-20260808-WA0043.jpg",
        alt: "A group walking through a work environment",
        caption: "Field support work in progress",
        status: "real",
        focus: "55% 50%",
      },
    ],
    services: [
      { title: "Site logistics", description: "Support the movement of people and materials through the workday." },
      { title: "Crew and material support", description: "Keep operational sites prepared for the next task." },
      { title: "Field coordination", description: "Keep practical detail in view across a changing workfront." },
    ],
    crossover: "Logistics connects sites, people, materials and related group directions.",
  },
  {
    slug: "energy",
    number: "05",
    navLabel: "Energy",
    title: "Fuel & Energy Distribution",
    shortTitle: "Energy",
    eyebrow: "Sector 05",
    description: "Wholesale fuel distribution and supporting infrastructure in one working direction.",
    glyph: "energy",
    hero: {
      src: "/images/projects/fuel-energy/plant-piping.jpg",
      alt: "Piping and infrastructure at an operational plant",
      caption: "Energy infrastructure work in progress",
      status: "real",
      focus: "54% 52%",
    },
    gallery: [
      {
        src: "/images/projects/energy/IMG-20260808-WA0045.jpg",
        alt: "People walking beside industrial storage infrastructure",
        caption: "Energy facility context",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/energy/IMG-20260808-WA0052.jpg",
        alt: "A close view of industrial structural hardware",
        caption: "Structural systems work in progress",
        status: "real",
        focus: "50% 52%",
      },
    ],
    services: [
      { title: "Wholesale distribution", description: "Bring the verified distribution direction into the group conversation." },
      { title: "Infrastructure context", description: "Work with the visible infrastructure behind essential services." },
      { title: "Operational alignment", description: "Coordinate the related group directions around energy work." },
    ],
    verifiedFact: verifiedFacts.wholesaleFuelLicence,
    crossover: "Energy distribution depends on the infrastructure, logistics and systems around it.",
  },
  {
    slug: "tourism",
    number: "06",
    navLabel: "Tourism & Agriculture",
    title: "Tourism & Agriculture",
    shortTitle: "Tourism & Agriculture",
    eyebrow: "Sector 06",
    description: "Tourism and agriculture work rooted in place, land and operating context.",
    glyph: "landscape",
    hero: {
      src: "/images/projects/tourism/IMG-20260808-WA0055.jpg",
      alt: "A view across a green Namibian landscape",
      caption: "Landscape in view",
      status: "real",
      focus: "50% 50%",
    },
    gallery: [
      {
        src: "/images/projects/tourism/IMG-20260808-WA0066.jpg",
        alt: "Outdoor work equipment beneath a tree",
        caption: "Rural operating context",
        status: "real",
        focus: "50% 50%",
      },
      {
        src: "/images/projects/tourism/IMG-20260808-WA0067.jpg",
        alt: "A broad dry landscape with mature trees",
        caption: "Landscape in view",
        status: "real",
        focus: "50% 50%",
      },
    ],
    services: [
      { title: "Land and access context", description: "Start with land, access and the operating setting." },
      { title: "Rural operating context", description: "Consider practical needs beyond urban work environments." },
      { title: "Long-term planning", description: "Keep durability and local context in the conversation." },
    ],
    crossover: "Tourism and agriculture bring land, access and long-term operations into the wider group conversation.",
  },
];

export const workContexts: WorkContext[] = [
  {
    sector: "Construction & Infrastructure",
    title: "Building work context",
    body: "Client-supplied building and site context, shown without a named project claim.",
    href: "/sectors/construction",
    media: {
      src: "/images/projects/work/IMG-20260808-WA0032.jpg",
      alt: "A building under construction beside an open site",
      caption: "Construction work in progress",
      status: "real",
      focus: "50% 52%",
    },
  },
  {
    sector: "Technology & Systems",
    title: "Field systems context",
    body: "Tower and field-installation context from the supplied Mendozer archive.",
    href: "/sectors/technology",
    media: {
      src: "/images/projects/work/IMG-20260808-WA0063.jpg",
      alt: "A communications antenna structure against the sky",
      caption: "Field systems work in progress",
      status: "real",
      focus: "50% 50%",
    },
  },
  {
    sector: "Logistics & Support Services",
    title: "Site support context",
    body: "Container and site-support context, shown without an unverified location or client name.",
    href: "/sectors/logistics",
    media: {
      src: "/images/projects/work/IMG-20260808-WA0049.jpg",
      alt: "A team beside a container at a work site",
      caption: "Logistics support work in progress",
      status: "real",
      focus: "50% 50%",
    },
  },
];

export const publicUpdates: PublicUpdate[] = [
  {
    eyebrow: "Public record",
    title: "Wholesale fuel distribution licence",
    body: "Mendozer Investments CC is listed as a wholesale distributor under licence W/188/2017 in the Government Gazette.",
    sourceLabel: "Namibia Government Gazette No. 8655, 4 June 2025, Annexure 1",
    sourceUrl: "https://www.lac.org.na/laws/2025/8655.pdf",
    media: {
      src: "/images/projects/fuel-energy/plant-piping.jpg",
      alt: "Piping and infrastructure at an operational plant",
      caption: "Energy infrastructure work in progress",
      status: "real",
      focus: "54% 52%",
    },
  },
  {
    eyebrow: "Community archive",
    title: "Miss Teen Namibia 2026",
    body: "Client-supplied event imagery records Mendozer sponsorship visibility at the event.",
    media: {
      src: "/images/projects/community/IMG-20260808-WA0078.jpg",
      alt: "Guests at a Mendozer-branded community event backdrop",
      caption: "Community sponsorship event",
      status: "real",
      focus: "50% 35%",
    },
  },
  {
    eyebrow: "Community archive",
    title: "Otjiwarongo Sports Bonanza",
    body: "The client-supplied record identifies Mendozer as a sponsor acknowledgement, not an organiser. The image is generated local-sport context, not event documentation.",
    media: {
      src: "/images/generated/community-otjiwarongo-sport-context.png",
      alt: "An empty local sport ground with a weathered football goal and low pavilion",
      caption: "Generated local-sport context, not event documentation",
      status: "generated",
      focus: "50% 54%",
    },
  },
];

export const legalPages = {
  privacy: {
    eyebrow: "Privacy notice",
    title: "A clear note on website enquiries.",
    intro: "This site is designed to present Mendozer Investments and give visitors a direct contact route. It does not operate an account area, client portal, payment flow, or on-site lead database.",
    sections: [
      {
        heading: "When you prepare an enquiry",
        paragraphs: [
          "When secure delivery is configured, the contact form validates the enquiry and sends it to contact@mendozer.com through the approved server-side delivery provider. The form may also send a confirmation email to the address you provide.",
          "If secure delivery is unavailable, the website opens a prepared email in your own mail application, addressed to contact@mendozer.com. Include only information that is relevant to the enquiry.",
        ],
      },
      {
        heading: "Technical delivery",
        paragraphs: [
          "The website is hosted through Vercel to deliver pages, images, and security protections. Standard technical request information may be processed by the hosting provider as needed to operate and secure the service.",
          "This build does not embed advertising pixels, social feeds, or a third-party analytics script.",
        ],
      },
      {
        heading: "Questions about this notice",
        paragraphs: [
          "For a privacy-related website enquiry, use contact@mendozer.com and state the nature of the request clearly.",
          "This notice should be reviewed when the contact workflow, analytics, or any client-facing service changes.",
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Website terms",
    title: "Information for a clear first conversation.",
    intro: "The Mendozer Investments website provides introductory group and sector information. It is not a quote, service agreement, or confirmation of project availability.",
    sections: [
      {
        heading: "Information on this website",
        paragraphs: [
          "Content is provided to help visitors identify a relevant Mendozer working direction and begin an enquiry. Service, project, and availability detail should be confirmed directly with the group.",
          "Mendozer may update website information as approved material becomes available.",
        ],
      },
      {
        heading: "Images and public records",
        paragraphs: [
          "Supplied project-context photography is captioned generically unless a specific project is approved for publication. Generated contextual imagery is labelled and is not presented as documentary project or event evidence.",
          "The website also links to a public Namibia Government Gazette record for wholesale fuel distribution licence W/188/2017. The linked record is cited as a source, not as a broader performance claim.",
        ],
      },
      {
        heading: "Using the site",
        paragraphs: [
          "Do not rely on website information as a substitute for a written agreement or direct confirmation from Mendozer Investments.",
          "For a group or sector enquiry, contact contact@mendozer.com.",
        ],
      },
    ],
  },
} as const satisfies Record<string, LegalPage>;

export const routes = [
  "/",
  "/about",
  "/sectors",
  ...sectors.map((sector) => `/sectors/${sector.slug}`),
  "/work",
  "/updates",
  "/compliance",
  "/community",
  "/contact",
  "/blog/otjiwarongo-sports-bonanza-2026",
  "/privacy",
  "/terms",
] as const;

export function getSector(slug: string): Sector | undefined {
  return sectors.find((sector) => sector.slug === slug);
}
