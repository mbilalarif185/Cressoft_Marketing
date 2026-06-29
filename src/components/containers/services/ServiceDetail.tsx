import React from "react";
import Link from "next/link";
import type { Service } from "@/data/services";

/**
 * Body of an individual /services/<slug> page. Composes three sections —
 * Overview, Features/benefits, and Process — entirely from the site's existing
 * design tokens and class conventions (`.section`, `.sub-title`, `.title`,
 * `.title-anim`, Bootstrap grid). Styling lives in
 * `src/styles/sections/_service-detail.scss`.
 *
 * The page-level hero (CmnBanner) and the shared <MarketingCta /> are rendered
 * by the page itself, so this component stays focused on the unique mid-page
 * content that differs per service.
 */
const ServiceDetail = ({ service }: { service: Service }) => {
  return (
    <>
      {/* 1) Overview ------------------------------------------------ */}
      <section
        className="section service-detail__overview"
        aria-labelledby="service-overview-title"
      >
        <div className="container">
          <div className="row gaper align-items-center">
            <div className="col-12 col-lg-6">
              <div className="section__content">
                <span className="sub-title">
                  {service.intro.eyebrow}
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </span>
                <h2
                  id="service-overview-title"
                  className="title title-anim"
                >
                  {service.intro.heading}
                </h2>
                {service.intro.paragraphs.map((p, i) => (
                  <p key={i} className="service-detail__overview-text">
                    {p}
                  </p>
                ))}
                <Link
                  href="/contact"
                  className="btn btn--primary mt-2"
                >
                  Talk to us about {service.shortName}
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="service-detail__visual" aria-hidden="true">
                <span className="service-detail__visual-icon">
                  <i className={service.icon}></i>
                </span>
                <span className="service-detail__visual-glow" />
                <span className="service-detail__visual-name">
                  {service.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Features / benefits ------------------------------------ */}
      <section
        className="section service-detail__features"
        aria-labelledby="service-features-title"
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 col-lg-8">
              <span className="sub-title">
                What you get
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2
                id="service-features-title"
                className="title title-anim mt-3 mb-0"
              >
                {service.featuresHeading}
              </h2>
            </div>
          </div>

          <ul
            className="row gaper service-detail__grid"
            aria-label={`${service.name} capabilities`}
          >
            {service.features.map((feature) => (
              <li
                key={feature.title}
                className="col-12 col-md-6 col-xl-4 service-detail__col"
              >
                <article className="service-detail__card">
                  <span
                    className="service-detail__card-icon"
                    aria-hidden="true"
                  >
                    <i className={feature.icon}></i>
                  </span>
                  <h3 className="service-detail__card-title">
                    {feature.title}
                  </h3>
                  <p className="service-detail__card-desc">
                    {feature.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3) Process ------------------------------------------------ */}
      <section
        className="section service-detail__process"
        aria-labelledby="service-process-title"
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 text-center">
              <span className="sub-title justify-content-center">
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                How we work
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2
                id="service-process-title"
                className="title title-anim mt-3 mb-0"
              >
                {service.processHeading}
              </h2>
            </div>
          </div>

          <ol
            className="service-detail__steps"
            aria-label={`${service.name} process`}
          >
            {service.process.map((step, index) => (
              <li key={step.title} className="service-detail__step">
                <div className="service-detail__step-card">
                  <span
                    className="service-detail__step-number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="service-detail__step-icon"
                    aria-hidden="true"
                  >
                    <i className={step.icon}></i>
                  </span>
                  <h3 className="service-detail__step-title">{step.title}</h3>
                  <p className="service-detail__step-desc">
                    {step.description}
                  </p>
                </div>
                {index < service.process.length - 1 && (
                  <span
                    className="service-detail__step-connector"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
