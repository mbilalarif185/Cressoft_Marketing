// BLOG TOPICS FOR CONTENT TEAM:
// 1. "AI automation agency vs Zapier: which is right for your US business?"
//    (cost of zapier, is zapier down)
// 2. "Best AI automation tools for US businesses in 2026" (best automation tools)
// 3. "How to find an AI automation agency near me in the USA" (ai automation near me)
// 4. "AI customer service automation for small businesses: 2026 update"
// 5. "Key roles to hire when scaling an AI automation agency"
//    (key roles to hire first scaling ai automation agency, ai agency business model)
// 6. "Enterprise automation platform vs custom AI: which wins?"
//    (automation anywhere pricing, automation anywhere careers)

/**
 * /usa/ai-automation — DESIGN CONCEPT: "Neural Flow"
 *
 * Dark near-black (#111219) hero with a large purple→blue CSS gradient orb
 * (animated pulse, no images), flowing wave SVG dividers between sections, and
 * white body sections with a purple (#0a8ef0) accent. Cards are white with a
 * subtle purple gradient border. Deliberately distinct from the navy
 * split-screen SaaS page, the minimal white-labelling page and the warm
 * portfolio web page. Only Header + Footer (via Layout) are shared.
 */

import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/data/services";

const PAGE_URL = `${SITE_URL}/usa/ai-automation`;

/** The four flagship USA service pages — excluded from the sub-services grid. */
const MAIN_USA_SLUGS = [
  "saas-development",
  "ai-automation",
  "web-development",
  "white-label-solutions",
];
const SUB_SERVICES = SERVICES.filter((s) => !MAIN_USA_SLUGS.includes(s.slug));

// Operational promises only — no performance stats until the client signs
// off on real figures (the rest of the site avoids fabricated statistics).
const HERO_STATS = [
  { value: "24/7", label: "Always-on automated operations" },
  { value: "2–4 weeks", label: "Typical automation deployment" },
  { value: "Free", label: "AI automation audit included" },
];

const AI_SERVICES = [
  {
    icon: "fa-solid fa-diagram-project",
    title: "AI Workflow Automation",
    desc: "We automate repetitive business processes using AI — from lead processing and data entry to customer onboarding and reporting. Our ai automation services replace manual work with intelligent automated solutions.",
  },
  {
    icon: "fa-solid fa-network-wired",
    title: "Enterprise Automation Platform",
    desc: "We build custom enterprise automation platforms that connect your tools, data and teams into one intelligent automated system. Scalable, secure and built for enterprise automation at any scale.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "AI Customer Service Automation",
    desc: "Deploy AI chatbots and automated customer service solutions that handle enquiries 24/7. Our ai customer service automation solutions cut support costs for small and large US businesses alike.",
  },
];

const USE_CASES = [
  {
    icon: "fa-solid fa-bullseye",
    title: "Sales automation",
    desc: "Lead scoring & routing",
  },
  {
    icon: "fa-solid fa-user-tie",
    title: "HR automation",
    desc: "Onboarding & payroll",
  },
  {
    icon: "fa-solid fa-file-invoice-dollar",
    title: "Finance automation",
    desc: "Invoicing & reconciliation",
  },
  {
    icon: "fa-solid fa-bullhorn",
    title: "Marketing automation",
    desc: "Campaign & reporting",
  },
  {
    icon: "fa-solid fa-boxes-stacked",
    title: "Operations automation",
    desc: "Inventory & logistics",
  },
  {
    icon: "fa-solid fa-comments",
    title: "Customer service",
    desc: "24/7 AI support",
  },
];

const VS_ROWS = [
  { label: "Custom built", zapier: "no", agency: "warn", quantel: "yes" },
  {
    label: "Business-specific logic",
    zapier: "no",
    agency: "warn",
    quantel: "yes",
  },
  { label: "AI-powered", zapier: "no", agency: "no", quantel: "yes" },
  { label: "Ongoing support", zapier: "no", agency: "no", quantel: "yes" },
  { label: "Enterprise ready", zapier: "no", agency: "warn", quantel: "yes" },
  { label: "Fixed monthly cost", zapier: "no", agency: "no", quantel: "yes" },
];

const VS_MARK: Record<string, string> = {
  yes: "✅",
  no: "❌",
  warn: "⚠️",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation Services",
  name: "AI Automation Agency USA",
  provider: {
    "@type": "Organization",
    name: "Quantel Solutions",
    url: "https://quantel.uk",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  description:
    "AI automation agency providing ai automation services, enterprise automation platforms and process automation services for US businesses.",
  url: PAGE_URL,
};

/** Smooth wave divider — flips between dark hero and white body. */
const Wave = ({ flip, from, to }: { flip?: boolean; from: string; to: string }) => (
  <div
    className="nfw"
    style={{ background: from, transform: flip ? "scaleY(-1)" : undefined }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" focusable="false">
      <path
        d="M0,48 C180,90 360,10 540,26 C720,42 900,88 1080,72 C1260,56 1350,20 1440,36 L1440,90 L0,90 Z"
        fill={to}
      />
    </svg>
    <style jsx>{`
      .nfw {
        line-height: 0;
      }
      .nfw svg {
        display: block;
        width: 100%;
        height: clamp(40px, 7vw, 90px);
      }
    `}</style>
  </div>
);

const AiAutomationUsa = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="AI Automation Agency USA | Quantel Solutions"
        description="Leading AI automation agency serving US businesses. AI automation services, enterprise automation platform & process automation services. Artificial intelligence automation for US companies. Book a free call."
        pathname="/usa/ai-automation"
        keywords={[
          "ai automation agency",
          "artificial intelligence automation agency",
          "ai automation services",
          "automated solutions",
          "enterprise automation platform",
          "process automation services",
          "ai automation consultant",
          "ai automation consulting",
          "it automation services",
          "automation service",
          "ai automation agencies",
          "business automation agency",
          "automated organization",
          "ai automation near me",
          "best automation tools",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "United States", url: `${SITE_URL}/usa` },
          { name: "AI Automation", url: PAGE_URL },
        ]}
        jsonLd={serviceJsonLd}
      >
        <link
          rel="alternate"
          hrefLang="en-US"
          href={PAGE_URL}
          key="hreflang-usa-ai"
        />
      </Seo>

      <div className="nf">
        {/* ============================ HERO (dark, orb) ================= */}
        <section className="nf-hero" aria-labelledby="nf-hero-title">
          <span className="nf-orb" aria-hidden="true" />
          <span className="nf-orb nf-orb--echo" aria-hidden="true" />
          <div className="nf-wrap nf-hero__inner">
            <span className="nf-badge">🇺🇸 AI Automation Agency USA</span>
            <h1 id="nf-hero-title" className="nf-hero__title">
              AI Automation Agency for US Businesses
            </h1>
            <p className="nf-hero__sub">
              Quantel Solutions is an artificial intelligence automation agency
              helping US businesses automate workflows, reduce costs and scale
              faster. From process automation services to enterprise automation
              platforms — we build and run it all.
            </p>
            <div className="nf-hero__cta">
              <Link href="/contact" className="nf-btn nf-btn--primary">
                Book a Free AI Consultation
              </Link>
              <Link href="/success-stories" className="nf-btn nf-btn--outline">
                See AI Automation Examples
              </Link>
            </div>
            <div className="nf-hero__stats">
              {HERO_STATS.map((s) => (
                <div className="nf-stat" key={s.label}>
                  <span className="nf-stat__v">{s.value}</span>
                  <span className="nf-stat__l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave divider: dark → white */}
        <Wave from="#111219" to="#faf6ef" />

        {/* ============================ AI SERVICES (white) ============== */}
        <section className="nf-svc" aria-labelledby="nf-svc-title">
          <div className="nf-wrap">
            <header className="nf-head">
              <span className="nf-kicker">What we automate</span>
              <h2 id="nf-svc-title" className="nf-h2">
                Our AI Automation Services
              </h2>
            </header>
            <div className="nf-svc__stack">
              {AI_SERVICES.map((c, i) => (
                <div className="nf-gcard" key={c.title}>
                  <article className="nf-gcard__in">
                    <span className="nf-gcard__n" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="nf-gcard__icon" aria-hidden="true">
                      <i className={c.icon}></i>
                    </span>
                    <div className="nf-gcard__body">
                      <h3 className="nf-gcard__title">{c.title}</h3>
                      <p className="nf-gcard__desc">{c.desc}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ USE CASES (white) ================ */}
        <section className="nf-use" aria-labelledby="nf-use-title">
          <div className="nf-wrap">
            <header className="nf-head">
              <span className="nf-kicker">Where it applies</span>
              <h2 id="nf-use-title" className="nf-h2">
                AI Automation Use Cases for US Businesses
              </h2>
              <p className="nf-lead">
                From IT automation services to full business automation agency
                engagements, our automated solutions turn a manual operation into
                an automated organization — one automation service at a time.
              </p>
            </header>
          </div>
          <div className="nf-use__rail" role="list">
            {USE_CASES.map((u) => (
              <article className="nf-use__card" role="listitem" key={u.title}>
                <span className="nf-use__icon" aria-hidden="true">
                  <i className={u.icon}></i>
                </span>
                <h3 className="nf-use__title">{u.title}</h3>
                <p className="nf-use__desc">{u.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============================ VS COMPARISON ==================== */}
        <section className="nf-vs" aria-labelledby="nf-vs-title">
          <div className="nf-wrap">
            <header className="nf-head nf-head--center">
              <span className="nf-kicker">Why custom wins</span>
              <h2 id="nf-vs-title" className="nf-h2">
                Quantel vs Other AI Automation Tools
              </h2>
              <p className="nf-lead">
                Unlike off-the-shelf tools like Zapier or Automation Anywhere, we
                build custom ai automation solutions tailored to your exact
                business process — not generic templates.
              </p>
            </header>
            <div className="nf-vs__scroll">
              <table className="nf-vs__table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="visually-hidden">Capability</span>
                    </th>
                    <th scope="col">Zapier/Tools</th>
                    <th scope="col">Generic Agency</th>
                    <th scope="col" className="nf-vs__us">
                      Quantel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VS_ROWS.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{VS_MARK[r.zapier]}</td>
                      <td>{VS_MARK[r.agency]}</td>
                      <td className="nf-vs__us">{VS_MARK[r.quantel]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================ AI CONSULTANT ==================== */}
        <section className="nf-con" aria-labelledby="nf-con-title">
          <div className="nf-wrap nf-con__grid">
            <div className="nf-con__copy">
              <span className="nf-kicker">Consulting</span>
              <h2 id="nf-con-title" className="nf-h2">
                Work With an AI Automation Consultant
              </h2>
              <p className="nf-con__p">
                Every project starts with a dedicated ai automation consultant who
                maps your current processes, identifies automation opportunities
                and designs the optimal automated solutions for your business.
              </p>
              <p className="nf-con__p">
                Whether you need ai automation consulting for a single workflow or
                a full business automation agency engagement — we start with a
                free consultation.
              </p>
            </div>
            <div className="nf-con__card">
              <span className="nf-con__glow" aria-hidden="true" />
              <h3 className="nf-con__card-title">Free AI Automation Audit</h3>
              <p className="nf-con__card-sub">
                Book a free session with our ai automation consultant — we will
                map your processes and show you exactly what can be automated and
                what ROI you can expect.
              </p>
              <Link href="/contact" className="nf-btn nf-btn--invert">
                Book Free AI Audit
              </Link>
            </div>
          </div>
        </section>

        {/* ============================ SUB-SERVICES (#f2ebdf) =========== */}
        <section className="nf-sub" aria-labelledby="nf-sub-title">
          <div className="nf-wrap">
            <header className="nf-head">
              <span className="nf-kicker">Beyond automation</span>
              <h2 id="nf-sub-title" className="nf-h2">
                More Services from Quantel USA
              </h2>
            </header>
            <div className="nf-sub__grid">
              {SUB_SERVICES.map((s) => (
                <Link href="/usa" className="nf-sub__card" key={s.slug}>
                  <span className="nf-sub__tag">Available in USA</span>
                  <span className="nf-sub__icon" aria-hidden="true">
                    <i className={s.icon}></i>
                  </span>
                  <span className="nf-sub__name">{s.name}</span>
                  <span className="nf-sub__desc">{s.heroDescription}</span>
                  <i
                    className="fa-solid fa-arrow-right nf-sub__arrow"
                    aria-hidden="true"
                  ></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Wave divider: gray → dark CTA */}
        <Wave from="#f2ebdf" to="#111219" flip />

        {/* ============================ CTA (dark) ======================= */}
        <section className="nf-cta" aria-labelledby="nf-cta-title">
          <span className="nf-orb nf-orb--cta" aria-hidden="true" />
          <div className="nf-wrap nf-cta__inner">
            <h2 id="nf-cta-title" className="nf-cta__title">
              Ready to automate your busywork?
            </h2>
            <p className="nf-cta__sub">
              Talk to the ai automation agency US businesses trust — we'll find
              your highest-ROI workflow and prove it on your real data.
            </p>
            <Link href="/contact" className="nf-btn nf-btn--primary">
              Book a Free AI Consultation
            </Link>
          </div>
        </section>

        <style jsx>{`
          .nf {
            /* Site "Daylight Studio" tokens (see _variables.scss). */
            --dark: #111219; /* --surface-dark */
            --purple: #0a8ef0; /* --brand-blue (primary accent) */
            --blue: #1fc4f5; /* --brand-cyan (gradient partner) */
            --ink: #16181f;
            --muted: #565d6b;
            --gray: #f2ebdf; /* --surface-sunken */
            --line: #e8e0d2;
            background: #faf6ef;
            color: var(--ink);
            overflow: hidden;
          }
          .nf :global(a) {
            text-decoration: none;
          }
          .nf-wrap {
            width: 100%;
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .nf-kicker {
            display: inline-block;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--purple);
          }
          /*
           * NOTE: the global reset forces h1-h6/p color to
           * var(--theme-color) with !important, so heading/paragraph rules
           * re-declare --theme-color locally (same pattern as .geo-cta__inner).
           */
          .nf-h2 {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(1.75rem, 3.3vw, 2.6rem);
            font-weight: 800;
            line-height: 1.12;
            letter-spacing: -0.02em;
            margin: 12px 0 0;
            color: var(--ink);
          }
          .nf-head {
            max-width: 740px;
            margin-bottom: 46px;
          }
          .nf-head--center {
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }
          .nf-lead {
            --theme-color: #565d6b;
            margin: 16px 0 0;
            font-size: 1.02rem;
            line-height: 1.7;
            color: var(--muted);
          }

          /*
           * Buttons + sub-service cards render on next/link <Link> elements.
           * styled-jsx only auto-scopes plain DOM tags, so these selectors are
           * declared :global() under the scoped .nf root to actually match.
           */
          .nf :global(.nf-btn) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 15px 30px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.98rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .nf :global(.nf-btn--primary) {
            background: var(--purple);
            color: #fff;
            box-shadow: 0 14px 34px rgba(10, 142, 240, 0.45);
          }
          .nf :global(.nf-btn--primary:hover) {
            transform: translateY(-2px);
            box-shadow: 0 18px 42px rgba(10, 142, 240, 0.55);
            color: #fff;
          }
          .nf :global(.nf-btn--outline) {
            background: transparent;
            color: #fff;
            border: 1.5px solid rgba(255, 255, 255, 0.45);
          }
          .nf :global(.nf-btn--outline:hover) {
            border-color: #fff;
            background: rgba(255, 255, 255, 0.06);
            color: #fff;
          }
          .nf :global(.nf-btn--invert) {
            background: #fff;
            color: var(--purple);
          }
          .nf :global(.nf-btn--invert:hover) {
            transform: translateY(-2px);
            box-shadow: 0 14px 30px rgba(3, 7, 18, 0.3);
            color: var(--purple);
          }

          /* Orb */
          .nf-orb {
            position: absolute;
            top: -180px;
            left: 50%;
            transform: translateX(-50%);
            width: 760px;
            height: 760px;
            border-radius: 50%;
            background: radial-gradient(
              circle at 40% 40%,
              rgba(10, 142, 240, 0.55),
              rgba(31, 196, 245, 0.3) 45%,
              transparent 70%
            );
            filter: blur(30px);
            animation: nfpulse 6s ease-in-out infinite;
            pointer-events: none;
          }
          .nf-orb--echo {
            width: 420px;
            height: 420px;
            top: 120px;
            left: 72%;
            opacity: 0.6;
            animation-delay: -3s;
          }
          .nf-orb--cta {
            top: auto;
            bottom: -320px;
            opacity: 0.7;
          }
          @keyframes nfpulse {
            0%,
            100% {
              transform: translateX(-50%) scale(1);
              opacity: 0.9;
            }
            50% {
              transform: translateX(-50%) scale(1.12);
              opacity: 0.65;
            }
          }

          /* HERO */
          .nf-hero {
            position: relative;
            background: var(--dark);
            padding: 170px 0 90px;
            overflow: hidden;
          }
          .nf-hero__inner {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 880px;
          }
          .nf-badge {
            display: inline-block;
            font-size: 0.84rem;
            font-weight: 700;
            color: #d3ecfc;
            background: rgba(10, 142, 240, 0.22);
            border: 1px solid rgba(10, 142, 240, 0.5);
            padding: 9px 18px;
            border-radius: 999px;
            margin-bottom: 26px;
          }
          .nf-hero__title {
            --theme-color: #ffffff;
            font-family: var(--display);
            font-size: clamp(2.3rem, 5vw, 4rem);
            font-weight: 800;
            line-height: 1.05;
            letter-spacing: -0.03em;
            color: #fff;
            margin: 0 0 20px;
          }
          .nf-hero__sub {
            --theme-color: #c7cad4;
            font-size: 1.1rem;
            line-height: 1.75;
            color: #c7cad4;
            margin: 0 auto 32px;
            max-width: 680px;
          }
          .nf-hero__cta {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 14px;
            margin-bottom: 52px;
          }
          .nf-hero__stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            max-width: 780px;
            margin: 0 auto;
          }
          .nf-stat {
            padding: 24px 18px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(10, 142, 240, 0.45);
            box-shadow: 0 0 34px rgba(10, 142, 240, 0.25);
            backdrop-filter: blur(6px);
          }
          .nf-stat__v {
            display: block;
            font-family: var(--display);
            font-size: 1.9rem;
            font-weight: 800;
            background: linear-gradient(100deg, #1fc4f5, #0a8ef0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .nf-stat__l {
            display: block;
            margin-top: 6px;
            font-size: 0.85rem;
            color: #9aa1b2;
          }

          /* AI SERVICES — stacked gradient-border cards */
          .nf-svc {
            padding: 80px 0 90px;
            background: #faf6ef;
          }
          .nf-svc__stack {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .nf-gcard {
            border-radius: 18px;
            padding: 1.5px;
            background: linear-gradient(
              120deg,
              rgba(10, 142, 240, 0.55),
              rgba(31, 196, 245, 0.25) 45%,
              rgba(10, 142, 240, 0.12)
            );
            transition: transform 0.22s ease, box-shadow 0.22s ease;
          }
          .nf-gcard:hover {
            transform: translateY(-4px);
            box-shadow: 0 24px 54px rgba(10, 142, 240, 0.18);
          }
          .nf-gcard__in {
            display: grid;
            grid-template-columns: auto auto 1fr;
            align-items: center;
            gap: 26px;
            background: #fff;
            border-radius: 16.5px;
            padding: 34px 36px;
          }
          .nf-gcard__n {
            font-family: var(--display);
            font-size: 2.6rem;
            font-weight: 800;
            color: transparent;
            -webkit-text-stroke: 1.5px rgba(10, 142, 240, 0.4);
            line-height: 1;
          }
          .nf-gcard__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 16px;
            background: linear-gradient(
              135deg,
              rgba(10, 142, 240, 0.14),
              rgba(31, 196, 245, 0.14)
            );
            color: var(--purple);
            font-size: 1.5rem;
          }
          .nf-gcard__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: 1.3rem;
            font-weight: 700;
            margin: 0 0 8px;
            color: var(--ink);
          }
          .nf-gcard__desc {
            --theme-color: #565d6b;
            font-size: 0.99rem;
            line-height: 1.7;
            color: var(--muted);
            margin: 0;
            max-width: 760px;
          }

          /* USE CASES — horizontal scroll rail */
          .nf-use {
            padding: 30px 0 90px;
            background: #faf6ef;
          }
          .nf-use__rail {
            display: flex;
            gap: 18px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 6px 24px 22px;
            max-width: 1180px;
            margin: 0 auto;
            scrollbar-width: thin;
            scrollbar-color: var(--purple) transparent;
          }
          .nf-use__card {
            flex: 0 0 240px;
            scroll-snap-align: start;
            border-radius: 16px;
            padding: 26px 22px;
            background: #fff;
            border: 1px solid var(--line);
            border-top: 3px solid var(--purple);
            box-shadow: 0 12px 30px rgba(31, 24, 12, 0.06);
            transition: transform 0.2s ease;
          }
          .nf-use__card:hover {
            transform: translateY(-5px);
          }
          .nf-use__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: rgba(10, 142, 240, 0.1);
            color: var(--purple);
            font-size: 1.2rem;
            margin-bottom: 16px;
          }
          .nf-use__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: 1.06rem;
            font-weight: 700;
            margin: 0 0 6px;
            color: var(--ink);
          }
          .nf-use__desc {
            --theme-color: #565d6b;
            font-size: 0.9rem;
            color: var(--muted);
            margin: 0;
          }

          /* VS TABLE */
          .nf-vs {
            padding: 90px 0;
            background: var(--gray);
          }
          .nf-vs__scroll {
            overflow-x: auto;
          }
          .nf-vs__table {
            width: 100%;
            min-width: 620px;
            border-collapse: separate;
            border-spacing: 0;
            background: #fff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 18px 44px rgba(31, 24, 12, 0.08);
          }
          .nf-vs__table th,
          .nf-vs__table td {
            padding: 18px 22px;
            text-align: center;
            border-bottom: 1px solid var(--line);
            font-size: 0.98rem;
          }
          .nf-vs__table thead th {
            background: var(--ink);
            color: #fff;
            font-family: var(--display);
            font-weight: 700;
            border-bottom: none;
          }
          .nf-vs__table thead th.nf-vs__us {
            background: var(--purple);
          }
          .nf-vs__table tbody th {
            text-align: left;
            font-weight: 600;
            color: var(--ink);
          }
          .nf-vs__table tbody tr:last-child th,
          .nf-vs__table tbody tr:last-child td {
            border-bottom: none;
          }
          .nf-vs__table td.nf-vs__us {
            background: rgba(10, 142, 240, 0.07);
            font-weight: 700;
          }

          /* CONSULTANT */
          .nf-con {
            padding: 100px 0;
            background: #faf6ef;
          }
          .nf-con__grid {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 54px;
            align-items: center;
          }
          .nf-con__p {
            --theme-color: #565d6b;
            font-size: 1.04rem;
            line-height: 1.75;
            color: var(--muted);
            margin: 18px 0 0;
          }
          .nf-con__card {
            position: relative;
            border-radius: 22px;
            padding: 46px 40px;
            background: linear-gradient(135deg, #0a8ef0, #0a6cc4 60%, #16355c);
            overflow: hidden;
            box-shadow: 0 28px 64px rgba(10, 142, 240, 0.35);
          }
          .nf-con__glow {
            position: absolute;
            top: -60px;
            right: -60px;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.35),
              transparent 70%
            );
            pointer-events: none;
          }
          .nf-con__card-title {
            --theme-color: #ffffff;
            position: relative;
            font-family: var(--display);
            font-size: 1.6rem;
            font-weight: 800;
            color: #fff;
            margin: 0 0 14px;
          }
          .nf-con__card-sub {
            --theme-color: rgba(255, 255, 255, 0.92);
            position: relative;
            font-size: 1rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.92);
            margin: 0 0 26px;
          }

          /* SUB-SERVICES */
          .nf-sub {
            padding: 96px 0;
            background: var(--gray);
          }
          .nf-sub__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .nf :global(.nf-sub__card) {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 24px 24px 20px;
            border-radius: 14px;
            background: #fff;
            border: 1px solid var(--line);
            color: var(--ink);
            transition: all 0.2s ease;
          }
          .nf :global(.nf-sub__card:hover) {
            border-color: var(--purple);
            transform: translateY(-4px);
            box-shadow: 0 18px 40px rgba(10, 142, 240, 0.12);
          }
          .nf-sub__tag {
            display: inline-block;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--purple);
            background: rgba(10, 142, 240, 0.1);
            padding: 4px 10px;
            border-radius: 999px;
          }
          .nf-sub__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 11px;
            background: rgba(10, 142, 240, 0.1);
            color: var(--purple);
            font-size: 1.1rem;
          }
          .nf-sub__name {
            font-family: var(--display);
            font-weight: 700;
            font-size: 1.05rem;
          }
          .nf-sub__desc {
            font-size: 0.88rem;
            line-height: 1.55;
            color: var(--muted);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .nf-sub__arrow {
            color: #8a8f9c;
            transition: transform 0.2s ease, color 0.2s ease;
          }
          .nf :global(.nf-sub__card:hover .nf-sub__arrow) {
            color: var(--purple);
            transform: translateX(4px);
          }

          /* CTA */
          .nf-cta {
            position: relative;
            background: var(--dark);
            padding: 110px 0 130px;
            overflow: hidden;
          }
          .nf-cta__inner {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 700px;
          }
          .nf-cta__title {
            --theme-color: #ffffff;
            font-family: var(--display);
            font-size: clamp(1.9rem, 3.6vw, 2.9rem);
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.02em;
            margin: 0 0 16px;
          }
          .nf-cta__sub {
            --theme-color: #c7cad4;
            font-size: 1.08rem;
            line-height: 1.7;
            color: #c7cad4;
            margin: 0 0 30px;
          }

          /* RESPONSIVE */
          @media (max-width: 991px) {
            .nf-hero {
              padding: 140px 0 70px;
            }
            .nf-hero__stats {
              grid-template-columns: 1fr;
              max-width: 420px;
            }
            .nf-gcard__in {
              grid-template-columns: auto 1fr;
            }
            .nf-gcard__n {
              display: none;
            }
            .nf-con__grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .nf-sub__grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 599px) {
            .nf-wrap {
              padding: 0 18px;
            }
            .nf-gcard__in {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 28px 24px;
            }
            .nf-sub__grid {
              grid-template-columns: 1fr;
            }
            .nf-use__rail {
              padding-left: 18px;
              padding-right: 18px;
            }
            .nf-use__card {
              flex-basis: 210px;
            }
            .nf-svc,
            .nf-vs,
            .nf-con,
            .nf-sub {
              padding-top: 64px;
              padding-bottom: 64px;
            }
            .nf-con__card {
              padding: 36px 26px;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default AiAutomationUsa;