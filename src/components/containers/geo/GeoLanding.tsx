import React from "react";
import Link from "next/link";
import type { GeoRegion } from "@/data/geo";
import { SERVICES } from "@/data/services";

/**
 * Body of a geo-targeted landing page (/uk, /usa, /uae). Composed entirely from
 * the site's existing section design language so the three pages are visually
 * indistinguishable in style from the rest of the site:
 *   - Hero          → bespoke `.geo-hero` (reuses the `.banner__badge` pill +
 *                      `.btn--primary/secondary`, and a beacon card that echoes
 *                      the `.service-detail__visual` glow card).
 *   - Services      → `.marketing-services` cards, pulled from services.ts.
 *   - Why choose    → `.marketing-why` cards.
 *   - Stats         → `.marketing-results` cards.
 *   - CTA banner    → `.geo-cta` dark-island panel.
 *
 * The page-level <Seo> / <Layout> and the region's LocalBusiness JSON-LD are
 * rendered by the page itself; this component stays focused on the shared body.
 *
 * Styling lives in `src/styles/sections/_geo-landing.scss`.
 */
const GeoLanding = ({
  region,
  serviceLinks,
  afterStats,
}: {
  region: GeoRegion;
  /**
   * Optional per-slug link overrides for the services grid. Used by /usa to
   * point its four flagship services at the dedicated /usa/<service> pages
   * while /uk and /uae keep linking to the global /services/<slug> pages.
   */
  serviceLinks?: Record<string, string>;
  /**
   * Optional region-specific sections rendered between the stats grid and the
   * closing CTA banner. Used by /uk for its market/industries/locations/FAQ
   * content; /usa and /uae omit it and render exactly as before.
   */
  afterStats?: React.ReactNode;
}) => {
  return (
    <>
      {/* 1) Hero -------------------------------------------------------- */}
      <section className="geo-hero" aria-labelledby="geo-hero-title">
        <span className="geo-hero__aura" aria-hidden="true" />
        <div className="container">
          <div className="row gaper align-items-center">
            <div className="col-12 col-lg-7">
              <div className="geo-hero__content">
                <span className="geo-hero__badge">{region.flagBadge}</span>
                <h1 id="geo-hero-title" className="title title-anim geo-hero__title">
                  {region.h1}
                </h1>
                <p className="geo-hero__lead">{region.subheadline}</p>

                <div className="geo-hero__cta">
                  <Link href="/contact" className="btn btn--primary">
                    Book a Free Call
                  </Link>
                  <Link href="#services" className="btn btn--secondary">
                    View Our Services
                  </Link>
                </div>

                <ul className="geo-hero__trust" aria-label="Why work with us">
                  {region.trustBullets.map((bullet) => (
                    <li key={bullet}>
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="geo-hero__beacon" aria-hidden="true">
                <span className="geo-hero__beacon-glow" />
                <span className="geo-hero__beacon-flag">{region.beaconFlag}</span>
                <span className="geo-hero__beacon-label">{region.beaconLabel}</span>
                <ul className="geo-hero__beacon-chips">
                  {region.beaconChips.map((chip) => (
                    <li key={chip}>
                      <i className="fa-solid fa-location-dot"></i>
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Services --------------------------------------------------- */}
      <section
        id="services"
        className="section marketing-services geo-services"
        aria-labelledby="geo-services-title"
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 col-lg-8">
              <span className="sub-title">
                What we do
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="geo-services-title" className="title title-anim mt-3 mb-0">
                {region.servicesHeading}
              </h2>
            </div>
          </div>

          <ul
            className="row gaper marketing-services__grid"
            aria-label={region.servicesHeading}
          >
            {SERVICES.map((service, index) => (
              <li
                key={service.slug}
                className="col-12 col-md-6 col-xl-4 marketing-services__col"
              >
                <article className="marketing-services__card">
                  <span className="marketing-services__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="marketing-services__icon" aria-hidden="true">
                    <i className={service.icon}></i>
                  </span>
                  <h3 className="marketing-services__title">{service.name}</h3>
                  <p className="marketing-services__desc">
                    {service.heroDescription}
                  </p>
                  <Link
                    href={serviceLinks?.[service.slug] ?? `/services/${service.slug}`}
                    className="marketing-services__cta"
                    aria-label={`Read more about ${service.name}`}
                  >
                    Read more
                    <i
                      className="fa-sharp fa-solid fa-arrow-up-right"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3) Why choose us --------------------------------------------- */}
      <section
        className="section marketing-why geo-why"
        aria-labelledby="geo-why-title"
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 col-lg-8">
              <span className="sub-title">
                Why Quantel
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="geo-why-title" className="title title-anim mt-3 mb-0">
                {region.whyHeading}
              </h2>
            </div>
          </div>

          <ul className="row gaper marketing-why__grid" aria-label={region.whyHeading}>
            {region.reasons.map((reason) => (
              <li
                key={reason.title}
                className="col-12 col-md-6 col-xl-3 marketing-why__col"
              >
                <article className="marketing-why__card">
                  <span className="marketing-why__icon" aria-hidden="true">
                    <i className={reason.icon}></i>
                  </span>
                  <h3 className="marketing-why__card-title">{reason.title}</h3>
                  <p className="marketing-why__card-desc">{reason.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4) Stats ------------------------------------------------------ */}
      <section
        className="section marketing-results geo-stats"
        aria-labelledby="geo-stats-title"
      >
        <div className="container">
          <h2 id="geo-stats-title" className="visually-hidden">
            Quantel Solutions by the numbers
          </h2>
          <ul className="row gaper marketing-results__grid" aria-label="Key figures">
            {region.stats.map((stat) => (
              <li
                key={stat.label}
                className="col-12 col-sm-6 col-xl-3 marketing-results__col"
              >
                <article className="marketing-results__card">
                  <span className="marketing-results__metric">{stat.value}</span>
                  <strong className="marketing-results__label">{stat.label}</strong>
                  <p className="marketing-results__detail">{stat.detail}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4b) Region-specific extra sections (optional — /uk only today) - */}
      {afterStats}

      {/* 5) CTA banner ------------------------------------------------- */}
      <section className="section geo-cta" aria-labelledby="geo-cta-title">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="geo-cta__panel">
                <span className="geo-cta__glow" aria-hidden="true" />
                <div className="geo-cta__inner">
                  <h2 id="geo-cta-title" className="geo-cta__title">
                    {region.ctaHeading}
                  </h2>
                  <p className="geo-cta__lead">{region.ctaSubtext}</p>
                  <Link href="/contact" className="btn btn--primary geo-cta__btn">
                    {region.ctaButton}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GeoLanding;