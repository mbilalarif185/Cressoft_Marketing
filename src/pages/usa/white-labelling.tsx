// BLOG TOPICS FOR CONTENT TEAM:
// 1. "Best white label SEO services for US agencies in 2026"
//    (best white label seo services, white label seo services reviews)
// 2. "White label services for agencies: complete guide"
//    (what are white label services, what is a white label service)
// 3. "White label digital marketing services vs hiring in-house"
// 4. "What is white label SEO services and how does it work?"
//    (what is white label seo services, benefits of white label seo services)
// 5. "White label web development services: how to scale your agency"
// 6. "White label software as a service: the agency growth model"

/**
 * /usa/white-labelling — DESIGN CONCEPT: "Clean Agency"
 *
 * Ultra-minimal, typography-led layout: pure white (#ffffff) canvas, near-black
 * (#16181f) text, forest-green (#0a6cc4) accent. Oversized ghost section
 * numbers sit behind headings, cards use thin 1px borders with sharp corners
 * and no shadows, and every H2 carries a small uppercase green section label.
 * No decorative graphics anywhere — deliberately the opposite of the dark
 * Neural Flow AI page and the warm Studio Portfolio web page. Only Header +
 * Footer (via Layout) are shared.
 */

import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/data/services";

const PAGE_URL = `${SITE_URL}/usa/white-labelling`;

/** The four flagship USA service pages — excluded from the sub-services grid. */
const MAIN_USA_SLUGS = [
  "saas-development",
  "ai-automation",
  "web-development",
  "white-label-solutions",
];
const SUB_SERVICES = SERVICES.filter((s) => !MAIN_USA_SLUGS.includes(s.slug));

const WL_SERVICES = [
  {
    n: "01",
    title: "White Label SEO Services",
    desc: "Full white label SEO services for agencies — keyword research, on-page SEO, white label link building services and monthly reporting. All delivered under your agency brand. Includes white label local SEO services, white label SEO audit services and white label SEO reseller services.",
  },
  {
    n: "02",
    title: "White Label Web Development Services",
    desc: "We build websites and web apps under your brand. White label web development services and white label web design services for agencies who want to offer development without hiring developers — including white label WordPress development services.",
  },
  {
    n: "03",
    title: "White Label Digital Marketing Services",
    desc: "White label digital marketing services including PPC, social media, email and content — fully managed white label marketing services delivered under your agency name.",
  },
  {
    n: "04",
    title: "White Label PPC Services",
    desc: "White label PPC services and white label PPC management for agencies. We run Google Ads and Meta Ads under your brand, with white label reporting your clients read as yours.",
  },
  {
    n: "05",
    title: "White Label Social Media Services",
    desc: "White label social media management services — content creation, scheduling and reporting delivered as your own service, backed by white label copywriting services and white label graphic design services.",
  },
  {
    n: "06",
    title: "White Label Software as a Service",
    desc: "Custom white label software as a service products your agency can resell — CRM, ERP and SaaS platforms fully rebranded. A true white label service provider model for recurring agency revenue.",
  },
];

const ALSO_AVAILABLE = [
  "White label website design services",
  "White label email marketing services",
  "White label reputation management services",
  "White label content services",
  "White label ecommerce service agency",
  "White label Shopify service agency",
  "White label GMB services",
  "White label design services",
];

const STEPS = [
  {
    n: "1",
    title: "You sell it",
    desc: "Offer our white label services to your clients under your own agency brand and pricing.",
  },
  {
    n: "2",
    title: "We deliver it",
    desc: "Our team delivers the work — SEO, web, PPC, social — to professional standards.",
  },
  {
    n: "3",
    title: "You report it",
    desc: "We provide white label reports branded as yours — your logo, your domain.",
  },
  {
    n: "4",
    title: "You profit",
    desc: "Keep the margin. Scale your agency without hiring a single new employee.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "White Label Services",
  name: "White Label Services USA",
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
    "White label services for US agencies including white label SEO services, white label web development services and white label digital marketing services.",
  url: PAGE_URL,
};

const WhiteLabellingUsa = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="White Label Services USA | White Label Agency | Quantel Solutions"
        description="Premium white label services for US agencies. White label SEO services, white label web development services, white label digital marketing services & more. Fully rebrandable. Book a free call."
        pathname="/usa/white-labelling"
        keywords={[
          "white label seo services",
          "white label local seo services",
          "white label seo services for agencies",
          "seo white label services",
          "best white label seo services",
          "white label digital marketing services",
          "white label link building services",
          "white label marketing services",
          "white label services",
          "white label ppc services",
          "white label web design services",
          "white label seo reseller services",
          "white label web development services",
          "white label agency services",
          "white label social media management services",
          "white label wordpress development services",
          "white label services for agencies",
          "white label software as a service",
          "white label email marketing services",
          "white label reputation management services",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "United States", url: `${SITE_URL}/usa` },
          { name: "White Labelling", url: PAGE_URL },
        ]}
        jsonLd={serviceJsonLd}
      >
        <link
          rel="alternate"
          hrefLang="en-US"
          href={PAGE_URL}
          key="hreflang-usa-wl"
        />
      </Seo>

      <div className="wl">
        {/* ============================ HERO — pure typography =========== */}
        <section className="wl-hero" aria-labelledby="wl-hero-title">
          <div className="wl-wrap">
            <span className="wl-label">White Label Services USA</span>
            <h1 id="wl-hero-title" className="wl-hero__title">
              White Label Services
              <br />
              for US Agencies
            </h1>
            <p className="wl-hero__sub">
              Quantel Solutions is a white label agency providing fully
              rebrandable white label services for agencies across the United
              States. White label SEO services, white label web development
              services, white label digital marketing services — all under your
              brand.
            </p>
            {/* Stats use the site-wide verified figures (500+ projects, 98%
                retention) — swap in agency-partner numbers once the client
                signs off on real ones. */}
            <div className="wl-hero__stats">
              <div className="wl-hero__stat">
                <strong>500+ projects</strong>
                <span>delivered globally</span>
              </div>
              <div className="wl-hero__stat">
                <strong>100% white label</strong>
                <span>your brand, our work</span>
              </div>
            </div>
            <div className="wl-hero__cta">
              <Link href="/contact" className="wl-btn wl-btn--solid">
                Start White Labelling Today
              </Link>
              {/* Direct download. Source: marketing/agency-pack.html — edit
                  that file and re-run the headless-Edge command in its header
                  comment to regenerate the PDF. */}
              <a
                href="/downloads/quantel-white-label-agency-pack.pdf"
                className="wl-btn wl-btn--line"
                download
              >
                Download Agency Pack
              </a>
            </div>
          </div>
        </section>

        {/* ============================ WHAT WE WHITE LABEL ============== */}
        <section className="wl-svc" aria-labelledby="wl-svc-title">
          <div className="wl-wrap">
            <header className="wl-head">
              <span className="wl-ghost" aria-hidden="true">
                01
              </span>
              <span className="wl-label">Our Services</span>
              <h2 id="wl-svc-title" className="wl-h2">
                White Label Services We Offer
              </h2>
            </header>

            <ol className="wl-list">
              {WL_SERVICES.map((s) => (
                <li className="wl-list__item" key={s.n}>
                  <span className="wl-list__n" aria-hidden="true">
                    {s.n} /
                  </span>
                  <div className="wl-list__body">
                    <h3 className="wl-list__title">{s.title}</h3>
                    <p className="wl-list__desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="wl-also">
              <span className="wl-also__label">Also available —</span>
              <ul className="wl-also__chips">
                {ALSO_AVAILABLE.map((a) => (
                  <li className="wl-chip" key={a}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================ HOW IT WORKS ===================== */}
        <section className="wl-how" aria-labelledby="wl-how-title">
          <div className="wl-wrap">
            <header className="wl-head">
              <span className="wl-ghost" aria-hidden="true">
                02
              </span>
              <span className="wl-label">The Process</span>
              <h2 id="wl-how-title" className="wl-h2">
                How Our White Label Agency Works
              </h2>
            </header>

            <div className="wl-steps">
              {STEPS.map((s) => (
                <article className="wl-step" key={s.n}>
                  <span className="wl-step__n" aria-hidden="true">
                    {s.n}
                  </span>
                  <h3 className="wl-step__title">&ldquo;{s.title}&rdquo;</h3>
                  <p className="wl-step__desc">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ SUB-SERVICES (#f8fafc) =========== */}
        <section className="wl-sub" aria-labelledby="wl-sub-title">
          <div className="wl-wrap">
            <header className="wl-head">
              <span className="wl-ghost" aria-hidden="true">
                03
              </span>
              <span className="wl-label">Full-Service Capability</span>
              <h2 id="wl-sub-title" className="wl-h2">
                More Services from Quantel USA
              </h2>
            </header>
            <div className="wl-sub__grid">
              {SUB_SERVICES.map((s) => (
                <Link href="/usa" className="wl-sub__card" key={s.slug}>
                  <span className="wl-sub__tag">Available in USA</span>
                  <span className="wl-sub__name">{s.name}</span>
                  <span className="wl-sub__desc">{s.heroDescription}</span>
                  <span className="wl-sub__go">
                    Explore
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ CTA ============================== */}
        <section className="wl-cta" aria-labelledby="wl-cta-title">
          <div className="wl-wrap wl-cta__inner">
            <span className="wl-label">Ready when you are</span>
            <h2 id="wl-cta-title" className="wl-cta__title">
              Scale your agency without hiring.
            </h2>
            <p className="wl-cta__sub">
              Tell us which white label services your agency needs — we'll come
              back with a delivery plan and agency pricing within 24 hours.
            </p>
            <Link href="/contact" className="wl-btn wl-btn--solid">
              Start White Labelling Today
            </Link>
          </div>
        </section>

        <style jsx>{`
          .wl {
            /* Site "Daylight Studio" tokens (see _variables.scss). The accent
               var keeps its --green name but now carries the AA-safe brand
               azure (--brand-blue-deep). */
            --ink: #16181f;
            --muted: #565d6b;
            --green: #0a6cc4;
            --line: #e8e0d2;
            --ghost: #f2ebdf;
            background: #faf6ef;
            color: var(--ink);
            overflow: hidden;
          }
          .wl :global(a) {
            text-decoration: none;
          }
          .wl-wrap {
            width: 100%;
            max-width: 1080px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .wl-label {
            display: inline-block;
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--green);
          }
          /*
           * NOTE: the global reset forces h1-h6/p color to
           * var(--theme-color) with !important, so heading/paragraph rules
           * re-declare --theme-color locally (same pattern as .geo-cta__inner).
           */
          .wl-h2 {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(1.9rem, 3.6vw, 3rem);
            font-weight: 800;
            line-height: 1.08;
            letter-spacing: -0.025em;
            margin: 14px 0 0;
            color: var(--ink);
          }
          .wl-lead {
            --theme-color: #565d6b;
            margin: 18px 0 0;
            font-size: 1.04rem;
            line-height: 1.7;
            color: var(--muted);
            max-width: 560px;
          }
          .wl-head {
            position: relative;
            margin-bottom: 60px;
            padding-top: 30px;
          }
          .wl-ghost {
            position: absolute;
            top: -34px;
            left: -12px;
            font-family: var(--display);
            font-size: clamp(6rem, 13vw, 10rem);
            font-weight: 800;
            line-height: 1;
            color: var(--ghost);
            letter-spacing: -0.04em;
            pointer-events: none;
            user-select: none;
            z-index: 0;
          }
          .wl-head > .wl-label,
          .wl-head > .wl-h2,
          .wl-head > .wl-lead {
            position: relative;
            z-index: 1;
          }

          /*
           * Buttons + sub-service cards render on next/link <Link> elements.
           * styled-jsx only auto-scopes plain DOM tags, so these selectors are
           * declared :global() under the scoped .wl root to actually match.
           */
          .wl :global(.wl-btn) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 16px 32px;
            font-weight: 700;
            font-size: 0.96rem;
            border-radius: 0;
            transition: all 0.2s ease;
          }
          .wl :global(.wl-btn--solid) {
            background: var(--ink);
            color: #fff;
          }
          .wl :global(.wl-btn--solid:hover) {
            background: var(--green);
            color: #fff;
          }
          .wl :global(.wl-btn--line) {
            background: transparent;
            color: var(--ink);
            border: 1px solid var(--ink);
          }
          .wl :global(.wl-btn--line:hover) {
            border-color: var(--green);
            color: var(--green);
          }

          /* HERO */
          .wl-hero {
            padding: 170px 0 110px;
          }
          .wl-hero__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(2.6rem, 6.4vw, 5rem);
            font-weight: 800;
            line-height: 1.02;
            letter-spacing: -0.035em;
            margin: 22px 0 26px;
            color: var(--ink);
          }
          .wl-hero__sub {
            --theme-color: #565d6b;
            font-size: 1.12rem;
            line-height: 1.75;
            color: var(--muted);
            max-width: 640px;
            margin: 0 0 38px;
          }
          .wl-hero__stats {
            display: flex;
            flex-wrap: wrap;
            gap: 0;
            border-top: 1px solid var(--line);
            border-bottom: 1px solid var(--line);
            margin-bottom: 38px;
            max-width: 640px;
          }
          .wl-hero__stat {
            flex: 1 1 220px;
            padding: 22px 26px 22px 0;
          }
          .wl-hero__stat + .wl-hero__stat {
            border-left: 1px solid var(--line);
            padding-left: 26px;
          }
          .wl-hero__stat strong {
            display: block;
            font-family: var(--display);
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--green);
          }
          .wl-hero__stat span {
            display: block;
            margin-top: 4px;
            font-size: 0.9rem;
            color: var(--muted);
          }
          .wl-hero__cta {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }

          /* NUMBERED SERVICES LIST */
          .wl-svc {
            padding: 90px 0;
            border-top: 1px solid var(--line);
          }
          .wl-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .wl-list__item {
            display: grid;
            grid-template-columns: 110px 1fr;
            gap: 26px;
            padding: 38px 0;
            border-top: 1px solid var(--line);
          }
          .wl-list__item:last-child {
            border-bottom: 1px solid var(--line);
          }
          .wl-list__n {
            font-family: var(--display);
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--green);
            line-height: 1.2;
          }
          .wl-list__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(1.25rem, 2.2vw, 1.7rem);
            font-weight: 700;
            margin: 0 0 12px;
            letter-spacing: -0.015em;
            color: var(--ink);
          }
          .wl-list__desc {
            --theme-color: #565d6b;
            font-size: 1rem;
            line-height: 1.75;
            color: var(--muted);
            margin: 0;
            max-width: 760px;
          }

          .wl-also {
            margin-top: 44px;
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 14px;
          }
          .wl-also__label {
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--ink);
            white-space: nowrap;
          }
          .wl-also__chips {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .wl-chip {
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--muted);
            border: 1px solid var(--line);
            padding: 8px 16px;
            transition: all 0.2s ease;
          }
          .wl-chip:hover {
            border-color: var(--green);
            color: var(--green);
          }

          /* HOW IT WORKS */
          .wl-how {
            padding: 90px 0;
          }
          .wl-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            border: 1px solid var(--line);
          }
          .wl-step {
            padding: 40px 30px 44px;
            border-right: 1px solid var(--line);
          }
          .wl-step:last-child {
            border-right: none;
          }
          .wl-step__n {
            display: block;
            font-family: var(--display);
            font-size: 3.4rem;
            font-weight: 800;
            line-height: 1;
            color: transparent;
            -webkit-text-stroke: 1.5px var(--green);
            margin-bottom: 22px;
          }
          .wl-step__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 10px;
            color: var(--ink);
          }
          .wl-step__desc {
            --theme-color: #565d6b;
            font-size: 0.94rem;
            line-height: 1.65;
            color: var(--muted);
            margin: 0;
          }

          /* SUB-SERVICES */
          .wl-sub {
            padding: 90px 0;
            background: #f2ebdf;
          }
          .wl-sub__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .wl :global(.wl-sub__card) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            border: 1px solid var(--line);
            background: #fff;
            padding: 26px 26px 22px;
            color: var(--ink);
            transition: border-color 0.2s ease;
          }
          .wl :global(.wl-sub__card:hover) {
            border-color: var(--green);
          }
          .wl-sub__tag {
            font-size: 0.66rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--green);
            border: 1px solid var(--green);
            padding: 4px 10px;
          }
          .wl-sub__name {
            font-family: var(--display);
            font-weight: 700;
            font-size: 1.08rem;
            margin-top: 4px;
          }
          .wl-sub__desc {
            font-size: 0.88rem;
            line-height: 1.55;
            color: var(--muted);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .wl-sub__go {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--ink);
            margin-top: 6px;
            transition: color 0.2s ease;
          }
          .wl :global(.wl-sub__card:hover .wl-sub__go) {
            color: var(--green);
          }

          /* CTA */
          .wl-cta {
            padding: 110px 0 120px;
            border-top: 1px solid var(--line);
          }
          .wl-cta__inner {
            text-align: center;
            max-width: 680px;
          }
          .wl-cta__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(2rem, 4.4vw, 3.4rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            margin: 16px 0 18px;
            color: var(--ink);
          }
          .wl-cta__sub {
            --theme-color: #565d6b;
            font-size: 1.06rem;
            line-height: 1.7;
            color: var(--muted);
            margin: 0 0 32px;
          }

          /* RESPONSIVE */
          @media (max-width: 991px) {
            .wl-hero {
              padding: 140px 0 84px;
            }
            .wl-steps {
              grid-template-columns: repeat(2, 1fr);
            }
            .wl-step:nth-child(2) {
              border-right: none;
            }
            .wl-step:nth-child(1),
            .wl-step:nth-child(2) {
              border-bottom: 1px solid var(--line);
            }
            .wl-sub__grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .wl-list__item {
              grid-template-columns: 70px 1fr;
              gap: 18px;
            }
          }
          @media (max-width: 599px) {
            .wl-wrap {
              padding: 0 18px;
            }
            .wl-list__item {
              grid-template-columns: 1fr;
              gap: 8px;
              padding: 30px 0;
            }
            .wl-steps {
              grid-template-columns: 1fr;
            }
            .wl-step {
              border-right: none;
              border-bottom: 1px solid var(--line);
            }
            .wl-step:last-child {
              border-bottom: none;
            }
            .wl-sub__grid {
              grid-template-columns: 1fr;
            }
            .wl-svc,
            .wl-how,
            .wl-sub {
              padding: 64px 0;
            }
            .wl-hero__stat + .wl-hero__stat {
              border-left: none;
              border-top: 1px solid var(--line);
              padding-left: 0;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default WhiteLabellingUsa;