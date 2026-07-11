/**
 * Single source of truth for the individual, indexable service pages served
 * at /services/<slug>.
 *
 * Each entry drives one statically-generated page (see
 * src/pages/services/[slug].tsx) with its own unique <title>, meta
 * description, canonical URL, OpenGraph/Twitter tags, and Service JSON-LD.
 *
 * COPY NOTE (please review):
 *   - `heroDescription`, the first `intro.paragraphs` sentence, and the
 *     headline `feature` titles are seeded from the original
 *     /services card copy (MarketingServices.tsx) and are accurate.
 *   - The remaining `intro.paragraphs`, the expanded `features` descriptions,
 *     and the per-service `process` steps were newly authored to give each
 *     page genuinely distinct, non-thin content. They are sound and on-brand,
 *     but skim them and tune any specifics (deliverables, timelines, stacks)
 *     to match exactly how your team positions each service.
 *   - No fabricated statistics are used on these pages — the shared
 *     <MarketingCta /> at the bottom carries the conversion ask instead.
 */

export type ServiceFeature = {
  /** FontAwesome class, e.g. "fa-solid fa-cubes-stacked". */
  icon: string;
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
  icon: string;
};

export type Service = {
  /** URL slug — page lives at /services/<slug>. */
  slug: string;
  /** Full service name — used in the H1 and Service schema. */
  name: string;
  /** Short label for breadcrumbs / nav. */
  shortName: string;
  /** FontAwesome icon class (mirrors the marketing-solutions card icon). */
  icon: string;

  /** <title> (without the " | Quantel Solutions" suffix, which is appended). */
  metaTitle: string;
  /** <meta name="description"> — unique per page, ~150–160 chars. */
  metaDescription: string;
  /** Extra keywords appended to the site defaults. */
  keywords: string[];

  /** One-sentence promise shown beside the H1 in the hero banner. */
  heroDescription: string;

  /** Overview section. */
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };

  /** Benefits / "what you get" grid. */
  featuresHeading: string;
  features: ServiceFeature[];

  /** "How we work" steps, tailored to this service. */
  processHeading: string;
  process: ServiceProcessStep[];

  /** Tailored bottom-of-page call to action — distinct per service. */
  cta: ServiceCta;
};

export type ServiceCta = {
  /** Distinct, punchy closing headline. */
  heading: string;
  /** One supporting sentence. */
  subcopy: string;
  /** Service-specific primary action label. */
  primaryLabel: string;
  /** Three short reassurance chips. */
  assurances: string[];
};

export const SERVICES: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "saas-development",
    cta: {
      heading: "Turn your SaaS idea into a product that scales.",
      subcopy:
        "Book a free scoping call and get a written build plan, timeline, and ballpark within 24 hours.",
      primaryLabel: "Scope my SaaS build",
      assurances: ["Fixed-scope MVP", "You own the code", "Senior engineers only"],
    },
    name: "SaaS Product Development",
    shortName: "SaaS Development",
    icon: "fa-solid fa-cubes-stacked",
    metaTitle: "SaaS Product Development Company",
    metaDescription:
      "Expert SaaS development company in the UK. We build secure, scalable multi-tenant SaaS platforms for startups & enterprises. Free consultation available.",
    keywords: [
      "SaaS development company",
      "custom SaaS development",
      "multi-tenant SaaS",
      "SaaS MVP development UK",
      "subscription software development",
    ],
    heroDescription:
      "From idea to production-ready platform - we architect and build multi-tenant SaaS products engineered to grow from your first customer to your thousandth.",
    intro: {
      eyebrow: "SaaS Engineering",
      heading: "Production-grade SaaS, built to scale and ship revenue",
      paragraphs: [
        "We architect and build multi-tenant SaaS products end to end - subscriptions, billing, role-based access, and scalable cloud infrastructure - engineered to grow from your first customer to your thousandth without a rewrite.",
        "Whether you are validating a brand-new product or hardening an existing platform for serious growth, we work in short, demoable sprints so you see working software early and often. You get clean architecture, sensible documentation, and a codebase your own team can own with confidence.",
      ],
    },
    featuresHeading: "What goes into your SaaS platform",
    features: [
      {
        icon: "fa-solid fa-sitemap",
        title: "Multi-tenant architecture",
        description:
          "Secure tenant isolation, role-based access, and an authentication layer that keeps every customer's data separate and safe by design.",
      },
      {
        icon: "fa-solid fa-credit-card",
        title: "Subscription billing & metering",
        description:
          "Plans, trials, proration, and usage-based metering wired into Stripe or your provider of choice - so revenue collection just works.",
      },
      {
        icon: "fa-solid fa-cloud",
        title: "Cloud-native infrastructure",
        description:
          "Auto-scaling, observable infrastructure on AWS, GCP, or Azure that handles spikes without you paying for idle capacity.",
      },
      {
        icon: "fa-solid fa-gauge-high",
        title: "Performance & reliability",
        description:
          "Fast load times, sensible caching, and uptime monitoring baked in from day one - not bolted on after the first outage.",
      },
      {
        icon: "fa-solid fa-plug",
        title: "Integrations & APIs",
        description:
          "A clean public/internal API and the third-party integrations your customers expect, documented so partners can build on top of you.",
      },
      {
        icon: "fa-solid fa-shield-halved",
        title: "Security & compliance",
        description:
          "Encryption, audit logging, and a security posture ready for the GDPR, SOC 2, or enterprise procurement questions that follow growth.",
      },
    ],
    processHeading: "How we build your SaaS product",
    process: [
      {
        title: "Discovery & architecture",
        description:
          "We pressure-test the idea, map the data model and tenancy approach, and agree the scope of a lean, valuable v1 before any code is written.",
        icon: "fa-solid fa-compass",
      },
      {
        title: "Design & prototype",
        description:
          "Clickable flows and a design system so you can feel the product - and we can de-risk the hard journeys - before full build.",
        icon: "fa-solid fa-pen-ruler",
      },
      {
        title: "Build in sprints",
        description:
          "Two-week sprints with working demos. You steer priorities continuously instead of waiting months for one big reveal.",
        icon: "fa-solid fa-rocket",
      },
      {
        title: "Launch & scale",
        description:
          "We ship to production, set up monitoring and CI/CD, then support and harden the platform as your customer base grows.",
        icon: "fa-solid fa-chart-line",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "white-label-solutions",
    cta: {
      heading: "Put your brand on a platform that's ready to sell.",
      subcopy:
        "Tell us your market and we'll show you what your white-label product could look like - and how fast it ships.",
      primaryLabel: "See it in my brand",
      assurances: ["Live in weeks", "100% your branding", "Lower upfront cost"],
    },
    name: "White-Label Solutions",
    shortName: "White-Label Platforms",
    icon: "fa-solid fa-layer-group",
    metaTitle: "White-Label Software Solutions",
    metaDescription:
      "White label software solutions UK. Rebrandable SaaS, CRM, ERP & e-commerce products ready to launch under your brand in weeks. Talk to us today.",
    keywords: [
      "white label software",
      "white label CRM",
      "white label platform development",
      "rebrandable software",
      "white label e-commerce",
    ],
    heroDescription:
      "Launch faster with proven, ready-to-brand platforms - CRM, ERP, LMS, and e-commerce you can ship under your own name and take to market in weeks.",
    intro: {
      eyebrow: "White-Label Platforms",
      heading: "Your brand, our engine - to market in weeks, not years",
      paragraphs: [
        "We deliver white-label CRM, ERP, LMS, and e-commerce products you can ship under your own name - fully customised to your workflows, your branding, and your domains, then taken to market in weeks rather than years.",
        "Instead of funding a multi-year build from scratch, you start from a proven, maintained core and we tailor the parts that make it yours. That means a faster path to revenue, a far lower upfront cost, and a product your customers experience as 100% your own.",
      ],
    },
    featuresHeading: "What's included in a white-label build",
    features: [
      {
        icon: "fa-solid fa-paintbrush",
        title: "Full brand customisation",
        description:
          "Your logo, colours, typography, and design system applied throughout - plus your own domains and email so nothing reads as third-party.",
      },
      {
        icon: "fa-solid fa-sliders",
        title: "Workflow configuration",
        description:
          "We adapt fields, roles, pipelines, and automations to the way your business actually operates, not a generic template.",
      },
      {
        icon: "fa-solid fa-bolt",
        title: "Rapid time-to-market",
        description:
          "A maintained core means launch in weeks. You capture customers while competitors are still scoping their build.",
      },
      {
        icon: "fa-solid fa-users-gear",
        title: "CRM, ERP, LMS & commerce",
        description:
          "Choose the platform that fits your market - or combine modules - all delivered under a single, consistent brand experience.",
      },
      {
        icon: "fa-solid fa-arrows-up-to-line",
        title: "Scalable & maintainable",
        description:
          "Built on a stable foundation with upgrade paths, so you benefit from ongoing improvements without re-platforming.",
      },
      {
        icon: "fa-solid fa-headset",
        title: "Handover & support",
        description:
          "Training, documentation, and an ongoing support option so your team can sell and run the product with confidence.",
      },
    ],
    processHeading: "How we deliver your white-label platform",
    process: [
      {
        title: "Fit & scope",
        description:
          "We confirm which platform fits your market and map the customisations that matter - so you only pay to change what makes you distinct.",
        icon: "fa-solid fa-clipboard-check",
      },
      {
        title: "Brand & configure",
        description:
          "We apply your identity end to end and configure workflows, roles, and automations around your processes.",
        icon: "fa-solid fa-palette",
      },
      {
        title: "Integrate & test",
        description:
          "Payment, data, and tooling integrations are wired in and tested against real scenarios before anyone goes live.",
        icon: "fa-solid fa-vials",
      },
      {
        title: "Launch & enable",
        description:
          "We deploy under your domains, train your team, and stay available to support the rollout and future enhancements.",
        icon: "fa-solid fa-flag-checkered",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ai-automation",
    cta: {
      heading: "Find the busywork AI can take off your team's plate.",
      subcopy:
        "Book a free audit and we'll pinpoint your highest-ROI automation - then prove it on your real data.",
      primaryLabel: "Find my AI quick wins",
      assurances: ["Proof on your data", "No hype, real ROI", "Governed & safe"],
    },
    name: "AI & Automation",
    shortName: "AI & Automation",
    icon: "fa-solid fa-microchip-ai",
    metaTitle: "AI & Automation Solutions",
    metaDescription:
      "AI automation company UK. We build AI chatbots, LLM integrations & workflow automation for businesses across the UK, USA & UAE. Book a free call.",
    keywords: [
      "AI solutions",
      "AI automation services",
      "LLM development",
      "workflow automation",
      "custom AI chatbot development",
    ],
    heroDescription:
      "Stop losing time to manual busywork - we deploy practical AI and automation that keeps your business running around the clock and your team focused on growth.",
    intro: {
      eyebrow: "AI & Automation",
      heading: "Practical AI that moves real business metrics",
      paragraphs: [
        "We deploy practical AI - LLM-powered copilots, chatbots, predictive analytics, and workflow automation - that keeps your business running around the clock and frees your team from manual busywork.",
        "We start from the outcome, not the hype: which tasks are slow, error-prone, or expensive today, and where AI genuinely earns its place. Then we build, integrate, and measure - so you get tools your team actually adopts and a clear line from spend to saved hours and revenue.",
      ],
    },
    featuresHeading: "Where AI earns its place in your business",
    features: [
      {
        icon: "fa-solid fa-robot",
        title: "LLM copilots & assistants",
        description:
          "Custom assistants grounded in your own data that draft, summarise, and answer - so your team gets expert help in seconds.",
      },
      {
        icon: "fa-solid fa-comments",
        title: "Chatbots & support automation",
        description:
          "Always-on chat that resolves common questions, qualifies leads, and hands off cleanly to a human when it matters.",
      },
      {
        icon: "fa-solid fa-chart-line",
        title: "Predictive analytics",
        description:
          "Forecasting and scoring models that turn the data you already collect into decisions you can act on ahead of time.",
      },
      {
        icon: "fa-solid fa-diagram-project",
        title: "Workflow automation",
        description:
          "We connect your tools and remove the manual hand-offs between them, eliminating copy-paste work and the errors it causes.",
      },
      {
        icon: "fa-solid fa-file-lines",
        title: "Document intelligence",
        description:
          "Extract, classify, and route information from invoices, contracts, and forms - no more manual data entry.",
      },
      {
        icon: "fa-solid fa-shield-halved",
        title: "Safe, governed deployment",
        description:
          "Guardrails, evaluation, and access controls so AI is reliable, on-brand, and respectful of your data and customers.",
      },
    ],
    processHeading: "How we deliver AI that sticks",
    process: [
      {
        title: "Opportunity audit",
        description:
          "We map your workflows and data to find the highest-ROI use cases - and honestly flag where AI isn't the right tool.",
        icon: "fa-solid fa-magnifying-glass",
      },
      {
        title: "Prototype & validate",
        description:
          "A working proof of concept on your real data proves value fast, before any large commitment.",
        icon: "fa-solid fa-flask",
      },
      {
        title: "Build & integrate",
        description:
          "We harden the solution, add guardrails and evaluation, and embed it into the tools your team already uses.",
        icon: "fa-solid fa-gears",
      },
      {
        title: "Measure & improve",
        description:
          "We track time saved and accuracy, then refine prompts, models, and flows so results compound over time.",
        icon: "fa-solid fa-gauge-high",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "web-development",
    cta: {
      heading: "Get a website that loads fast and wins leads.",
      subcopy:
        "Share your goals and we'll come back with a plan to make your site quicker, cleaner, and better at converting.",
      primaryLabel: "Plan my new site",
      assurances: [
        "Core Web Vitals in the green",
        "SEO-ready build",
        "Accessible by default",
      ],
    },
    name: "Web Development",
    shortName: "Web Development",
    icon: "fa-solid fa-code",
    metaTitle: "Web Development Services",
    metaDescription:
      "Web development agency in London. Fast, SEO-ready custom websites & web apps built for performance across the UK, USA & UAE. Get a free quote today.",
    keywords: [
      "web development services",
      "web app development",
      "Next.js development agency",
      "custom website development UK",
      "headless CMS development",
    ],
    heroDescription:
      "Your website and web apps should work as hard as your team - we build fast, beautiful, SEO-ready platforms engineered for performance and conversion.",
    intro: {
      eyebrow: "Web Engineering",
      heading: "Websites and web apps engineered to convert",
      paragraphs: [
        "We build fast, beautiful, SEO-ready platforms on modern frameworks - engineered for performance, accessibility, and conversion across every market you serve.",
        "A site that loads slowly or buries its message quietly loses customers every day. We obsess over Core Web Vitals, clean semantic markup, and conversion-focused UX, so your web presence does more than look good - it earns rankings, builds trust, and turns visitors into enquiries.",
      ],
    },
    featuresHeading: "What we build for the web",
    features: [
      {
        icon: "fa-solid fa-window-maximize",
        title: "Marketing sites & landing pages",
        description:
          "High-converting, fast-loading sites with clear messaging and CTAs - built to rank and to turn traffic into leads.",
      },
      {
        icon: "fa-solid fa-layer-group",
        title: "Web apps & SaaS front-ends",
        description:
          "Robust, maintainable interfaces in React/Next.js that stay snappy as features and data grow.",
      },
      {
        icon: "fa-solid fa-pen-nib",
        title: "Headless CMS",
        description:
          "Edit content without touching code, on a headless CMS that keeps your marketing team fast and your site secure.",
      },
      {
        icon: "fa-solid fa-gauge-high",
        title: "Core Web Vitals & SEO",
        description:
          "Performance budgets, semantic HTML, and technical SEO built in - so Google and your visitors both load fast.",
      },
      {
        icon: "fa-solid fa-universal-access",
        title: "Accessibility",
        description:
          "WCAG-minded markup and keyboard support so every visitor can use your site - and you stay on the right side of compliance.",
      },
      {
        icon: "fa-solid fa-plug",
        title: "Integrations",
        description:
          "Analytics, CRM, payments, and the third-party tools your business runs on, wired in cleanly and reliably.",
      },
    ],
    processHeading: "How we deliver your website",
    process: [
      {
        title: "Strategy & wireframes",
        description:
          "We define goals, audiences, and the journeys that matter, then wireframe the pages that drive them.",
        icon: "fa-solid fa-compass-drafting",
      },
      {
        title: "Design",
        description:
          "On-brand, conversion-focused design and a reusable component system that scales across the site.",
        icon: "fa-solid fa-pen-ruler",
      },
      {
        title: "Build & optimise",
        description:
          "Clean, fast, accessible front-end engineering with performance and SEO baked in from the first commit.",
        icon: "fa-solid fa-code",
      },
      {
        title: "Launch & iterate",
        description:
          "We ship, monitor real-world performance, and refine based on analytics so the site keeps improving.",
        icon: "fa-solid fa-arrow-trend-up",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "seo",
    cta: {
      heading: "Claim the rankings your competitors are taking.",
      subcopy:
        "Get a free SEO audit that shows exactly where you're losing traffic - and the fastest way to win it back.",
      primaryLabel: "Get my free SEO audit",
      assurances: ["No lock-in contracts", "Reporting tied to revenue", "Technical + content"],
    },
    name: "Search Engine Optimisation",
    shortName: "SEO",
    icon: "fa-solid fa-magnifying-glass-chart",
    metaTitle: "SEO Services - Search Engine Optimisation",
    metaDescription:
      "SEO services UK. Technical SEO, intent-driven content & authoritative link building that earn page-one rankings for your buyers. Get a free audit.",
    keywords: [
      "SEO services",
      "search engine optimisation agency",
      "technical SEO",
      "international SEO",
      "content and link building",
    ],
    heroDescription:
      "Most businesses are invisible to their best buyers on Google - we fix that with technical SEO, intent-driven content, and authoritative link building.",
    intro: {
      eyebrow: "Search Engine Optimisation",
      heading: "Rankings that compound in value every month",
      paragraphs: [
        "Through technical SEO, intent-driven content, and authoritative link building, we earn you page-one rankings that compound in value every single month - not a one-off spike that fades.",
        "SEO is the rare channel where the asset you build keeps paying out. We fix the technical foundations search engines reward, target the keywords your buyers actually search, and earn the authority that makes you the obvious choice - so your cost per lead falls as your visibility climbs.",
      ],
    },
    featuresHeading: "What our SEO programme covers",
    features: [
      {
        icon: "fa-solid fa-screwdriver-wrench",
        title: "Technical SEO audits",
        description:
          "We find and fix crawl, indexation, and structure issues quietly holding your rankings back.",
      },
      {
        icon: "fa-solid fa-gauge-high",
        title: "Core Web Vitals",
        description:
          "Speed and stability fixes that improve both rankings and the experience of every visitor who lands.",
      },
      {
        icon: "fa-solid fa-file-pen",
        title: "Content strategy",
        description:
          "Intent-mapped content that answers what your buyers search - and earns the clicks your competitors miss.",
      },
      {
        icon: "fa-solid fa-link",
        title: "Authoritative link building",
        description:
          "Genuine, relevant links that build the domain authority Google uses to decide who ranks.",
      },
      {
        icon: "fa-solid fa-earth-americas",
        title: "International & multi-region",
        description:
          "Hreflang, localisation, and market-specific strategy so you rank in every country you sell into.",
      },
      {
        icon: "fa-solid fa-chart-pie",
        title: "Transparent reporting",
        description:
          "Clear dashboards tying rankings and traffic to leads and revenue - never vanity metrics.",
      },
    ],
    processHeading: "How our SEO process works",
    process: [
      {
        title: "Audit & research",
        description:
          "A full technical, content, and competitor audit pinpoints exactly where your growth is leaking.",
        icon: "fa-solid fa-magnifying-glass",
      },
      {
        title: "Fix the foundations",
        description:
          "We resolve technical issues and Core Web Vitals first, so every later effort compounds on solid ground.",
        icon: "fa-solid fa-screwdriver-wrench",
      },
      {
        title: "Create & earn",
        description:
          "We publish intent-driven content and build authoritative links to win the rankings that matter.",
        icon: "fa-solid fa-pen-fancy",
      },
      {
        title: "Measure & compound",
        description:
          "We double down on what's working each month, so rankings and qualified traffic keep climbing.",
        icon: "fa-solid fa-arrow-trend-up",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "social-media-marketing",
    cta: {
      heading: "Turn the scroll into a steady stream of leads.",
      subcopy:
        "Book a free strategy session and we'll map the content and campaigns that fit your audience and budget.",
      primaryLabel: "Plan my social strategy",
      assurances: ["Built around your goals", "Creative included", "Leads, not just likes"],
    },
    name: "Social Media Marketing",
    shortName: "Social Media Marketing",
    icon: "fa-solid fa-share-nodes",
    metaTitle: "Social Media Marketing Agency",
    metaDescription:
      "Social media marketing agency UK. Strategy, content & paid campaigns on Meta, LinkedIn & TikTok that convert followers into customers. Book a call.",
    keywords: [
      "social media marketing agency",
      "paid social campaigns",
      "social media management",
      "Meta and LinkedIn ads",
      "content marketing services",
    ],
    heroDescription:
      "Your audience is scrolling right now - we handle strategy, content, paid campaigns, and community so your brand builds trust and converts followers into customers.",
    intro: {
      eyebrow: "Social Media Marketing",
      heading: "Show up where your customers already spend their time",
      paragraphs: [
        "We handle strategy, content, paid campaigns, and community management - so your brand shows up where your audience already is, building trust and converting followers into customers while you focus on running your business.",
        "Posting consistently isn't a strategy. We start with who you're trying to reach and what makes them act, then build a content engine and paid programme that work together - turning attention into a measurable pipeline of leads and sales, not just likes.",
      ],
    },
    featuresHeading: "What we run for your brand",
    features: [
      {
        icon: "fa-solid fa-bullhorn",
        title: "Paid social campaigns",
        description:
          "Meta, LinkedIn, and TikTok campaigns built around clear objectives, tested relentlessly, and optimised for cost per result.",
      },
      {
        icon: "fa-solid fa-calendar-days",
        title: "Content calendars",
        description:
          "A consistent, on-brand posting cadence planned ahead so your channels never go quiet.",
      },
      {
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "Creative & copywriting",
        description:
          "Scroll-stopping creative and copy crafted for each platform - because what works on LinkedIn won't work on TikTok.",
      },
      {
        icon: "fa-solid fa-comments",
        title: "Community management",
        description:
          "We engage, reply, and nurture your audience so followers feel heard and trust builds over time.",
      },
      {
        icon: "fa-solid fa-handshake",
        title: "Influencer sourcing",
        description:
          "We find and brief the right creators to put your brand in front of audiences that already trust them.",
      },
      {
        icon: "fa-solid fa-chart-column",
        title: "Performance reporting",
        description:
          "Clear reporting on reach, engagement, and - most importantly - the leads and sales your social drives.",
      },
    ],
    processHeading: "How we grow your social presence",
    process: [
      {
        title: "Audience & strategy",
        description:
          "We define who you're reaching, the platforms that fit, and the message that moves them to act.",
        icon: "fa-solid fa-people-group",
      },
      {
        title: "Create",
        description:
          "We produce platform-native content and ad creative on a planned calendar, ready to test.",
        icon: "fa-solid fa-palette",
      },
      {
        title: "Launch & amplify",
        description:
          "Organic and paid go live together, with budget focused on the formats and audiences that convert.",
        icon: "fa-solid fa-rocket",
      },
      {
        title: "Optimise",
        description:
          "We shift spend to top performers each cycle, lowering cost per lead as the programme matures.",
        icon: "fa-solid fa-sliders",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mobile-app-development",
    cta: {
      heading: "Build an app your customers reach for daily.",
      subcopy:
        "Tell us your idea and we'll outline the fastest route to a polished iOS and Android app from one codebase.",
      primaryLabel: "Scope my app",
      assurances: ["iOS + Android, one build", "Store launch handled", "Built to scale"],
    },
    name: "Mobile App Development",
    shortName: "Mobile App Development",
    icon: "fa-solid fa-mobile-screen",
    metaTitle: "Mobile App Development Company",
    metaDescription:
      "Mobile app development in London. Cross-platform iOS & Android apps built by expert developers for UK, USA & UAE clients. Get a free quote today.",
    keywords: [
      "mobile app development company",
      "iOS app development",
      "Android app development",
      "React Native development",
      "Flutter app development",
    ],
    heroDescription:
      "A great mobile experience turns one-time buyers into loyal customers - we design and build cross-platform iOS and Android apps that are fast to market and built to scale.",
    intro: {
      eyebrow: "Mobile App Development",
      heading: "Apps your customers reach for every day",
      paragraphs: [
        "We design and build cross-platform iOS and Android apps that are fast to market, intuitive to use, and built to scale as your business grows.",
        "A native-quality app earns a place on the home screen and keeps your brand a tap away. Using a single React Native or Flutter codebase, we ship to both platforms faster and cheaper than two native builds - without compromising on the smooth, responsive feel users expect.",
      ],
    },
    featuresHeading: "What goes into your mobile app",
    features: [
      {
        icon: "fa-solid fa-mobile-screen-button",
        title: "iOS & Android from one codebase",
        description:
          "React Native or Flutter gets you both platforms from a single, maintainable codebase - faster and more cost-effective.",
      },
      {
        icon: "fa-solid fa-store",
        title: "App Store & Play launch",
        description:
          "We manage store listings, review, and release so your app ships smoothly and stays compliant.",
      },
      {
        icon: "fa-solid fa-bell",
        title: "Push notifications",
        description:
          "Timely, relevant notifications that bring users back and lift retention without becoming noise.",
      },
      {
        icon: "fa-solid fa-credit-card",
        title: "In-app payments",
        description:
          "Subscriptions and one-off purchases wired into the platforms' payment systems and your billing.",
      },
      {
        icon: "fa-solid fa-chart-simple",
        title: "Analytics & insight",
        description:
          "Event tracking and funnels so you see how people actually use the app - and where to improve it.",
      },
      {
        icon: "fa-solid fa-wifi",
        title: "Offline & performance",
        description:
          "Smooth, responsive interactions and sensible offline behaviour so the app feels great on any connection.",
      },
    ],
    processHeading: "How we build your app",
    process: [
      {
        title: "Define & design",
        description:
          "We scope the core experience and design intuitive flows that respect each platform's conventions.",
        icon: "fa-solid fa-pen-ruler",
      },
      {
        title: "Prototype",
        description:
          "An interactive prototype lets you feel the app and refine the key journeys before full build.",
        icon: "fa-solid fa-vr-cardboard",
      },
      {
        title: "Build & test",
        description:
          "We develop in sprints with testing on real devices, so quality is continuous, not a final scramble.",
        icon: "fa-solid fa-mobile-screen",
      },
      {
        title: "Launch & grow",
        description:
          "We handle store submission, then support updates, analytics review, and feature iteration post-launch.",
        icon: "fa-solid fa-rocket",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "custom-software",
    cta: {
      heading: "Replace the spreadsheets and workarounds for good.",
      subcopy:
        "Walk us through your workflow and we'll show you what purpose-built software could do for it.",
      primaryLabel: "Map my workflow",
      assurances: ["Built around you", "Connects your tools", "Documented & yours"],
    },
    name: "Custom Software Solutions",
    shortName: "Custom Software",
    icon: "fa-solid fa-puzzle-piece",
    metaTitle: "Custom Software Development",
    metaDescription:
      "Custom software development UK. Bespoke internal tools, portals & system integrations built around the exact workflows you run. Get a free consult.",
    keywords: [
      "custom software development",
      "bespoke software",
      "internal tools development",
      "system integration services",
      "legacy system modernisation",
    ],
    heroDescription:
      "Off-the-shelf tools weren't built for your business - yours was. We design bespoke software around the exact workflows, rules, and processes that make your operation run.",
    intro: {
      eyebrow: "Custom Software",
      heading: "Software shaped around how you actually work",
      paragraphs: [
        "We design and develop bespoke software around the exact workflows, rules, and processes that make your operation run - replacing spreadsheets and workarounds for good.",
        "When your business has outgrown generic tools, the gaps cost you real time and money every week. We build software that fits like a glove: internal tools, customer portals, and integrations that connect the systems you already use - so your team stops fighting their tools and starts moving faster.",
      ],
    },
    featuresHeading: "What we build for you",
    features: [
      {
        icon: "fa-solid fa-table-columns",
        title: "Internal tools & dashboards",
        description:
          "Custom admin panels and dashboards that give your team the exact controls and visibility they need.",
      },
      {
        icon: "fa-solid fa-door-open",
        title: "Customer & partner portals",
        description:
          "Secure self-service portals that reduce support load and give your customers a polished experience.",
      },
      {
        icon: "fa-solid fa-plug-circle-bolt",
        title: "System integrations",
        description:
          "We connect your CRM, accounting, and operational tools so data flows automatically instead of by copy-paste.",
      },
      {
        icon: "fa-solid fa-arrows-rotate",
        title: "Legacy modernisation",
        description:
          "We migrate and rebuild ageing systems onto a modern, maintainable stack - without losing your data or institutional knowledge.",
      },
      {
        icon: "fa-solid fa-diagram-project",
        title: "Workflow automation",
        description:
          "We codify your business rules so repetitive, error-prone processes run reliably on their own.",
      },
      {
        icon: "fa-solid fa-code-branch",
        title: "Maintainable, documented code",
        description:
          "Clean architecture and documentation so the software remains an asset your team can extend, not a black box.",
      },
    ],
    processHeading: "How we deliver custom software",
    process: [
      {
        title: "Discover the workflow",
        description:
          "We learn how your business really works, then map the processes the software needs to serve.",
        icon: "fa-solid fa-magnifying-glass",
      },
      {
        title: "Design the solution",
        description:
          "We scope a pragmatic v1, design the data model and interface, and agree priorities before building.",
        icon: "fa-solid fa-pen-ruler",
      },
      {
        title: "Build iteratively",
        description:
          "We deliver in sprints with working demos so the software is shaped by your feedback throughout.",
        icon: "fa-solid fa-gears",
      },
      {
        title: "Deploy & support",
        description:
          "We roll out with training and documentation, then support and evolve the system as you grow.",
        icon: "fa-solid fa-headset",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ecommerce-solutions",
    cta: {
      heading: "Turn more of your traffic into completed orders.",
      subcopy:
        "Get a free store teardown that shows where you're losing buyers - and the quickest wins to recover them.",
      primaryLabel: "Get my store teardown",
      assurances: ["Checkout that converts", "Cart recovery built in", "Shopify & Woo experts"],
    },
    name: "Ecommerce Solutions",
    shortName: "Ecommerce Solutions",
    icon: "fa-solid fa-bag-shopping",
    metaTitle: "Ecommerce Development & Optimisation",
    metaDescription:
      "Ecommerce development company UK. Custom Shopify & WooCommerce stores engineered to convert across the UK, USA & UAE. Get a free quote today.",
    keywords: [
      "ecommerce development",
      "Shopify development agency",
      "WooCommerce development",
      "conversion rate optimisation",
      "online store development UK",
    ],
    heroDescription:
      "An online store that looks good but doesn't sell is just an expensive brochure - we build and optimise storefronts engineered for global buyers and a frictionless checkout.",
    intro: {
      eyebrow: "Ecommerce Solutions",
      heading: "Storefronts engineered to sell, not just to look good",
      paragraphs: [
        "We build and optimise Shopify, WooCommerce, and custom storefronts engineered for global buyers - from product discovery to a frictionless checkout.",
        "Most stores leak revenue at every step: slow pages, confusing navigation, and a checkout that loses buyers at the last moment. We design for the whole journey and obsess over conversion, so more of the traffic you already have turns into completed orders.",
      ],
    },
    featuresHeading: "What we build and optimise",
    features: [
      {
        icon: "fa-brands fa-shopify",
        title: "Shopify & WooCommerce",
        description:
          "Expertly built and themed stores on the platforms that fit your catalogue, team, and budget.",
      },
      {
        icon: "fa-solid fa-credit-card",
        title: "Payment integrations",
        description:
          "Stripe, PayPal, Apple Pay, and local methods so customers can pay the way they prefer, wherever they are.",
      },
      {
        icon: "fa-solid fa-cart-arrow-down",
        title: "Conversion-rate optimisation",
        description:
          "We test and refine product pages, navigation, and checkout to lift the share of visitors who buy.",
      },
      {
        icon: "fa-solid fa-cart-flatbed",
        title: "Abandoned cart recovery",
        description:
          "Automated flows that win back shoppers who left at checkout - some of your easiest revenue to recover.",
      },
      {
        icon: "fa-solid fa-magnifying-glass",
        title: "Search & discovery",
        description:
          "Fast search, clear filtering, and merchandising that help buyers find the right product quickly.",
      },
      {
        icon: "fa-solid fa-truck-fast",
        title: "Shipping & operations",
        description:
          "Tax, shipping, and fulfilment integrations that keep your back office running as orders scale.",
      },
    ],
    processHeading: "How we grow your store",
    process: [
      {
        title: "Audit & plan",
        description:
          "We review your store and funnel to find where revenue leaks, then prioritise the highest-impact fixes.",
        icon: "fa-solid fa-clipboard-list",
      },
      {
        title: "Design & build",
        description:
          "We craft a fast, on-brand storefront optimised around the journey from discovery to checkout.",
        icon: "fa-solid fa-pen-ruler",
      },
      {
        title: "Integrate & launch",
        description:
          "Payments, shipping, and analytics are wired in and tested, then the store goes live.",
        icon: "fa-solid fa-rocket",
      },
      {
        title: "Optimise & scale",
        description:
          "We run ongoing CRO and recovery flows so conversion and average order value keep climbing.",
        icon: "fa-solid fa-arrow-trend-up",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "erp-solutions",
    cta: {
      heading: "Connect your operation into a single live view.",
      subcopy:
        "Book a free consultation and we'll map how an ERP could remove the manual work between your teams.",
      primaryLabel: "Plan my ERP rollout",
      assurances: ["Right-sized for you", "Clean data migration", "Training included"],
    },
    name: "ERP Solutions",
    shortName: "ERP Solutions",
    icon: "fa-solid fa-network-wired",
    metaTitle: "ERP Solutions & Implementation",
    metaDescription:
      "ERP solutions & implementation UK. Connect finance, operations, inventory & people into one real-time source of truth. Book a free consultation.",
    keywords: [
      "ERP solutions",
      "ERP implementation",
      "ERP integration services",
      "business systems integration",
      "ERP migration",
    ],
    heroDescription:
      "Disconnected systems quietly cost you time and money - we implement and integrate ERP solutions that connect your whole operation into a single source of truth.",
    intro: {
      eyebrow: "ERP Solutions",
      heading: "One source of truth across your whole operation",
      paragraphs: [
        "We implement and integrate ERP solutions that connect finance, operations, inventory, and people into a single source of truth - so decisions get faster and errors disappear.",
        "When teams work from separate spreadsheets and disconnected tools, data drifts, reconciliations eat hours, and leaders make decisions on numbers that are already stale. A well-implemented ERP ends that - giving everyone one accurate, real-time view and automating the hand-offs between departments.",
      ],
    },
    featuresHeading: "What an ERP engagement covers",
    features: [
      {
        icon: "fa-solid fa-list-check",
        title: "Selection & deployment",
        description:
          "We help you choose the right ERP for your size and sector, then configure and deploy it properly.",
      },
      {
        icon: "fa-solid fa-puzzle-piece",
        title: "Custom modules & workflows",
        description:
          "We tailor and extend the ERP to your processes instead of forcing your business into a rigid template.",
      },
      {
        icon: "fa-solid fa-plug-circle-bolt",
        title: "Integrations",
        description:
          "We connect the ERP to your CRM, e-commerce, and finance tools so data flows in one direction of truth.",
      },
      {
        icon: "fa-solid fa-database",
        title: "Data migration",
        description:
          "We move your historical data across cleanly and accurately, with validation so nothing is lost or duplicated.",
      },
      {
        icon: "fa-solid fa-chart-line",
        title: "Reporting & dashboards",
        description:
          "Real-time dashboards that turn connected data into the operational and financial insight leaders need.",
      },
      {
        icon: "fa-solid fa-chalkboard-user",
        title: "Training & support",
        description:
          "Hands-on training and ongoing support so adoption sticks and the system keeps delivering value.",
      },
    ],
    processHeading: "How we implement your ERP",
    process: [
      {
        title: "Assess & map",
        description:
          "We map your processes and data across departments to define exactly what the ERP must deliver.",
        icon: "fa-solid fa-compass",
      },
      {
        title: "Configure & extend",
        description:
          "We set up the platform, build the custom modules you need, and integrate your existing tools.",
        icon: "fa-solid fa-gears",
      },
      {
        title: "Migrate & validate",
        description:
          "We migrate data carefully and test against real scenarios, so go-live is smooth and trusted.",
        icon: "fa-solid fa-database",
      },
      {
        title: "Train & support",
        description:
          "We train your teams, support the rollout, and refine the system as your operation evolves.",
        icon: "fa-solid fa-headset",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ui-ux-design",
    cta: {
      heading: "Make every screen feel effortless to use.",
      subcopy:
        "Share your product and we'll show you where users get stuck - and how thoughtful design fixes it.",
      primaryLabel: "Review my product",
      assurances: ["Research-led", "Tested with real users", "Dev-ready handoff"],
    },
    name: "UI / UX Design",
    shortName: "UI / UX Design",
    icon: "fa-solid fa-palette",
    metaTitle: "UI / UX Design Services",
    metaDescription:
      "UI/UX design services UK. Research-led product design, prototypes & design systems that make every screen effortless. Book a free design review.",
    keywords: [
      "UI UX design services",
      "product design agency",
      "user experience design",
      "design systems",
      "UX research and prototyping",
    ],
    heroDescription:
      "Users who find your product confusing will leave - and never tell you why. Our research-led design creates interfaces that feel effortless and build trust instantly.",
    intro: {
      eyebrow: "UI / UX Design",
      heading: "Interfaces that feel effortless and earn trust",
      paragraphs: [
        "Our research-led design process maps real user behaviour to create interfaces that feel effortless, build trust instantly, and drive the actions your business needs.",
        "Good design is invisible - users simply get what they came for. We ground every decision in research rather than guesswork, then craft and test the experience so friction disappears and the right actions become the obvious ones. The result is higher conversion, fewer support tickets, and a product people genuinely enjoy using.",
      ],
    },
    featuresHeading: "What our design work delivers",
    features: [
      {
        icon: "fa-solid fa-users-viewfinder",
        title: "User research & personas",
        description:
          "We learn who your users are and what they're trying to do, so design solves real problems, not assumed ones.",
      },
      {
        icon: "fa-solid fa-route",
        title: "Journey mapping",
        description:
          "We map the full experience to find the friction points quietly costing you conversions.",
      },
      {
        icon: "fa-solid fa-vector-square",
        title: "Wireframes & prototypes",
        description:
          "Hi-fidelity prototypes let you and your users experience the product before a line of code is written.",
      },
      {
        icon: "fa-solid fa-flask-vial",
        title: "Usability testing",
        description:
          "We test designs with real users and iterate, so you launch with evidence instead of opinions.",
      },
      {
        icon: "fa-solid fa-swatchbook",
        title: "Design systems",
        description:
          "A reusable component library that keeps your product consistent and your team shipping faster.",
      },
      {
        icon: "fa-solid fa-handshake-angle",
        title: "Developer handoff",
        description:
          "Clean, well-documented handoff so engineering builds exactly what was designed - no guesswork.",
      },
    ],
    processHeading: "How our design process works",
    process: [
      {
        title: "Research",
        description:
          "We study your users and goals, building the strategic foundation every design decision rests on.",
        icon: "fa-solid fa-magnifying-glass",
      },
      {
        title: "Wireframe",
        description:
          "We structure the experience and information flow before adding visual polish, so the bones are right.",
        icon: "fa-solid fa-vector-square",
      },
      {
        title: "Design & prototype",
        description:
          "We craft the high-fidelity interface and an interactive prototype you can click through and feel.",
        icon: "fa-solid fa-pen-nib",
      },
      {
        title: "Test & hand off",
        description:
          "We validate with users, refine, and hand off a documented design system ready to build.",
        icon: "fa-solid fa-clipboard-check",
      },
    ],
  },
];

/** All slugs, used by getStaticPaths and the sitemap. */
export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

/** Look up a single service by slug. */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
