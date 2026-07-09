/**
 * Single source of truth for every SEO-relevant constant on the site.
 * - Domain is forced to https + non-www (canonical = https://quantel.uk/...)
 * - Default OG/Twitter image is the digital-marketing-agency.webp hero asset
 * - Business / contact data mirrors src/constants/contact.ts so we don't
 *   duplicate values that may change.
 */

import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
} from "@/constants/contact";
import { SCHEMA_SAME_AS } from "@/constants/socialLinks";

/** Canonical site origin - always https, no www, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://quantel.uk"
).replace(/^http:\/\//, "https://").replace(/^https:\/\/www\./, "https://");

export const SITE_NAME = "Quantel Solutions";
export const SITE_LEGAL_NAME = "Quantel Solutions Ltd";
export const SITE_LOCALE = "en_GB";
export const SITE_LANG = "en-GB";

/** Default branded title suffix - kept short to leave room for page titles. */
export const DEFAULT_TITLE = `Global Technology & SaaS Partner | ${SITE_NAME}`;

export const DEFAULT_DESCRIPTION =
  "Quantel Solutions is a global technology company delivering SaaS products, white-label platforms, AI solutions, web development, and digital marketing to businesses across the UK, US, and UAE.";

export const DEFAULT_KEYWORDS = [
  "SaaS development UK",
  "white label software",
  "AI solutions",
  "web development London",
  "digital marketing UK",
  "technology partner UAE",
  "SaaS agency United Kingdom",
  "Quantel Solutions",
];

/** Absolute URL of the default Open Graph / Twitter card image. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/digital-marketing-agency.webp`;

/** Brand logo, used in Organization JSON-LD. */
export const ORGANIZATION_LOGO = `${SITE_URL}/images/logo/quantel_solutions_light.png`;

/** Markets we explicitly serve - used in LocalBusiness `areaServed`. */
export const SERVICE_AREAS = [
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "Asia-Pacific",
] as const;

export const PRIMARY_SERVICES = [
  {
    slug: "saas-development",
    name: "SaaS Product Development",
    description:
      "End-to-end SaaS product development - architecture, multi-tenant platforms, billing, and scalable cloud infrastructure for startups and enterprises.",
  },
  {
    slug: "white-label-solutions",
    name: "White-Label Solutions",
    description:
      "Ready-to-brand CRM, ERP, LMS, and e-commerce platforms you can launch under your own name and ship to market faster.",
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    description:
      "Custom AI solutions and intelligent automation - from LLM-powered features and copilots to workflow automation that cuts operational cost.",
  },
] as const;

/** Build an absolute https://quantel.uk/<path> URL from a Next.js path. */
export function absoluteUrl(pathname = "/"): string {
  if (!pathname || pathname === "/") return `${SITE_URL}/`;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const clean = pathname.split("?")[0].split("#")[0];
  const withSlash = clean.startsWith("/") ? clean : `/${clean}`;
  // Strip trailing slash except for root
  const normalised = withSlash.length > 1 ? withSlash.replace(/\/$/, "") : withSlash;
  return `${SITE_URL}${normalised}`;
}

/* -------------------------------------------------------------------------- */
/*                              JSON-LD builders                              */
/* -------------------------------------------------------------------------- */

/**
 * `sameAs` profiles for Organization + LocalBusiness. Sourced from the single
 * central list in constants/socialLinks.ts (Instagram + Facebook + LinkedIn).
 */
const SAME_AS = SCHEMA_SAME_AS;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION_LOGO,
    },
    image: DEFAULT_OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 Fenchurch Street",
      addressLocality: "London",
      addressRegion: "England",
      postalCode: "EC3M 3BY",
      addressCountry: "GB",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_PHONE_DISPLAY,
        email: CONTACT_EMAIL,
        contactType: "customer service",
        areaServed: ["GB", "US", "AE"],
        availableLanguage: ["en"],
      },
    ],
    sameAs: SAME_AS,
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: DEFAULT_OG_IMAGE,
    logo: ORGANIZATION_LOGO,
    description: DEFAULT_DESCRIPTION,
    priceRange: "$$",
    telephone: CONTACT_PHONE_DISPLAY,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 Fenchurch Street",
      addressLocality: "London",
      addressRegion: "England",
      postalCode: "EC3M 3BY",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      // 20 Fenchurch Street, London (the "Walkie-Talkie")
      latitude: 51.5115,
      longitude: -0.0774,
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      ...SERVICE_AREAS.map((c) => ({
        "@type": "AdministrativeArea",
        name: c,
      })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:30",
      },
    ],
    sameAs: SAME_AS,
    // Display address line for users
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      CONTACT_ADDRESS
    )}`,
  };
}

export function websiteSchema() {
  // NOTE: no `potentialAction`/SearchAction. The blog "search" is client-side
  // React state only (no `?q=` URL endpoint), so a sitelinks-searchbox action
  // would point at a URL that performs no search. Add it back only if/when a
  // real query-string search endpoint exists.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: SITE_LANG,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      ...SERVICE_AREAS.map((c) => ({ "@type": "AdministrativeArea", name: c })),
    ],
    url: input.url ?? `${SITE_URL}/marketing-solutions`,
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Human-readable labels for known route segments. Anything not listed falls
 * back to a title-cased version of the slug (see `humaniseSegment`).
 */
const BREADCRUMB_LABELS: Record<string, string> = {
  "about-us": "About Us",
  "our-story": "Our Story",
  contact: "Contact",
  faq: "FAQs",
  blog: "Blog",
  portfolio: "Portfolio",
  "success-stories": "Success Stories",
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  // The services index lives at /marketing-solutions, so the "services"
  // path segment is labelled accordingly.
  "marketing-solutions": "Services",
  services: "Services",
};

/** Acronyms that should keep specific casing instead of plain Title Case. */
const ACRONYMS: Record<string, string> = {
  saas: "SaaS",
  ai: "AI",
  seo: "SEO",
  erp: "ERP",
  ui: "UI",
  ux: "UX",
  crm: "CRM",
};

function humaniseSegment(slug: string): string {
  return slug
    .split("-")
    .map((word) => ACRONYMS[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Auto-generate a breadcrumb trail from a Next.js route path. Always starts at
 * "Home" and appends one crumb per path segment, building cumulative absolute
 * URLs. Returns just `[Home]` for the root path (callers should skip emitting
 * BreadcrumbList JSON-LD when there are fewer than two crumbs).
 *
 * Example: "/services/saas-development" =>
 *   [ { Home, / }, { Services, /services }, { SaaS Development, /services/saas-development } ]
 */
export function buildBreadcrumbs(
  pathname = "/"
): { name: string; url: string }[] {
  const clean = pathname.split("?")[0].split("#")[0];
  const segments = clean.split("/").filter(Boolean);

  const crumbs = [{ name: "Home", url: `${SITE_URL}/` }];
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    crumbs.push({
      name: BREADCRUMB_LABELS[segment] ?? humaniseSegment(segment),
      url: `${SITE_URL}${acc}`,
    });
  }
  return crumbs;
}

/**
 * Specialised WebPage subtypes Google understands. Falls back to plain
 * "WebPage" when no override is supplied.
 */
export type WebPageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "FAQPage"
  | "CollectionPage"
  | "Blog"
  | "ItemPage"
  | "ProfilePage";

export function webPageSchema(input: {
  title: string;
  description: string;
  url: string;
  type?: WebPageType;
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.title,
    description: input.description,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * Build an FAQPage JSON-LD block from a list of question/answer pairs.
 * Use as an extra `jsonLd` entry on FAQ-style pages.
 */
export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}

/* -------------------------------------------------------------------------- */
/*                          Per-page metadata helper                          */
/* -------------------------------------------------------------------------- */

export type PageSeoInput = {
  /** Page title (without site name suffix) */
  title: string;
  description?: string;
  /** Path relative to site root, e.g. "/about-us". Defaults to "/". */
  pathname?: string;
  /** Absolute or site-relative image URL for OG/Twitter cards. */
  image?: string;
  imageAlt?: string;
  /** Set to "article" for blog posts; defaults to "website". */
  type?: "website" | "article";
  /** Extra keywords to append to the defaults. */
  keywords?: string[];
  /** Set to true to disable indexing of the page. */
  noindex?: boolean;
};

export type PageSeo = Required<
  Pick<
    PageSeoInput,
    "title" | "description" | "pathname" | "image" | "imageAlt" | "type"
  >
> & {
  fullTitle: string;
  url: string;
  keywords: string[];
  noindex: boolean;
};

export function buildPageSeo(input: PageSeoInput): PageSeo {
  const pathname = input.pathname ?? "/";
  const description = input.description ?? DEFAULT_DESCRIPTION;
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${SITE_URL}${input.image.startsWith("/") ? input.image : `/${input.image}`}`
    : DEFAULT_OG_IMAGE;

  return {
    title: input.title,
    fullTitle: input.title.toLowerCase().includes("quantel")
      ? input.title
      : `${input.title} | ${SITE_NAME}`,
    description,
    pathname,
    url: absoluteUrl(pathname),
    image,
    imageAlt: input.imageAlt ?? `${input.title} – ${SITE_NAME}`,
    type: input.type ?? "website",
    keywords: Array.from(
      new Set([...(input.keywords ?? []), ...DEFAULT_KEYWORDS])
    ),
    noindex: input.noindex ?? false,
  };
}
