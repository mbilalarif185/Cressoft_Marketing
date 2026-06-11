import React, { useState } from "react";
import Link from "next/link";

type Service = {
  num: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
};

// Mirrors the SERVICES list in HomeTwoOffer.tsx (lines 14-25) — same numbers
// and titles, enriched with the marketing copy this page needs.
// const SERVICES: Service[] = [
//   {
//     num: "01",
//     icon: "fa-solid fa-microchip-ai",
//     title: "AI Solutions",
//     description:
//       "Practical AI — chatbots, predictive analytics and workflow automation that move real business metrics.",
//     bullets: [
//       "Custom AI chatbots & assistants",
//       "Predictive analytics & forecasting",
//       "Workflow & document automation",
//     ],
//   },
//   {
//     num: "02",
//     icon: "fa-solid fa-code",
//     title: "Web Development",
//     description:
//       "Fast, scalable web platforms built on modern frameworks — engineered for speed, SEO and conversion.",
//     bullets: [
//       "Marketing sites & landing pages",
//       "Web apps & SaaS platforms",
//       "Headless CMS integrations",
//     ],
//   },
//   {
//     num: "03",
//     icon: "fa-solid fa-robot",
//     title: "Search Engine Optimization",
//     description:
//       "Generative AI products — from RAG-powered knowledge bases to bespoke LLM integrations for your stack.",
//     bullets: [
//       "RAG knowledge bases",
//       "LLM-powered internal tools",
//       "API & model integration",
//     ],
//   },
//   {
//     num: "04",
//     icon: "fa-solid fa-share-nodes",
//     title: "Social Media Marketing",
//     description:
//       "Always-on social presence with content, paid amplification and community management that builds loyal audiences.",
//     bullets: [
//       "Content calendars & posting",
//       "Paid social campaigns",
//       "Community management",
//     ],
//   },
//   {
//     num: "05",
//     icon: "fa-solid fa-mobile-screen",
//     title: "Mobile App Development",
//     description:
//       "Cross-platform iOS and Android apps designed to delight users and ship fast with a single codebase.",
//     bullets: [
//       "iOS & Android (React Native / Flutter)",
//       "App Store & Play Store launch",
//       "Push notifications & analytics",
//     ],
//   },
//   {
//     num: "06",
//     icon: "fa-solid fa-puzzle-piece",
//     title: "Custom Solutions",
//     description:
//       "Bespoke software for the workflows your business runs on — when off-the-shelf tools just don't fit.",
//     bullets: [
//       "Internal tools & dashboards",
//       "Third-party API integrations",
//       "Legacy system modernisation",
//     ],
//   },
//   {
//     num: "07",
//     icon: "fa-solid fa-bag-shopping",
//     title: "Ecommerce Solutions",
//     description:
//       "Online stores built on Shopify, WooCommerce or custom stacks — optimised for checkout conversion.",
//     bullets: [
//       "Shopify & WooCommerce builds",
//       "Payment gateway integration",
//       "Conversion-rate optimisation",
//     ],
//   },
//   {
//     num: "08",
//     icon: "fa-solid fa-network-wired",
//     title: "ERP Solutions",
//     description:
//       "End-to-end ERP implementations and integrations that connect finance, ops and people in one source of truth.",
//     bullets: [
//       "ERP selection & deployment",
//       "Custom modules & integrations",
//       "Migration & training",
//     ],
//   },
//   {
//     num: "09",
//     icon: "fa-solid fa-palette",
//     title: "UI / UX Design",
//     description:
//       "Research-led product design — wireframes, prototypes and design systems that make every flow feel obvious.",
//     bullets: [
//       "User research & journey mapping",
//       "Hi-fidelity design & prototyping",
//       "Design systems & handoff",
//     ],
//   },
// ];
const SERVICES: Service[] = [
  {
    num: "01",
    icon: "fa-solid fa-cubes-stacked",
    title: "SaaS Product Development",
    description:
      "From idea to production-ready platform. We architect and build multi-tenant SaaS products — subscriptions, billing, role-based access, and scalable cloud infrastructure — engineered to grow from your first customer to your thousandth.",
    bullets: [
      "Multi-tenant architecture & secure auth",
      "Subscription billing & usage metering",
      "Cloud-native, auto-scaling infrastructure",
    ],
  },
  {
    num: "02",
    icon: "fa-solid fa-layer-group",
    title: "White-Label Solutions",
    description:
      "Launch faster with proven, ready-to-brand platforms. We deliver white-label CRM, ERP, LMS, and e-commerce products you can ship under your own name — fully customised to your workflows and go-to-market in weeks, not years.",
    bullets: [
      "White-label CRM, ERP, LMS & e-commerce",
      "Your branding, domains & design system",
      "Rapid configuration & deployment",
    ],
  },
  {
    num: "03",
    icon: "fa-solid fa-microchip-ai",
    title: "AI & Automation",
    description:
      "Stop losing time to manual busywork. We deploy practical AI — LLM-powered copilots, chatbots, predictive analytics, and workflow automation — that keeps your business running around the clock and your team focused on growth.",
    bullets: [
      "LLM copilots & custom AI assistants",
      "Predictive analytics & forecasting",
      "Workflow & document automation",
    ],
  },
  {
    num: "04",
    icon: "fa-solid fa-code",
    title: "Web Development",
    description:
      "Your website and web apps should work as hard as your team. We build fast, beautiful, SEO-ready platforms on modern frameworks — engineered for performance, accessibility, and conversion across every market you serve.",
    bullets: [
      "Marketing sites & high-converting landing pages",
      "Web apps & SaaS front-ends",
      "Headless CMS & third-party integrations",
    ],
  },
  {
    num: "05",
    icon: "fa-solid fa-magnifying-glass-chart",
    title: "Search Engine Optimisation",
    description:
      "Most businesses are invisible to their best buyers on Google — we fix that. Through technical SEO, intent-driven content, and authoritative link building, we earn you page-one rankings that compound in value every single month.",
    bullets: [
      "International & multi-region SEO",
      "Technical audits & Core Web Vitals fixes",
      "Content strategy & authoritative link building",
    ],
  },
  {
    num: "06",
    icon: "fa-solid fa-share-nodes",
    title: "Social Media Marketing",
    description:
      "Your audience is scrolling right now — your brand should be there, building trust and converting followers into customers. We handle strategy, content, paid campaigns, and community so you can focus on running your business.",
    bullets: [
      "Meta, LinkedIn & TikTok paid campaigns",
      "Content calendars, copywriting & creative",
      "Community management & influencer sourcing",
    ],
  },
  {
    num: "07",
    icon: "fa-solid fa-mobile-screen",
    title: "Mobile App Development",
    description:
      "A great mobile experience turns one-time buyers into loyal customers. We design and build cross-platform iOS and Android apps that are fast to market, intuitive to use, and built to scale as your business grows.",
    bullets: [
      "iOS & Android (React Native / Flutter)",
      "App Store & Google Play Store launch",
      "Push notifications, analytics & in-app payments",
    ],
  },
  {
    num: "08",
    icon: "fa-solid fa-puzzle-piece",
    title: "Custom Software Solutions",
    description:
      "Off-the-shelf tools weren't built for your business — yours was. We design and develop bespoke software around the exact workflows, rules, and processes that make your operation run, replacing spreadsheets and workarounds for good.",
    bullets: [
      "Internal tools, portals & dashboards",
      "Third-party API & system integrations",
      "Legacy system modernisation & migration",
    ],
  },
  {
    num: "09",
    icon: "fa-solid fa-bag-shopping",
    title: "Ecommerce Solutions",
    description:
      "An online store that looks good but doesn't sell is just an expensive brochure. We build and optimise Shopify, WooCommerce, and custom storefronts engineered for global buyers — from product discovery to a frictionless checkout.",
    bullets: [
      "Shopify & WooCommerce design and development",
      "Payment gateway integration (Stripe, PayPal, Apple Pay)",
      "Conversion-rate optimisation & abandoned cart recovery",
    ],
  },
  {
    num: "10",
    icon: "fa-solid fa-network-wired",
    title: "ERP Solutions",
    description:
      "Disconnected systems quietly cost you time and money. We implement and integrate ERP solutions that connect finance, operations, inventory, and people into a single source of truth — so decisions get faster and errors disappear.",
    bullets: [
      "ERP selection, configuration & deployment",
      "Custom modules, workflows & integrations",
      "Data migration, team training & ongoing support",
    ],
  },
  {
    num: "11",
    icon: "fa-solid fa-palette",
    title: "UI / UX Design",
    description:
      "Users who find your product confusing will leave — and never tell you why. Our research-led design process maps real user behaviour to create interfaces that feel effortless, build trust instantly, and drive the actions your business needs.",
    bullets: [
      "User research, personas & journey mapping",
      "Hi-fidelity wireframes, prototypes & usability testing",
      "Design systems, component libraries & dev handoff",
    ],
  },
];
const PREVIEW_COUNT = 3;

const MarketingServices = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? SERVICES : SERVICES.slice(0, PREVIEW_COUNT);

  return (
    <section
      className="section marketing-services"
      aria-labelledby="marketing-services-title"
    >
      <div className="container">
        <div className="row align-items-end mb-50">
          <div className="col-12 col-lg-7">
            <span className="sub-title">
              What We Do
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </span>
            <h2
              id="marketing-services-title"
              className="title title-anim mt-3 mb-0"
            >
              Eleven capabilities. One partner. Every outcome accountable.
            </h2>
          </div>
          <div className="col-12 col-lg-5">
            <p className="marketing-services__lead">
             Whether you need a single product shipped or an entire digital
              roadmap delivered, we combine engineering, AI, and growth expertise
              — grounded in data and measured against real business outcomes, not vanity metrics.
            </p>
          </div>
        </div>

        <ul
          id="marketing-services-grid"
          className="row gaper marketing-services__grid"
          aria-label="Marketing services"
        >
          {visible.map((service) => (
            <li
              key={service.num}
              className="col-12 col-md-6 col-xl-4 marketing-services__col"
            >
              <article className="marketing-services__card">
                <span className="marketing-services__index" aria-hidden="true">
                  {service.num}
                </span>
                <span
                  className="marketing-services__icon"
                  aria-hidden="true"
                >
                  <i className={service.icon}></i>
                </span>
                <h3 className="marketing-services__title">{service.title}</h3>
                <p className="marketing-services__desc">{service.description}</p>
                <ul className="marketing-services__bullets">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>
                      <i
                        className="fa-solid fa-check"
                        aria-hidden="true"
                      ></i>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="marketing-services__cta"
                  aria-label={`Talk to us about ${service.title}`}
                >
                  Talk to us
                  <i
                    className="fa-sharp fa-solid fa-arrow-up-right"
                    aria-hidden="true"
                  ></i>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        {SERVICES.length > PREVIEW_COUNT && (
          <div className="marketing-services__more">
            <button
              type="button"
              className="marketing-services__more-btn"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              aria-controls="marketing-services-grid"
            >
              <span>
                {showAll
                  ? "Show fewer services"
                  : `View all ${SERVICES.length} services`}
              </span>
              <i
                className={
                  "fa-solid " +
                  (showAll ? "fa-arrow-up" : "fa-arrow-down")
                }
                aria-hidden="true"
              ></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketingServices;
