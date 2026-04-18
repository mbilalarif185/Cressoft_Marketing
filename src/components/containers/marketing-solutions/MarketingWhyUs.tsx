import React from "react";
import Link from "next/link";

type Differentiator = {
  icon: string;
  title: string;
  description: string;
};

const REASONS: Differentiator[] = [
  {
    icon: "fa-solid fa-location-dot",
    title: "Local market expertise",
    description:
      "We grew up marketing to Malaysians — KL, Penang, JB, East Malaysia — so the strategy lands the first time.",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Senior people, every account",
    description:
      "You work directly with strategists and specialists, not a junior account manager passing briefs.",
  },
  {
    icon: "fa-solid fa-chart-pie",
    title: "Transparent reporting",
    description:
      "A live dashboard plus a plain-English monthly report. You always know what's working and why.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "No long lock-ins",
    description:
      "Monthly retainers that earn their renewal. If we're not delivering, you can leave any time.",
  },
];

const MarketingWhyUs = () => {
  return (
    <section
      className="section marketing-why"
      aria-labelledby="marketing-why-title"
    >
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-5">
            <div className="marketing-why__intro">
              <span className="sub-title">
                why cressoft
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2
                id="marketing-why-title"
                className="title title-anim mt-3"
              >
                A marketing partner, not a vendor.
              </h2>
              <p className="marketing-why__lead">
                We don&apos;t do generic. Every plan is shaped around your
                product, your customers and the realities of doing business in
                Malaysia — so the work feels owned, not outsourced.
              </p>
              <Link href="/our-story" className="marketing-why__link">
                Read our story
                <i
                  className="fa-sharp fa-solid fa-arrow-up-right"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <ul
              className="row gaper marketing-why__grid"
              aria-label="Why work with us"
            >
              {REASONS.map((reason) => (
                <li
                  key={reason.title}
                  className="col-12 col-md-6 marketing-why__col"
                >
                  <article className="marketing-why__card">
                    <span
                      className="marketing-why__icon"
                      aria-hidden="true"
                    >
                      <i className={reason.icon}></i>
                    </span>
                    <h3 className="marketing-why__card-title">
                      {reason.title}
                    </h3>
                    <p className="marketing-why__card-desc">
                      {reason.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingWhyUs;
