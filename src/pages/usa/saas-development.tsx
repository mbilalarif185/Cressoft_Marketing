// BLOG TOPICS FOR CONTENT TEAM:
// 1. "How much does SaaS development cost in the USA in 2026?" (saas development cost)
// 2. "Custom SaaS development vs buying off-the-shelf software"
// 3. "SaaS development process: step by step guide for US startups"
// 4. "Best SaaS development companies in the USA 2026"
// 5. "How to build a SaaS MVP in 8 weeks"
// 6. "SaaS product development services: what to look for in an agency"

/**
 * /usa/saas-development — DESIGN CONCEPT: "Command Center"
 *
 * A split-screen layout: a dark navy (#16181f) command panel paired with a
 * white content area. Section backgrounds alternate white → light gray
 * (#f2ebdf) → white, cards carry a left electric-blue (#0a8ef0) border accent,
 * and diagonal clip-path cuts transition between bands. Deliberately distinct
 * from every other service page on the site — all sections below are bespoke;
 * only Header + Footer (via Layout) are shared.
 */

import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/data/services";

const PAGE_URL = `${SITE_URL}/usa/saas-development`;

/** The four flagship USA service pages — excluded from the sub-services grid. */
const MAIN_USA_SLUGS = [
  "saas-development",
  "ai-automation",
  "web-development",
  "white-label-solutions",
];
const SUB_SERVICES = SERVICES.filter((s) => !MAIN_USA_SLUGS.includes(s.slug));

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "5+", label: "Years Experience" },
];

const TRUST = [
  "Custom SaaS development from $5k",
  "SaaS MVP ready in 8–12 weeks",
  "US timezone overlap guaranteed",
  "Post-launch SaaS support included",
];

const WHAT_WE_BUILD = [
  {
    icon: "fa-solid fa-cubes-stacked",
    title: "Custom SaaS Development",
    desc: "End-to-end custom SaaS development services tailored to your business model and users.",
  },
  {
    icon: "fa-solid fa-box-open",
    title: "SaaS Product Development",
    desc: "Full SaaS product development from idea to launch — design, build, test, deploy.",
  },
  {
    icon: "fa-solid fa-sitemap",
    title: "SaaS Platform Development",
    desc: "Scalable SaaS platform development for enterprise and multi-tenant architectures.",
  },
  {
    icon: "fa-solid fa-mobile-screen-button",
    title: "SaaS App Development",
    desc: "Native SaaS app development services for web, iOS and Android platforms.",
  },
  {
    icon: "fa-solid fa-rocket",
    title: "SaaS MVP Development",
    desc: "SaaS MVP development services to validate your idea fast — launch in 8 weeks.",
  },
  {
    icon: "fa-solid fa-building-shield",
    title: "Enterprise SaaS Development",
    desc: "Enterprise SaaS development services built for compliance, security and scale.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We analyse your SaaS product requirements, market fit and technical architecture needs.",
  },
  {
    step: "02",
    title: "Design",
    desc: "UI/UX design for your SaaS application — wireframes, prototypes and user flows.",
  },
  {
    step: "03",
    title: "Development",
    desc: "Agile SaaS software development with weekly sprints, demos and progress updates.",
  },
  {
    step: "04",
    title: "QA Testing",
    desc: "QA testing for your SaaS development — performance, security and user acceptance.",
  },
  {
    step: "05",
    title: "Launch & Scale",
    desc: "SaaS platform launch and ongoing SaaS development consulting post go-live.",
  },
];

const WHY = [
  {
    q: "Custom SaaS development at competitive rates",
    a: "Our SaaS development outsourcing model gives US companies London-quality SaaS software development at significantly lower cost than hiring a local SaaS development agency.",
  },
  {
    q: "AI SaaS development capability",
    a: "We are an AI SaaS development company — every SaaS product we build can be enhanced with AI automation, LLM integration and intelligent workflow automation.",
  },
  {
    q: "SaaS development consulting included",
    a: "Every project includes SaaS development consulting — we advise on architecture, tech stack, scaling strategy and SaaS development life cycle management.",
  },
  {
    q: "Top SaaS development company track record",
    a: "Ranked among top SaaS development companies by our clients — 98% retention rate across 500+ projects delivered globally.",
  },
];

const TECHS = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "AWS",
  "Azure",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "Stripe",
  "Twilio",
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SaaS Development Services",
  name: "SaaS Development Services USA",
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
    "Custom SaaS development services for US businesses including SaaS product development, SaaS application development and SaaS platform development.",
  url: PAGE_URL,
};

const SaasDevelopmentUsa = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="SaaS Development Services USA | Quantel Solutions"
        description="Expert SaaS development services for US businesses. Custom SaaS application development, SaaS product development & SaaS platform development. London-based global team. Book a free call."
        pathname="/usa/saas-development"
        keywords={[
          "saas development services",
          "saas development company",
          "saas application development services",
          "saas product development",
          "saas application development",
          "saas product development services",
          "saas software development services",
          "custom saas development",
          "saas app development services",
          "saas application development company",
          "saas product development company",
          "saas app development company",
          "saas development agency",
          "saas platform development",
          "ai saas development company",
          "saas development consulting",
          "custom saas development services",
          "enterprise saas development services",
          "saas development outsourcing",
          "saas mvp development services",
          "top saas development companies",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "United States", url: `${SITE_URL}/usa` },
          { name: "SaaS Development", url: PAGE_URL },
        ]}
        jsonLd={serviceJsonLd}
      >
        <link
          rel="alternate"
          hrefLang="en-US"
          href={PAGE_URL}
          key="hreflang-usa-saas"
        />
      </Seo>

      <div className="cmd">
        {/* ============================ HERO — split 45/55 ================= */}
        <section className="cmd-hero" aria-labelledby="cmd-hero-title">
          <div className="cmd-hero__left">
            <span className="cmd-hero__watermark" aria-hidden="true">
              SaaS
            </span>
            <div className="cmd-hero__stats" aria-hidden="true">
              {STATS.map((s) => (
                <div className="cmd-stat" key={s.label}>
                  <span className="cmd-stat__value">{s.value}</span>
                  <span className="cmd-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cmd-hero__right">
            <span className="cmd-eyebrow">🇺🇸 SaaS Development Services USA</span>
            <h1 id="cmd-hero-title" className="cmd-hero__title">
              SaaS Development Services for US Businesses
            </h1>
            <p className="cmd-hero__sub">
              We deliver custom SaaS application development services for startups
              and enterprises across the United States. From SaaS product
              development to full SaaS platform development — fully built and
              launched for you.
            </p>

            <div className="cmd-hero__cta">
              <Link href="/contact" className="cmd-btn cmd-btn--primary">
                Get a Free SaaS Consultation
              </Link>
              <Link href="/success-stories" className="cmd-btn cmd-btn--ghost">
                View Our SaaS Projects
              </Link>
            </div>

            <ul className="cmd-hero__trust">
              {TRUST.map((t) => (
                <li key={t}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================ WHAT WE BUILD (white) ============= */}
        <section className="cmd-build" aria-labelledby="cmd-build-title">
          <div className="cmd-wrap">
            <header className="cmd-head">
              <span className="cmd-kicker">What we build</span>
              <h2 id="cmd-build-title" className="cmd-h2">
                Our SaaS Application Development Services
              </h2>
              <p className="cmd-lead">
                Quantel is a SaaS development company and SaaS application
                development company trusted by US startups and enterprises. Our
                SaaS development services cover the full SaaS development life
                cycle — from SaaS product development services and custom SaaS
                solutions to SaaS web application development and SaaS
                implementation services.
              </p>
            </header>

            <div className="cmd-grid">
              {WHAT_WE_BUILD.map((c) => (
                <article className="cmd-card" key={c.title}>
                  <span className="cmd-card__icon" aria-hidden="true">
                    <i className={c.icon}></i>
                  </span>
                  <h3 className="cmd-card__title">{c.title}</h3>
                  <p className="cmd-card__desc">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ PROCESS (gray, diagonal) ========== */}
        <section className="cmd-process" aria-labelledby="cmd-process-title">
          <div className="cmd-wrap">
            <header className="cmd-head">
              <span className="cmd-kicker">How we work</span>
              <h2 id="cmd-process-title" className="cmd-h2">
                Our SaaS Development Process
              </h2>
            </header>

            <ol className="cmd-timeline">
              {PROCESS.map((p) => (
                <li className="cmd-timeline__item" key={p.step}>
                  <span className="cmd-timeline__node" aria-hidden="true">
                    {p.step}
                  </span>
                  <div className="cmd-timeline__body">
                    <h3 className="cmd-timeline__title">{p.title}</h3>
                    <p className="cmd-timeline__desc">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================ WHY US (white, 2-col) ============= */}
        <section className="cmd-why" aria-labelledby="cmd-why-title">
          <div className="cmd-wrap cmd-why__grid">
            <div className="cmd-why__intro">
              <span className="cmd-kicker">Why Quantel</span>
              <h2 id="cmd-why-title" className="cmd-h2">
                Why US Companies Choose Quantel for SaaS Development
              </h2>
              <div className="cmd-why__visual" aria-hidden="true">
                <span className="cmd-why__watermark">&lt;/&gt;</span>
                <div className="cmd-why__pulse">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <div className="cmd-why__list">
              {WHY.map((item, i) => (
                <details className="cmd-acc" key={item.q} open={i === 0}>
                  <summary className="cmd-acc__q">
                    <span>{item.q}</span>
                    <i className="fa-solid fa-plus" aria-hidden="true"></i>
                  </summary>
                  <p className="cmd-acc__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ TECHNOLOGIES (gray) ============== */}
        <section className="cmd-tech" aria-labelledby="cmd-tech-title">
          <div className="cmd-wrap">
            <header className="cmd-head">
              <span className="cmd-kicker">Our stack</span>
              <h2 id="cmd-tech-title" className="cmd-h2">
                SaaS Development Technologies We Use
              </h2>
            </header>
            <ul className="cmd-badges">
              {TECHS.map((t) => (
                <li className="cmd-badge" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================ SUB-SERVICES (#f2ebdf) =========== */}
        <section className="cmd-sub" aria-labelledby="cmd-sub-title">
          <div className="cmd-wrap">
            <header className="cmd-head">
              <span className="cmd-kicker">More ways we help</span>
              <h2 id="cmd-sub-title" className="cmd-h2">
                More Services from Quantel USA
              </h2>
            </header>
            <div className="cmd-sub__grid">
              {SUB_SERVICES.map((s) => (
                <Link href="/usa" className="cmd-sub__card" key={s.slug}>
                  <span className="cmd-sub__tag">Available in USA</span>
                  <span className="cmd-sub__icon" aria-hidden="true">
                    <i className={s.icon}></i>
                  </span>
                  <span className="cmd-sub__name">{s.name}</span>
                  <span className="cmd-sub__desc">{s.heroDescription}</span>
                  <i
                    className="fa-solid fa-arrow-right cmd-sub__arrow"
                    aria-hidden="true"
                  ></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ CTA — split "mission brief" ====== */}
        <section className="cmd-cta" aria-labelledby="cmd-cta-title">
          <div className="cmd-wrap">
            <div className="cmd-cta__panel">
              <div className="cmd-cta__brief">
                <span className="cmd-cta__watermark" aria-hidden="true">
                  SaaS
                </span>
                <span className="cmd-cta__eyebrow">Your brief · Our build</span>
                <h2 id="cmd-cta-title" className="cmd-cta__title">
                  Ready to build your SaaS product?
                </h2>
                <p className="cmd-cta__sub">
                  Book a free SaaS consultation with our US-facing team. Tell us
                  what you're building — we take it from there.
                </p>
              </div>

              <div className="cmd-cta__action">
                <span className="cmd-cta__promise">
                  Within 24 hours you get
                </span>
                <ul className="cmd-cta__list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    A written SaaS build plan
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    Timeline with milestones
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    A transparent ballpark cost
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="cmd-btn cmd-btn--primary cmd-cta__btn"
                >
                  Get a Free SaaS Consultation
                </Link>
                <p className="cmd-cta__note">
                  Free consultation · US timezone overlap · No obligation
                </p>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .cmd {
            /* Site "Daylight Studio" tokens (see _variables.scss). */
            --navy: #111219; /* --surface-dark */
            --blue: #0a8ef0; /* --brand-blue */
            --gray: #f2ebdf; /* --surface-sunken */
            --slate: #565d6b; /* --ink-soft */
            color: #16181f;
            background: #faf6ef;
            overflow: hidden;
          }
          .cmd :global(a) {
            text-decoration: none;
          }
          .cmd-wrap {
            width: 100%;
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 24px;
          }
          /*
           * NOTE: the global reset forces h1-h6/p color to
           * var(--theme-color) with !important, so every heading/paragraph
           * rule below re-declares --theme-color locally (same pattern as
           * .geo-cta__inner) instead of fighting the !important.
           */
          .cmd-h2 {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(1.7rem, 3.2vw, 2.6rem);
            line-height: 1.12;
            font-weight: 800;
            margin: 10px 0 0;
            color: #16181f;
            letter-spacing: -0.02em;
          }
          .cmd-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: var(--blue);
          }
          .cmd-kicker::before {
            content: "";
            width: 26px;
            height: 2px;
            background: var(--blue);
          }
          .cmd-head {
            max-width: 720px;
            margin-bottom: 48px;
          }
          .cmd-lead {
            --theme-color: #565d6b;
            margin: 18px 0 0;
            font-size: 1.02rem;
            line-height: 1.7;
            color: var(--slate);
          }

          /*
           * Buttons + sub-service cards render on next/link <Link> elements.
           * styled-jsx only auto-scopes plain DOM tags, so these selectors are
           * declared :global() under the scoped .cmd root to actually match.
           */
          .cmd :global(.cmd-btn) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 15px 28px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.98rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease,
              background 0.2s ease;
          }
          .cmd :global(.cmd-btn--primary) {
            background: var(--blue);
            color: #fff;
            box-shadow: 0 12px 28px rgba(10, 142, 240, 0.35);
          }
          .cmd :global(.cmd-btn--primary:hover) {
            transform: translateY(-2px);
            box-shadow: 0 16px 34px rgba(10, 142, 240, 0.45);
            color: #fff;
          }
          .cmd :global(.cmd-btn--ghost) {
            background: transparent;
            color: #16181f;
            border: 1.5px solid #d8cebb;
          }
          .cmd :global(.cmd-btn--ghost:hover) {
            border-color: var(--blue);
            color: var(--blue);
          }

          /* ---------------- HERO ---------------- */
          .cmd-hero {
            display: grid;
            grid-template-columns: 45% 55%;
            min-height: 100vh;
          }
          .cmd-hero__left {
            position: relative;
            background: var(--navy);
            padding: 120px 48px 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
          }
          .cmd-hero__left::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 30% 20%,
              rgba(10, 142, 240, 0.22),
              transparent 55%
            );
          }
          .cmd-hero__watermark {
            position: absolute;
            top: 50%;
            left: -4%;
            transform: translateY(-50%);
            font-family: var(--display);
            font-size: clamp(9rem, 20vw, 20rem);
            font-weight: 800;
            line-height: 0.8;
            color: transparent;
            -webkit-text-stroke: 2px rgba(148, 163, 184, 0.28);
            letter-spacing: -0.04em;
            pointer-events: none;
            user-select: none;
          }
          .cmd-hero__stats {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 18px;
            align-items: flex-start;
          }
          .cmd-stat {
            background: rgba(17, 18, 25, 0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-left: 3px solid var(--blue);
            border-radius: 12px;
            padding: 18px 24px;
            min-width: 210px;
            box-shadow: 0 18px 40px rgba(2, 6, 23, 0.5);
          }
          .cmd-stat:nth-child(2) {
            margin-left: 40px;
          }
          .cmd-stat:nth-child(3) {
            margin-left: 20px;
          }
          .cmd-stat__value {
            display: block;
            font-family: var(--display);
            font-size: 2.2rem;
            font-weight: 800;
            color: #fff;
            line-height: 1;
          }
          .cmd-stat__label {
            display: block;
            margin-top: 6px;
            font-size: 0.82rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #8a8f9c;
          }
          .cmd-hero__right {
            padding: 120px 56px 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #faf6ef;
          }
          .cmd-eyebrow {
            display: inline-block;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            color: var(--blue);
            background: rgba(10, 142, 240, 0.1);
            padding: 8px 16px;
            border-radius: 999px;
            width: fit-content;
            margin-bottom: 22px;
          }
          .cmd-hero__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: clamp(2.1rem, 4vw, 3.4rem);
            font-weight: 800;
            line-height: 1.06;
            letter-spacing: -0.03em;
            margin: 0 0 20px;
            color: #16181f;
          }
          .cmd-hero__sub {
            --theme-color: #565d6b;
            font-size: 1.08rem;
            line-height: 1.7;
            color: var(--slate);
            margin: 0 0 30px;
            max-width: 560px;
          }
          .cmd-hero__cta {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-bottom: 34px;
          }
          .cmd-hero__trust {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px 24px;
          }
          .cmd-hero__trust li {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.95rem;
            font-weight: 500;
            color: #16181f;
          }
          .cmd-hero__trust i {
            color: var(--blue);
            font-size: 1rem;
          }

          /* ---------------- WHAT WE BUILD ---------------- */
          .cmd-build {
            background: #faf6ef;
            padding: 100px 0;
          }
          .cmd-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
          }
          .cmd-card {
            background: #fff;
            border: 1px solid #e8e0d2;
            border-left: 4px solid var(--blue);
            border-radius: 12px;
            padding: 30px 26px;
            transition: transform 0.22s ease, box-shadow 0.22s ease;
          }
          .cmd-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 22px 50px rgba(31, 24, 12, 0.1);
          }
          .cmd-card__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 12px;
            background: rgba(10, 142, 240, 0.1);
            color: var(--blue);
            font-size: 1.35rem;
            margin-bottom: 18px;
          }
          .cmd-card__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0 0 10px;
            color: #16181f;
          }
          .cmd-card__desc {
            --theme-color: #565d6b;
            font-size: 0.96rem;
            line-height: 1.65;
            color: var(--slate);
            margin: 0;
          }

          /* ---------------- PROCESS (gray + diagonal cut) ---------------- */
          .cmd-process {
            background: var(--gray);
            padding: 130px 0;
            clip-path: polygon(0 3vw, 100% 0, 100% 100%, 0 calc(100% - 3vw));
            margin: -2vw 0;
          }
          .cmd-timeline {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            position: relative;
          }
          .cmd-timeline::before {
            content: "";
            position: absolute;
            top: 26px;
            left: 6%;
            right: 6%;
            height: 2px;
            background: linear-gradient(
              90deg,
              var(--blue),
              rgba(10, 142, 240, 0.2)
            );
          }
          .cmd-timeline__item {
            position: relative;
            text-align: center;
          }
          .cmd-timeline__node {
            position: relative;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            background: var(--navy);
            color: #fff;
            font-family: var(--display);
            font-weight: 800;
            font-size: 1.1rem;
            border: 3px solid var(--gray);
            box-shadow: 0 0 0 2px var(--blue);
            margin-bottom: 18px;
          }
          .cmd-timeline__title {
            --theme-color: #16181f;
            font-family: var(--display);
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0 0 8px;
            color: #16181f;
          }
          .cmd-timeline__desc {
            --theme-color: #565d6b;
            font-size: 0.9rem;
            line-height: 1.6;
            color: var(--slate);
            margin: 0;
          }

          /* ---------------- WHY US ---------------- */
          .cmd-why {
            background: #faf6ef;
            padding: 110px 0;
          }
          .cmd-why__grid {
            display: grid;
            grid-template-columns: 0.9fr 1.1fr;
            gap: 60px;
            align-items: start;
          }
          .cmd-why__visual {
            position: relative;
            margin-top: 36px;
            height: 240px;
            border-radius: 16px;
            background: var(--navy);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cmd-why__visual::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 70% 30%,
              rgba(10, 142, 240, 0.35),
              transparent 60%
            );
          }
          .cmd-why__watermark {
            font-family: var(--display);
            font-size: 5rem;
            font-weight: 800;
            color: transparent;
            -webkit-text-stroke: 2px rgba(148, 163, 184, 0.4);
          }
          .cmd-why__pulse {
            position: absolute;
            bottom: 22px;
            left: 22px;
            display: flex;
            gap: 8px;
          }
          .cmd-why__pulse span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--blue);
            opacity: 0.5;
          }
          .cmd-why__pulse span:nth-child(2) {
            opacity: 0.75;
          }
          .cmd-why__pulse span:nth-child(3) {
            opacity: 1;
          }
          .cmd-acc {
            border: 1px solid #e8e0d2;
            border-left: 4px solid var(--blue);
            border-radius: 12px;
            padding: 4px 22px;
            margin-bottom: 14px;
            background: #fff;
          }
          .cmd-acc[open] {
            box-shadow: 0 16px 40px rgba(31, 24, 12, 0.08);
          }
          .cmd-acc__q {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            cursor: pointer;
            list-style: none;
            padding: 18px 0;
            font-family: var(--display);
            font-size: 1.08rem;
            font-weight: 700;
            color: #16181f;
          }
          .cmd-acc__q::-webkit-details-marker {
            display: none;
          }
          .cmd-acc__q i {
            color: var(--blue);
            transition: transform 0.25s ease;
            flex-shrink: 0;
          }
          .cmd-acc[open] .cmd-acc__q i {
            transform: rotate(45deg);
          }
          .cmd-acc__a {
            --theme-color: #565d6b;
            margin: 0;
            padding: 0 0 20px;
            font-size: 0.98rem;
            line-height: 1.7;
            color: var(--slate);
          }

          /* ---------------- TECHNOLOGIES (gray + diagonal) ---------------- */
          .cmd-tech {
            background: var(--gray);
            padding: 130px 0;
            clip-path: polygon(0 3vw, 100% 0, 100% 100%, 0 calc(100% - 3vw));
            margin: -2vw 0;
          }
          .cmd-badges {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }
          .cmd-badge {
            padding: 13px 24px;
            background: #fff;
            border: 1px solid #e8e0d2;
            border-radius: 999px;
            font-weight: 600;
            font-size: 0.98rem;
            color: #16181f;
            transition: all 0.2s ease;
          }
          .cmd-badge:hover {
            border-color: var(--blue);
            color: var(--blue);
            transform: translateY(-3px);
          }

          /* ---------------- SUB-SERVICES ---------------- */
          .cmd-sub {
            background: var(--gray);
            padding: 110px 0;
          }
          .cmd-sub__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .cmd :global(.cmd-sub__card) {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 24px 24px 20px;
            border: 1px solid #e8e0d2;
            border-left: 4px solid var(--blue);
            border-radius: 12px;
            background: #fff;
            color: #16181f;
            transition: all 0.2s ease;
          }
          .cmd :global(.cmd-sub__card:hover) {
            border-color: var(--blue);
            box-shadow: 0 18px 40px rgba(31, 24, 12, 0.08);
            transform: translateY(-4px);
          }
          .cmd-sub__tag {
            display: inline-block;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--blue);
            background: rgba(10, 142, 240, 0.1);
            padding: 4px 10px;
            border-radius: 999px;
          }
          .cmd-sub__icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 10px;
            background: rgba(10, 142, 240, 0.1);
            color: var(--blue);
            font-size: 1.1rem;
            flex-shrink: 0;
          }
          .cmd-sub__name {
            font-family: var(--display);
            font-weight: 700;
            font-size: 1.05rem;
          }
          .cmd-sub__desc {
            font-size: 0.88rem;
            line-height: 1.55;
            color: var(--slate);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .cmd-sub__arrow {
            color: #8a8f9c;
            transition: transform 0.2s ease, color 0.2s ease;
          }
          .cmd :global(.cmd-sub__card:hover .cmd-sub__arrow) {
            color: var(--blue);
            transform: translateX(4px);
          }

          /* ---------------- CTA — split "mission brief" panel ----------- */
          /*
           * The page's thesis in miniature: navy brief (left) meets white
           * response card (right) across a diagonal seam — the same diagonal
           * used by the section clip-path cuts. The button always sits on
           * solid white, so its contrast can never be swallowed by the navy.
           */
          .cmd-cta {
            background: #faf6ef;
            padding: 40px 0 120px;
          }
          .cmd-cta__panel {
            display: grid;
            grid-template-columns: 1.08fr 0.92fr;
            border-radius: 20px;
            overflow: hidden;
            background: #fff;
            border: 1px solid #e8e0d2;
            box-shadow: 0 30px 70px rgba(31, 24, 12, 0.14);
          }
          .cmd-cta__brief {
            position: relative;
            background: var(--navy);
            padding: 64px 72px 64px 56px;
            overflow: hidden;
            /* Diagonal seam — echoes the section clip-path cuts. */
            clip-path: polygon(0 0, 100% 0, calc(100% - 64px) 100%, 0 100%);
            margin-right: -64px;
          }
          .cmd-cta__brief::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 20% 10%,
              rgba(10, 142, 240, 0.3),
              transparent 55%
            );
          }
          .cmd-cta__watermark {
            position: absolute;
            bottom: -34px;
            right: 10px;
            font-family: var(--display);
            font-size: 9rem;
            font-weight: 800;
            line-height: 0.8;
            color: transparent;
            -webkit-text-stroke: 2px rgba(148, 163, 184, 0.22);
            letter-spacing: -0.04em;
            pointer-events: none;
            user-select: none;
          }
          .cmd-cta__eyebrow {
            position: relative;
            z-index: 2;
            display: inline-block;
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #1fc4f5;
            margin-bottom: 18px;
          }
          .cmd-cta__title {
            --theme-color: #ffffff;
            position: relative;
            z-index: 2;
            font-family: var(--display);
            font-size: clamp(1.8rem, 3.2vw, 2.6rem);
            font-weight: 800;
            color: #fff;
            margin: 0 0 16px;
            letter-spacing: -0.02em;
            line-height: 1.12;
          }
          .cmd-cta__sub {
            --theme-color: #e5e1d6;
            position: relative;
            z-index: 2;
            font-size: 1.05rem;
            line-height: 1.7;
            color: #e5e1d6;
            margin: 0;
            max-width: 420px;
          }
          .cmd-cta__action {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 56px 56px 56px 84px;
            background: #fff;
          }
          .cmd-cta__promise {
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--blue);
            margin-bottom: 18px;
          }
          .cmd-cta__list {
            list-style: none;
            margin: 0 0 28px;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .cmd-cta__list li {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1rem;
            font-weight: 600;
            color: #16181f;
          }
          .cmd-cta__list i {
            color: var(--blue);
            font-size: 1.05rem;
          }
          .cmd :global(.cmd-cta__btn) {
            width: 100%;
            max-width: 360px;
          }
          .cmd-cta__note {
            --theme-color: #565d6b;
            margin: 16px 0 0;
            font-size: 0.85rem;
            color: #565d6b;
          }

          /* ---------------- RESPONSIVE ---------------- */
          @media (max-width: 991px) {
            .cmd-hero {
              grid-template-columns: 1fr;
              min-height: auto;
            }
            .cmd-hero__left {
              padding: 120px 32px 60px;
              min-height: 60vh;
            }
            .cmd-hero__right {
              padding: 60px 32px;
            }
            .cmd-grid,
            .cmd-sub__grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .cmd-timeline {
              grid-template-columns: 1fr;
              gap: 0;
            }
            .cmd-timeline::before {
              top: 0;
              bottom: 0;
              left: 26px;
              right: auto;
              width: 2px;
              height: auto;
              background: linear-gradient(
                180deg,
                var(--blue),
                rgba(10, 142, 240, 0.2)
              );
            }
            .cmd-timeline__item {
              display: flex;
              gap: 20px;
              text-align: left;
              padding-bottom: 34px;
            }
            .cmd-timeline__node {
              margin-bottom: 0;
              flex-shrink: 0;
            }
            .cmd-why__grid {
              grid-template-columns: 1fr;
              gap: 36px;
            }
            .cmd-cta__panel {
              grid-template-columns: 1fr;
            }
            .cmd-cta__brief {
              clip-path: polygon(0 0, 100% 0, 100% calc(100% - 44px), 0 100%);
              margin-right: 0;
              margin-bottom: -44px;
              padding: 52px 40px 84px;
            }
            .cmd-cta__action {
              padding: 64px 40px 48px;
            }
          }
          @media (max-width: 599px) {
            .cmd-wrap {
              padding: 0 18px;
            }
            .cmd-hero__left {
              padding: 110px 22px 50px;
            }
            .cmd-hero__right {
              padding: 48px 22px;
            }
            .cmd-hero__trust {
              grid-template-columns: 1fr;
            }
            .cmd-grid,
            .cmd-sub__grid {
              grid-template-columns: 1fr;
            }
            .cmd-stat:nth-child(2),
            .cmd-stat:nth-child(3) {
              margin-left: 0;
            }
            .cmd-build,
            .cmd-why,
            .cmd-sub {
              padding: 70px 0;
            }
            .cmd-process,
            .cmd-tech {
              padding: 90px 0;
            }
            .cmd-cta {
              padding: 24px 0 80px;
            }
            .cmd-cta__brief {
              padding: 44px 26px 76px;
            }
            .cmd-cta__action {
              padding: 56px 26px 40px;
            }
            .cmd-cta__watermark {
              font-size: 6rem;
            }
            .cmd :global(.cmd-cta__btn) {
              max-width: none;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default SaasDevelopmentUsa;