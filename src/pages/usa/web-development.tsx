// BLOG TOPICS FOR CONTENT TEAM:
// 1. "Custom web development services USA: complete pricing guide 2026"
//    (custom web development services, affordable web development services)
// 2. "Web development company in USA vs offshore: pros and cons"
//    (web development company in usa, outsource web development services)
// 3. "Best web development companies in Chicago 2026"
//    (web development chicago, chicago web development company)
// 4. "Web application development services: what does it actually include?"
//    (web application development services, custom web application development services)
// 5. "WordPress development agency vs custom web development: which wins?"
//    (wordpress development agency, wordpress website development services)
// 6. "Web development services for small business: how to choose an agency"
//    (web development services for small business, small business web development agency)

/**
 * /usa/web-development — DESIGN CONCEPT: "Studio Portfolio"
 *
 * Bold, portfolio-first layout on a warm off-white (#faf6ef) base with a rich
 * orange (#0a8ef0) accent: a full-bleed hero with a CSS browser-mockup frame
 * (orange gradient "screenshot", no images), the site's largest oversized H1,
 * full-bleed orange strip section breaks, warm orange-tinted card shadows and
 * 16px rounded corners throughout, plus a CSS-only tab interface for the tech
 * stack. Deliberately distinct from the navy split-screen SaaS page, the dark
 * Neural Flow AI page and the minimal white-labelling page. Only Header +
 * Footer (via Layout) are shared.
 */

import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/data/services";

const PAGE_URL = `${SITE_URL}/usa/web-development`;

/** The four flagship USA service pages — excluded from the sub-services grid. */
const MAIN_USA_SLUGS = [
  "saas-development",
  "ai-automation",
  "web-development",
  "white-label-solutions",
];
const SUB_SERVICES = SERVICES.filter((s) => !MAIN_USA_SLUGS.includes(s.slug));

// "Top web development company" is a target keyword; the other two use the
// site-wide verified figure and an operational promise rather than
// unverified claims ("since 2019" awaits client sign-off).
const TRUST_ROW = [
  "Top web development company",
  "500+ projects delivered",
  "Full US timezone overlap",
];

const WEB_SERVICES = [
  {
    icon: "fa-solid fa-code",
    title: "Custom Web Development",
    desc: "Bespoke custom web development services built from scratch — no templates, no limits. Custom web application development services for startups and enterprises.",
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "Web Application Development",
    desc: "Full-stack web application development services — React, Next.js, Node.js. From simple web apps to complex enterprise web application development.",
  },
  {
    icon: "fa-brands fa-wordpress",
    title: "WordPress Development",
    desc: "Expert WordPress development agency services — custom themes, plugins and WordPress website development for US businesses of all sizes.",
  },
  {
    icon: "fa-solid fa-bag-shopping",
    title: "Ecommerce Web Development",
    desc: "Ecommerce web development services on Shopify, WooCommerce and custom platforms. Conversion-optimised ecommerce websites built to sell.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Progressive Web Apps",
    desc: "Progressive web app development services — apps that work offline, load instantly and feel native on any device.",
  },
  {
    icon: "fa-solid fa-store",
    title: "Website Development for Small Business",
    desc: "Affordable web development services for small businesses — professional websites that generate leads and grow with you.",
  },
];

const STACK_TABS = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Python", "PHP", "Laravel", "Express.js"],
  },
  {
    id: "cms",
    label: "CMS",
    items: ["WordPress", "Webflow", "Contentful", "Sanity"],
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    items: ["Shopify", "WooCommerce", "Magento", "Custom Cart"],
  },
];

const CITIES = ["New York", "Chicago", "Los Angeles", "Houston"];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Development Services",
  name: "Custom Web Development Services USA",
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
    "Custom web development services for US businesses including web application development, WordPress development and ecommerce web development.",
  url: PAGE_URL,
};

const WebDevelopmentUsa = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Custom Web Development Services USA | Quantel Solutions"
        description="Expert custom web development services for US businesses. Web application development services, custom web development company & wordpress development agency. London-based global team. Book a free call."
        pathname="/usa/web-development"
        keywords={[
          "custom web development services",
          "web application development services",
          "website development services",
          "web development companies",
          "custom web development company",
          "wordpress development company",
          "wordpress development agency",
          "web app development services",
          "custom website development services",
          "custom web application development services",
          "ecommerce web development services",
          "ecommerce website development services",
          "wordpress website development services",
          "web development company in usa",
          "website development company in usa",
          "web development services in usa",
          "web development chicago",
          "affordable web development services",
          "web development services for small business",
          "progressive web app development services",
          "website design and development services",
          "web development services usa",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "United States", url: `${SITE_URL}/usa` },
          { name: "Web Development", url: PAGE_URL },
        ]}
        jsonLd={serviceJsonLd}
      >
        <link
          rel="alternate"
          hrefLang="en-US"
          href={PAGE_URL}
          key="hreflang-usa-web"
        />
      </Seo>

      <div className="sp">
        {/* ============================ HERO ============================ */}
        <section className="sp-hero" aria-labelledby="sp-hero-title">
          <div className="sp-wrap sp-hero__grid">
            <div className="sp-hero__copy">
              <span className="sp-eyebrow">🇺🇸 Web Development Services USA</span>
              <h1 id="sp-hero-title" className="sp-hero__title">
                Custom Web Development Services for the USA
              </h1>
              <p className="sp-hero__sub">
                Quantel Solutions is a custom web development company serving
                businesses across the United States. Web application development
                services, WordPress development, ecommerce web development
                services and custom web app development — all under one roof.
              </p>
              <div className="sp-hero__cta">
                <Link href="/contact" className="sp-btn sp-btn--primary">
                  Get a Free Web Development Quote
                </Link>
                <Link href="/success-stories" className="sp-btn sp-btn--ghost">
                  View Web Projects
                </Link>
              </div>
              <ul className="sp-hero__trust">
                {TRUST_ROW.map((t) => (
                  <li key={t}>
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sp-hero__mock" aria-hidden="true">
              <div className="sp-browser">
                <div className="sp-browser__chrome">
                  <span className="sp-browser__dots">
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                  <span className="sp-browser__url">
                    yourbusiness.com
                  </span>
                </div>
                <div className="sp-browser__view">
                  <span className="sp-browser__nav" />
                  <span className="sp-browser__headline" />
                  <span className="sp-browser__line" />
                  <span className="sp-browser__line sp-browser__line--short" />
                  <span className="sp-browser__cta" />
                  <div className="sp-browser__cards">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="sp-hero__chip">
                <i className="fa-solid fa-gauge-high" aria-hidden="true"></i>
                100/100 PageSpeed
              </div>
            </div>
          </div>
        </section>

        {/* ============================ ORANGE STRIP ==================== */}
        <div className="sp-strip" aria-hidden="true">
          <div className="sp-strip__track">
            <span>WHAT WE BUILD</span>
            <span>·</span>
            <span>WHAT WE BUILD</span>
            <span>·</span>
            <span>WHAT WE BUILD</span>
            <span>·</span>
            <span>WHAT WE BUILD</span>
          </div>
        </div>

        {/* ============================ SERVICES GRID =================== */}
        <section className="sp-svc" aria-labelledby="sp-svc-title">
          <div className="sp-wrap">
            <header className="sp-head">
              <span className="sp-kicker">Our services</span>
              <h2 id="sp-svc-title" className="sp-h2">
                Our Web Development Services in the USA
              </h2>
              <p className="sp-lead">
                From website design and development services to full custom
                website development services — we're the web development services
                company US teams call when template builders stop being enough.
              </p>
            </header>
            <div className="sp-svc__grid">
              {WEB_SERVICES.map((c) => (
                <article className="sp-card" key={c.title}>
                  <span className="sp-card__icon" aria-hidden="true">
                    <i className={c.icon}></i>
                  </span>
                  <h3 className="sp-card__title">{c.title}</h3>
                  <p className="sp-card__desc">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ TECH STACK (CSS tabs) =========== */}
        <section className="sp-stack" aria-labelledby="sp-stack-title">
          <div className="sp-wrap">
            <header className="sp-head">
              <span className="sp-kicker">Tooling</span>
              <h2 id="sp-stack-title" className="sp-h2">
                Web Development Technologies
              </h2>
            </header>

            <div className="sp-tabs">
              {STACK_TABS.map((t, i) => (
                <input
                  key={t.id}
                  type="radio"
                  name="sp-stack-tab"
                  id={`sp-tab-${t.id}`}
                  className={`sp-tabs__radio sp-tabs__radio--${t.id}`}
                  defaultChecked={i === 0}
                />
              ))}

              <div className="sp-tabs__labels" role="tablist">
                {STACK_TABS.map((t) => (
                  <label
                    key={t.id}
                    htmlFor={`sp-tab-${t.id}`}
                    className={`sp-tabs__label sp-tabs__label--${t.id}`}
                  >
                    {t.label}
                  </label>
                ))}
              </div>

              <div className="sp-tabs__panels">
                {STACK_TABS.map((t) => (
                  <div
                    key={t.id}
                    className={`sp-tabs__panel sp-tabs__panel--${t.id}`}
                  >
                    <ul className="sp-tabs__chips">
                      {t.items.map((item) => (
                        <li className="sp-chip" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <p className="sp-stack__note">
              Also available: PHP web development services, Python web
              development services, Node JS web development services and web
              portal development services.
            </p>
          </div>
        </section>

        {/* ============================ LOCATION ======================== */}
        <section className="sp-loc" aria-labelledby="sp-loc-title">
          <div className="sp-wrap sp-loc__inner">
            <h2 id="sp-loc-title" className="sp-loc__title">
              Web Development Company Serving USA
            </h2>
            <p className="sp-loc__sub">
              We serve web development clients across the United States — from
              web development in Chicago to web development companies in New
              York, LA and beyond. As a London-based web development company in
              USA, we provide full US timezone overlap and async-friendly project
              management.
            </p>
            <ul className="sp-loc__pills">
              {CITIES.map((c) => (
                <li className="sp-pill" key={c}>
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================ SUB-SERVICES (#f8fafc) ========== */}
        <section className="sp-sub" aria-labelledby="sp-sub-title">
          <div className="sp-wrap">
            <header className="sp-head">
              <span className="sp-kicker">Beyond the build</span>
              <h2 id="sp-sub-title" className="sp-h2">
                More Services from Quantel USA
              </h2>
            </header>
            <div className="sp-sub__grid">
              {SUB_SERVICES.map((s) => (
                <Link href="/usa" className="sp-sub__card" key={s.slug}>
                  <span className="sp-sub__tag">Available in USA</span>
                  <span className="sp-sub__icon" aria-hidden="true">
                    <i className={s.icon}></i>
                  </span>
                  <span className="sp-sub__name">{s.name}</span>
                  <span className="sp-sub__desc">{s.heroDescription}</span>
                  <i
                    className="fa-solid fa-arrow-right sp-sub__arrow"
                    aria-hidden="true"
                  ></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ CTA ============================= */}
        <section className="sp-cta" aria-labelledby="sp-cta-title">
          <div className="sp-wrap sp-cta__inner">
            <h2 id="sp-cta-title" className="sp-cta__title">
              Let's build a website that works as hard as you do
            </h2>
            <p className="sp-cta__sub">
              Get a free web development quote — we'll reply with a plan,
              timeline and ballpark within 24 hours.
            </p>
            <Link href="/contact" className="sp-btn sp-btn--invert">
              Get a Free Web Development Quote
            </Link>
          </div>
        </section>

        <style jsx>{`
          .sp {
            /* Site "Daylight Studio" tokens (see _variables.scss). The accent
               var keeps its --orange name but now carries --brand-blue. */
            --base: #faf6ef;
            --ink: #16181f;
            --muted: #565d6b;
            --orange: #0a8ef0;
            --orange-soft: rgba(10, 142, 240, 0.1);
            --line: #e8e0d2;
            --shadow-warm: 0 20px 46px rgba(30, 134, 214, 0.16);
            background: var(--base);
            color: var(--ink);
            overflow: hidden;
          }
          .sp :global(a) {
            text-decoration: none;
          }
          .sp-wrap {
            width: 100%;
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .sp-kicker {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: var(--orange);
          }
          .sp-kicker::before {
            content: "";
            width: 28px;
            height: 3px;
            border-radius: 3px;
            background: var(--orange);
          }
          /*
           * NOTE: the global reset forces h1-h6/p color to
           * var(--theme-color) with !important, so heading/paragraph rules
           * re-declare --theme-color locally (same pattern as .geo-cta__inner).
           */
          .sp-h2 {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(1.8rem, 3.4vw, 2.7rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin: 12px 0 0;
            color: var(--ink);
          }
          .sp-lead {
            --theme-color: #565d6b;
            margin: 16px 0 0;
            font-size: 1.02rem;
            line-height: 1.7;
            color: var(--muted);
            max-width: 640px;
          }
          .sp-head {
            margin-bottom: 48px;
          }

          /*
           * Buttons + sub-service cards render on next/link <Link> elements.
           * styled-jsx only auto-scopes plain DOM tags, so these selectors are
           * declared :global() under the scoped .sp root to actually match.
           */
          .sp :global(.sp-btn) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 16px 30px;
            border-radius: 16px;
            font-weight: 700;
            font-size: 0.98rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .sp :global(.sp-btn--primary) {
            background: var(--orange);
            color: #fff;
            box-shadow: 0 14px 32px rgba(10, 142, 240, 0.35);
          }
          .sp :global(.sp-btn--primary:hover) {
            transform: translateY(-2px);
            box-shadow: 0 18px 40px rgba(10, 142, 240, 0.45);
            color: #fff;
          }
          .sp :global(.sp-btn--ghost) {
            background: #fff;
            color: var(--ink);
            border: 1.5px solid var(--line);
          }
          .sp :global(.sp-btn--ghost:hover) {
            border-color: var(--orange);
            color: var(--orange);
          }
          .sp :global(.sp-btn--invert) {
            background: #fff;
            color: var(--orange);
          }
          .sp :global(.sp-btn--invert:hover) {
            transform: translateY(-2px);
            box-shadow: 0 16px 36px rgba(28, 25, 23, 0.28);
            color: var(--orange);
          }

          /* HERO */
          .sp-hero {
            padding: 160px 0 90px;
          }
          .sp-hero__grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: center;
          }
          .sp-eyebrow {
            display: inline-block;
            font-size: 0.84rem;
            font-weight: 700;
            color: var(--orange);
            background: var(--orange-soft);
            padding: 8px 18px;
            border-radius: 999px;
            margin-bottom: 24px;
          }
          .sp-hero__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(2.5rem, 5.4vw, 4.4rem);
            font-weight: 800;
            line-height: 1.02;
            letter-spacing: -0.035em;
            margin: 0 0 22px;
            color: var(--ink);
          }
          .sp-hero__sub {
            --theme-color: #565d6b;
            font-size: 1.08rem;
            line-height: 1.72;
            color: var(--muted);
            margin: 0 0 30px;
            max-width: 540px;
          }
          .sp-hero__cta {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-bottom: 30px;
          }
          .sp-hero__trust {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 12px 26px;
          }
          .sp-hero__trust li {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            font-size: 0.92rem;
            font-weight: 600;
            color: var(--ink);
          }
          .sp-hero__trust i {
            color: var(--orange);
            font-size: 0.85rem;
          }

          /* Browser mockup */
          .sp-hero__mock {
            position: relative;
          }
          .sp-browser {
            border-radius: 16px;
            background: #fff;
            border: 1px solid var(--line);
            box-shadow: var(--shadow-warm), 0 40px 90px rgba(28, 25, 23, 0.14);
            overflow: hidden;
            transform: rotate(1.2deg);
          }
          .sp-browser__chrome {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 18px;
            background: #f2ebdf;
            border-bottom: 1px solid var(--line);
          }
          .sp-browser__dots {
            display: flex;
            gap: 6px;
          }
          .sp-browser__dots i {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #d8cebb;
          }
          .sp-browser__url {
            flex: 1;
            font-size: 0.8rem;
            color: var(--muted);
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 8px;
            padding: 6px 14px;
          }
          .sp-browser__view {
            position: relative;
            padding: 26px 26px 30px;
            min-height: 330px;
            background: linear-gradient(
              145deg,
              #1fc4f5 0%,
              #0a7ce8 45%,
              #16355c 100%
            );
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .sp-browser__nav {
            height: 12px;
            width: 55%;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.5);
          }
          .sp-browser__headline {
            margin-top: 18px;
            height: 26px;
            width: 70%;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
          }
          .sp-browser__line {
            height: 12px;
            width: 85%;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.55);
          }
          .sp-browser__line--short {
            width: 60%;
          }
          .sp-browser__cta {
            margin-top: 6px;
            height: 34px;
            width: 150px;
            border-radius: 10px;
            background: #111219;
          }
          .sp-browser__cards {
            margin-top: auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .sp-browser__cards span {
            height: 62px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
          .sp-hero__chip {
            position: absolute;
            bottom: -18px;
            left: -14px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 12px 20px;
            font-weight: 700;
            font-size: 0.9rem;
            color: var(--ink);
            box-shadow: var(--shadow-warm);
          }
          .sp-hero__chip i {
            color: var(--orange);
          }

          /* ORANGE STRIP */
          .sp-strip {
            background: var(--orange);
            padding: 20px 0;
            overflow: hidden;
          }
          .sp-strip__track {
            display: flex;
            gap: 34px;
            white-space: nowrap;
            font-family: var(--display);
            font-size: 1.25rem;
            font-weight: 800;
            letter-spacing: 0.24em;
            color: #fff;
            justify-content: center;
          }

          /* SERVICES GRID */
          .sp-svc {
            padding: 100px 0;
            background: #fff;
          }
          .sp-svc__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .sp-card {
            background: var(--base);
            border: 1px solid var(--line);
            border-radius: 16px;
            padding: 32px 28px;
            transition: transform 0.22s ease, box-shadow 0.22s ease;
          }
          .sp-card:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-warm);
          }
          .sp-card__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            border-radius: 14px;
            background: var(--orange-soft);
            color: var(--orange);
            font-size: 1.35rem;
            margin-bottom: 18px;
          }
          .sp-card__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0 0 10px;
            color: var(--ink);
          }
          .sp-card__desc {
            --theme-color: #565d6b;
            font-size: 0.96rem;
            line-height: 1.68;
            color: var(--muted);
            margin: 0;
          }

          /* TECH STACK — CSS-only tabs */
          .sp-stack {
            padding: 100px 0;
          }
          .sp-tabs__radio {
            position: absolute;
            opacity: 0;
            pointer-events: none;
          }
          .sp-tabs__labels {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 26px;
          }
          .sp-tabs__label {
            cursor: pointer;
            padding: 13px 28px;
            border-radius: 16px;
            border: 1.5px solid var(--line);
            background: #fff;
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--muted);
            transition: all 0.2s ease;
            user-select: none;
          }
          .sp-tabs__label:hover {
            border-color: var(--orange);
            color: var(--orange);
          }
          .sp-tabs__panel {
            display: none;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 16px;
            padding: 34px 32px;
            box-shadow: var(--shadow-warm);
          }
          .sp-tabs__radio--frontend:checked
            ~ .sp-tabs__labels
            .sp-tabs__label--frontend,
          .sp-tabs__radio--backend:checked
            ~ .sp-tabs__labels
            .sp-tabs__label--backend,
          .sp-tabs__radio--cms:checked ~ .sp-tabs__labels .sp-tabs__label--cms,
          .sp-tabs__radio--ecommerce:checked
            ~ .sp-tabs__labels
            .sp-tabs__label--ecommerce {
            background: var(--orange);
            border-color: var(--orange);
            color: #fff;
          }
          .sp-tabs__radio--frontend:checked
            ~ .sp-tabs__panels
            .sp-tabs__panel--frontend,
          .sp-tabs__radio--backend:checked
            ~ .sp-tabs__panels
            .sp-tabs__panel--backend,
          .sp-tabs__radio--cms:checked ~ .sp-tabs__panels .sp-tabs__panel--cms,
          .sp-tabs__radio--ecommerce:checked
            ~ .sp-tabs__panels
            .sp-tabs__panel--ecommerce {
            display: block;
          }
          .sp-tabs__chips {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }
          .sp-chip {
            padding: 13px 26px;
            border-radius: 999px;
            background: var(--base);
            border: 1px solid var(--line);
            font-weight: 600;
            font-size: 0.98rem;
            color: var(--ink);
            transition: all 0.2s ease;
          }
          .sp-chip:hover {
            border-color: var(--orange);
            color: var(--orange);
            transform: translateY(-2px);
          }
          .sp-stack__note {
            --theme-color: #565d6b;
            margin: 22px 0 0;
            font-size: 0.94rem;
            line-height: 1.65;
            color: var(--muted);
          }

          /* LOCATION — full-bleed orange band */
          .sp-loc {
            background: linear-gradient(120deg, #0a8ef0, #0a6cc4);
            padding: 90px 0;
          }
          .sp-loc__inner {
            text-align: center;
            max-width: 820px;
          }
          .sp-loc__title {
            --theme-color: #ffffff;
            font-family: var(--display);
            font-size: clamp(1.8rem, 3.4vw, 2.6rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #fff;
            margin: 0 0 18px;
          }
          .sp-loc__sub {
            --theme-color: rgba(255, 255, 255, 0.92);
            font-size: 1.04rem;
            line-height: 1.75;
            color: rgba(255, 255, 255, 0.92);
            margin: 0 0 30px;
          }
          .sp-loc__pills {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }
          .sp-pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.35);
            color: #fff;
            font-weight: 600;
            font-size: 0.95rem;
          }

          /* SUB-SERVICES */
          .sp-sub {
            padding: 100px 0;
            background: #f2ebdf;
          }
          .sp-sub__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .sp :global(.sp-sub__card) {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 24px 24px 20px;
            border-radius: 16px;
            background: #fff;
            border: 1px solid var(--line);
            color: var(--ink);
            transition: all 0.2s ease;
          }
          .sp :global(.sp-sub__card:hover) {
            border-color: var(--orange);
            transform: translateY(-4px);
            box-shadow: var(--shadow-warm);
          }
          .sp-sub__tag {
            display: inline-block;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--orange);
            background: var(--orange-soft);
            padding: 4px 10px;
            border-radius: 999px;
          }
          .sp-sub__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--orange-soft);
            color: var(--orange);
            font-size: 1.1rem;
          }
          .sp-sub__name {
            font-family: var(--display);
            font-weight: 700;
            font-size: 1.05rem;
          }
          .sp-sub__desc {
            font-size: 0.88rem;
            line-height: 1.55;
            color: var(--muted);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .sp-sub__arrow {
            color: #8a8f9c;
            transition: transform 0.2s ease, color 0.2s ease;
          }
          .sp :global(.sp-sub__card:hover .sp-sub__arrow) {
            color: var(--orange);
            transform: translateX(4px);
          }

          /* CTA */
          .sp-cta {
            background: #111219; /* --surface-dark island */
            padding: 110px 0;
          }
          .sp-cta__inner {
            text-align: center;
            max-width: 720px;
          }
          .sp-cta__title {
            --theme-color: #ffffff;
            font-family: var(--display);
            font-size: clamp(1.9rem, 3.6vw, 2.9rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #fff;
            margin: 0 0 16px;
          }
          .sp-cta__sub {
            --theme-color: #d8cebb;
            font-size: 1.06rem;
            line-height: 1.7;
            color: #d8cebb;
            margin: 0 0 30px;
          }

          /* RESPONSIVE */
          @media (max-width: 991px) {
            .sp-hero {
              padding: 140px 0 80px;
            }
            .sp-hero__grid {
              grid-template-columns: 1fr;
              gap: 60px;
            }
            .sp-svc__grid,
            .sp-sub__grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 599px) {
            .sp-wrap {
              padding: 0 18px;
            }
            .sp-svc__grid,
            .sp-sub__grid {
              grid-template-columns: 1fr;
            }
            .sp-svc,
            .sp-stack,
            .sp-sub {
              padding: 64px 0;
            }
            .sp-loc {
              padding: 70px 0;
            }
            .sp-browser__view {
              min-height: 260px;
            }
            .sp-hero__chip {
              left: 0;
            }
            .sp-strip__track {
              font-size: 1rem;
            }
            .sp-tabs__label {
              padding: 11px 20px;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default WebDevelopmentUsa;
