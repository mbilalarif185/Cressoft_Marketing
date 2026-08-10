import React, { useState } from "react";

/**
 * UK-only supplementary content for /uk, rendered between the stats section and
 * the closing CTA banner via `<GeoLanding afterStats={...} />`.
 *
 * This component is intentionally NOT part of GeoLanding itself — /usa and /uae
 * must stay untouched. It adds four sections of UK-specific depth for the
 * "technology partner UK" cluster:
 *   1) UK market expertise  → prose block
 *   2) UK industries        → reuses `.marketing-why` card styling (3x2 grid)
 *   3) UK locations         → city pills + London office note
 *   4) UK FAQ               → reuses the homepage `.marketing-faq` accordion
 *
 * The FAQ copy is exported as `UK_FAQS` so the page can emit the matching
 * FAQPage JSON-LD from a single source of truth.
 *
 * Styling lives in `src/styles/sections/_geo-landing.scss` (`.uk-*` selectors).
 */

type UkFaq = { q: string; a: string };

/** Single source of truth — also feeds the FAQPage JSON-LD on `/uk`. */
export const UK_FAQS: UkFaq[] = [
  {
    q: "Where is Quantel Solutions based in the UK?",
    a: "Quantel Solutions is headquartered at 20 Fenchurch Street, London EC3M 3BY. We serve clients across the UK and internationally across the USA and UAE.",
  },
  {
    q: "Do you work with UK startups or only established businesses?",
    a: "We work with both. We have delivered SaaS MVPs for pre-revenue UK founders and enterprise platforms for established UK businesses with hundreds of users. Our service model scales to fit your stage and budget.",
  },
  {
    q: "Are you familiar with UK GDPR requirements?",
    a: "Yes — UK GDPR compliance is built into every project we deliver. We design data architecture, privacy policies and consent mechanisms to UK GDPR standards from day one.",
  },
  {
    q: "Can we meet in person at your London office?",
    a: "Yes — we welcome client meetings at our 20 Fenchurch Street office in the City of London. Contact us to arrange a visit.",
  },
  {
    q: "Do you offer ongoing support after project delivery?",
    a: "Yes — all projects include post-launch support and we offer monthly retainer packages for ongoing development, maintenance and digital marketing. 98% of our UK clients stay with us long term.",
  },
];

const UK_INDUSTRIES = [
  {
    icon: "fa-solid fa-chart-line",
    title: "Fintech & Financial Services",
    description:
      "UK-regulated fintech products, payment integrations and financial management platforms built to FCA compliance standards.",
  },
  {
    icon: "fa-solid fa-truck",
    title: "Logistics & Supply Chain",
    description:
      "Fleet management systems, route optimisation platforms and supply chain software for UK logistics businesses.",
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Education & EdTech",
    description:
      "Learning management systems, student portals and EdTech SaaS products for UK education providers and training companies.",
  },
  {
    icon: "fa-solid fa-briefcase",
    title: "Professional Services",
    description:
      "Practice management software, client portals and workflow automation for UK law firms, accountancies and consultancies.",
  },
  {
    icon: "fa-solid fa-store",
    title: "Retail & Ecommerce",
    description:
      "Shopify, WooCommerce and custom ecommerce platforms for UK retailers looking to grow their online revenue.",
  },
  {
    icon: "fa-solid fa-hospital",
    title: "Healthcare & MedTech",
    description:
      "Patient management systems, healthcare portals and MedTech SaaS products built to UK healthcare compliance standards.",
  },
];

const UK_CITIES = [
  "London",
  "Manchester",
  "Birmingham",
  "Edinburgh",
  "Bristol",
  "Leeds",
  "Glasgow",
  "Liverpool",
];

const UkContent = () => {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const toggleFaq = (i: number) => setOpenFaq((cur) => (cur === i ? -1 : i));

  return (
    <>
      {/* A) UK market expertise --------------------------------------- */}
      <section
        className="section uk-market"
        aria-labelledby="uk-market-title"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <span className="sub-title">
                UK Market
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="uk-market-title" className="title title-anim mt-3 mb-0">
                Why UK Businesses Choose Quantel as Their Technology Partner
              </h2>

              <div className="uk-market__body">
                <p>
                  The UK technology market is one of the most competitive in the
                  world. London alone is home to thousands of digital agencies
                  and software development companies — all competing for the
                  same clients, the same talent and the same opportunities. In
                  this environment, choosing the right technology partner is not
                  just a procurement decision. It is a strategic one.
                </p>
                <p>
                  Quantel Solutions was founded in London in 2021 with a
                  specific mission: give UK startups and growing businesses
                  access to the kind of technology partner that used to be
                  reserved for companies with enterprise budgets. Since then we
                  have delivered 500+ projects for UK businesses across fintech,
                  logistics, education, professional services, hospitality and
                  retail.
                </p>
                <p>
                  What makes us different from the hundreds of other technology
                  companies operating in the UK market is our end-to-end
                  delivery model. Most UK agencies specialise in one thing — web
                  design, or SEO, or software development. We cover the full
                  stack: SaaS platform development, white label software, AI
                  automation, web and mobile development, and the digital
                  marketing to grow what we build. One team. One partner. One
                  accountable relationship from first conversation to long-term
                  growth.
                </p>
                <p>
                  Our London headquarters at 20 Fenchurch Street puts us at the
                  heart of the UK business community. We understand the UK
                  regulatory environment, UK GDPR requirements, UK payment
                  infrastructure and the specific commercial pressures facing UK
                  businesses in 2026. When you work with Quantel Solutions you
                  are working with a team that genuinely understands your market
                  — not one that is learning it at your expense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B) UK industries — reuses `.marketing-why` card styling -------- */}
      <section
        className="section marketing-why uk-industries"
        aria-labelledby="uk-industries-title"
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 col-lg-8">
              <span className="sub-title">
                Industries
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="uk-industries-title" className="title title-anim mt-3 mb-0">
                UK Industries We Serve
              </h2>
              <p className="uk-section__lead">
                We have delivered technology projects for UK businesses across a
                wide range of industries. Our team understands the specific
                regulatory, commercial and technical requirements of each
                sector.
              </p>
            </div>
          </div>

          <ul
            className="row gaper marketing-why__grid"
            aria-label="UK industries we serve"
          >
            {UK_INDUSTRIES.map((industry) => (
              <li
                key={industry.title}
                className="col-12 col-md-6 col-xl-4 marketing-why__col"
              >
                <article className="marketing-why__card">
                  <span className="marketing-why__icon" aria-hidden="true">
                    <i className={industry.icon}></i>
                  </span>
                  <h3 className="marketing-why__card-title">
                    {industry.title}
                  </h3>
                  <p className="marketing-why__card-desc">
                    {industry.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C) UK locations ---------------------------------------------- */}
      <section
        className="section uk-locations"
        aria-labelledby="uk-locations-title"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <span className="sub-title">
                Locations
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="uk-locations-title" className="title title-anim mt-3 mb-0">
                Serving Businesses Across the UK
              </h2>
              <p className="uk-section__lead">
                While headquartered in London, we serve clients across the
                entire United Kingdom — from Edinburgh to Bristol, Manchester to
                Birmingham. Our remote-first delivery model means geography is
                never a barrier to working with the right technology partner.
              </p>

              <ul className="uk-locations__pills" aria-label="UK cities we serve">
                {UK_CITIES.map((city) => (
                  <li key={city} className="uk-locations__pill">
                    <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                    {city}
                  </li>
                ))}
              </ul>

              <p className="uk-locations__note">
                Our London-based project managers and senior developers are
                available for in-person meetings at our 20 Fenchurch Street
                office. For clients outside London we offer video discovery
                sessions, regular sprint reviews and on-site visits for major
                project milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* D) UK FAQ — reuses the homepage `.marketing-faq` accordion ----- */}
      <section
        className="section marketing-faq uk-faq"
        aria-labelledby="uk-faq-title"
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 text-center">
              <span className="sub-title justify-content-center">
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                Frequently Asked
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="uk-faq-title" className="title title-anim mt-3 mb-0">
                Common Questions from UK Businesses
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <ul
                className="marketing-faq__list"
                aria-label="Common questions from UK businesses"
              >
                {UK_FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <li
                      key={faq.q}
                      className={
                        "marketing-faq__item" +
                        (isOpen ? " marketing-faq__item--open" : "")
                      }
                    >
                      <button
                        type="button"
                        className="marketing-faq__question"
                        onClick={() => toggleFaq(i)}
                        aria-expanded={isOpen}
                        aria-controls={`uk-faq-${i}`}
                      >
                        <span>{faq.q}</span>
                        <i
                          className={
                            "marketing-faq__chevron fa-solid " +
                            (isOpen ? "fa-minus" : "fa-plus")
                          }
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`uk-faq-${i}`}
                        className="marketing-faq__answer"
                        role="region"
                        hidden={!isOpen}
                      >
                        <p>{faq.a}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UkContent;
