/**
 * Content for the geo-targeted landing pages served at /uk, /usa and /uae.
 *
 * These pages exist to open UK, USA and UAE Google impressions (Search Console
 * currently shows zero in those markets). Each region reuses the site's
 * existing section design language (`.marketing-services`, `.marketing-why`,
 * `.marketing-results`, `.btn--primary/secondary`) and pulls the service list
 * from the single source of truth in `src/data/services.ts` — no duplicated
 * service copy.
 *
 * All copy here is provided/approved marketing content — no fabricated stats
 * beyond the site-wide figures already used elsewhere (500+ projects, 98%
 * retention).
 */

export type GeoStat = {
  /** Headline figure, e.g. "500+". */
  value: string;
  /** Short label under the figure. */
  label: string;
  /** Supporting one-liner shown in the stat card. */
  detail: string;
};

export type GeoReason = {
  /** FontAwesome class, matching the icon convention used across services.ts. */
  icon: string;
  title: string;
  description: string;
};

export type GeoRegion = {
  /** URL slug — page lives at /<slug>. */
  slug: "uk" | "usa" | "uae";

  /* ---- Hero ---- */
  /** Eyebrow badge text (includes the flag emoji). */
  flagBadge: string;
  h1: string;
  subheadline: string;
  trustBullets: string[];
  /** Big flag shown in the hero beacon card. */
  beaconFlag: string;
  /** Region label under the beacon flag. */
  beaconLabel: string;
  /** Short coverage chips shown in the beacon card. */
  beaconChips: string[];

  /* ---- Sections ---- */
  servicesHeading: string;
  whyHeading: string;
  reasons: GeoReason[];
  stats: GeoStat[];

  /* ---- CTA banner ---- */
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
};

/** Site-wide figures — identical across all three geo pages per the brief. */
const SHARED_STATS: GeoStat[] = [
  {
    value: "500+",
    label: "Projects Delivered",
    detail: "Shipped for startups and enterprises worldwide.",
  },
  {
    value: "98%",
    label: "Client Retention",
    detail: "Partners who stay with us year over year.",
  },
  {
    value: "5+",
    label: "Years Experience",
    detail: "Building and scaling products since day one.",
  },
  {
    value: "11",
    label: "Services Offered",
    detail: "One accountable partner, every capability.",
  },
];

export const GEO_REGIONS: GeoRegion[] = [
  /* ------------------------------------------------------------------ UK */
  {
    slug: "uk",
    flagBadge: "🇬🇧 Serving the United Kingdom",
    h1: "London's Global Technology Partner",
    subheadline:
      "Quantel Solutions is headquartered in London. We build SaaS platforms, AI solutions, web products and white-label software for UK startups and enterprises — fully delivered for you.",
    trustBullets: [
      "500+ projects delivered",
      "London-based team",
      "UK, USA & UAE coverage",
      "98% client retention",
    ],
    beaconFlag: "🇬🇧",
    beaconLabel: "London, United Kingdom",
    beaconChips: ["Headquartered in London", "Same timezone", "UK business culture"],
    servicesHeading: "Our Services in the UK",
    whyHeading: "Why UK Businesses Choose Quantel",
    reasons: [
      {
        icon: "fa-solid fa-landmark",
        title: "London Headquartered",
        description:
          "We are based in London — same timezone, same market understanding, same business culture.",
      },
      {
        icon: "fa-solid fa-diagram-project",
        title: "End-to-End Delivery",
        description:
          "From idea to launch, we handle design, development and marketing under one roof.",
      },
      {
        icon: "fa-solid fa-earth-americas",
        title: "Global Reach",
        description:
          "While based in London, we serve clients across USA and UAE — giving you a global technology partner.",
      },
      {
        icon: "fa-solid fa-trophy",
        title: "Proven Track Record",
        description:
          "500+ projects delivered with a 98% client retention rate speaks for itself.",
      },
    ],
    stats: SHARED_STATS,
    ctaHeading: "Ready to Build Your Product in the UK?",
    ctaSubtext: "Talk to our London team today. Free consultation, no commitment.",
    ctaButton: "Book a Free Call",
  },

  /* ----------------------------------------------------------------- UAE */
  {
    slug: "uae",
    flagBadge: "🇦🇪 Serving the UAE & Middle East",
    h1: "Technology Partner for Dubai & UAE Businesses",
    subheadline:
      "Quantel Solutions delivers SaaS platforms, AI automation, web products and white-label software for businesses across Dubai, Abu Dhabi and the wider UAE — from our London headquarters.",
    trustBullets: [
      "UAE clients since day one",
      "Dubai & Abu Dhabi coverage",
      "London-headquartered global team",
      "98% client retention",
    ],
    beaconFlag: "🇦🇪",
    beaconLabel: "Dubai, United Arab Emirates",
    beaconChips: ["Dubai & Abu Dhabi", "English & Arabic ready", "London HQ"],
    servicesHeading: "Our Services in Dubai & UAE",
    whyHeading: "Why UAE Businesses Choose Quantel",
    reasons: [
      {
        icon: "fa-solid fa-map-location-dot",
        title: "UAE Market Experience",
        description:
          "We have delivered projects for UAE clients including LCR and Best Car Rental Dubai — we understand the local market.",
      },
      {
        icon: "fa-solid fa-bolt",
        title: "Fast Turnaround",
        description:
          "Speed matters in the UAE market. We deliver MVPs and full products faster than local agencies.",
      },
      {
        icon: "fa-solid fa-language",
        title: "English & Arabic Ready",
        description:
          "Our web and SaaS products are built with RTL and bilingual support in mind for the UAE market.",
      },
      {
        icon: "fa-solid fa-gem",
        title: "London Quality, UAE Pricing",
        description:
          "London-quality technology delivery at competitive rates tailored for the UAE market.",
      },
    ],
    stats: SHARED_STATS,
    ctaHeading: "Ready to Build Your Product in Dubai?",
    ctaSubtext:
      "Talk to our team today. Free consultation for UAE businesses, no commitment.",
    ctaButton: "Book a Free Call",
  },

  /* ----------------------------------------------------------------- USA */
  {
    slug: "usa",
    flagBadge: "🇺🇸 Serving the United States",
    h1: "Technology & SaaS Partner for US Businesses",
    subheadline:
      "Quantel Solutions builds SaaS platforms, AI products, web applications and white-label software for startups and enterprises across the United States — delivered by our London-based global team.",
    trustBullets: [
      "US clients served across multiple states",
      "London-headquartered global team",
      "Async-friendly — timezone overlap guaranteed",
      "98% client retention",
    ],
    beaconFlag: "🇺🇸",
    beaconLabel: "United States",
    beaconChips: ["East & West Coast overlap", "White-label ready", "London HQ"],
    servicesHeading: "Our Services in the USA",
    whyHeading: "Why US Businesses Choose Quantel",
    reasons: [
      {
        icon: "fa-solid fa-landmark",
        title: "London HQ, Global Standards",
        description:
          "As a London-based company we operate to the highest international standards — exactly what US clients expect.",
      },
      {
        icon: "fa-solid fa-clock",
        title: "Overlap Timezone Coverage",
        description:
          "Our London team provides guaranteed overlap with both East Coast and West Coast US hours every single working day.",
      },
      {
        icon: "fa-solid fa-layer-group",
        title: "White Label Ready",
        description:
          "US agencies and SaaS companies use us as their white-label technology partner — fully rebrandable, fully yours.",
      },
      {
        icon: "fa-solid fa-arrow-trend-up",
        title: "Startup to Enterprise",
        description:
          "We serve US clients from seed-stage startups to established enterprises — scalable delivery at every stage.",
      },
    ],
    stats: SHARED_STATS,
    ctaHeading: "Ready to Build Your Product in the USA?",
    ctaSubtext:
      "Talk to our London team today. Free consultation for US businesses, no commitment.",
    ctaButton: "Book a Free Call",
  },
];

/** All geo slugs, used by getStaticPaths and the sitemap. */
export const GEO_SLUGS = GEO_REGIONS.map((r) => r.slug);

/** Look up a single region by slug. */
export function getGeoRegionBySlug(slug: string): GeoRegion | undefined {
  return GEO_REGIONS.find((r) => r.slug === slug);
}