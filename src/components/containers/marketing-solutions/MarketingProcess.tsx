import React from "react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We audit your website, existing ad accounts, search visibility, social presence, and competitors. We're looking for the gaps quietly costing you leads and revenue  before a single ringgit is spent on new activity.",
   icon: "fa-solid fa-compass",
  },
  {
    number: "02",
    title: "Strategise",
    description:
      "A documented 90-day roadmap with prioritised channels, realistic KPIs, budget allocation, and a clear rationale for every decision. You review, challenge, and approve it before a single thing goes live.",
    icon: "fa-solid fa-clipboard-list",
  },
  {
    number: "03",
    title: " Execute",
    description:
      "Campaigns, content, and creative go live in two-week sprints. You get a concise weekly update what launched, what moved, what's next and permanent access to your live performance dashboard.",
    icon: "fa-solid fa-rocket",
  },
  {
    number: "04",
    title: "Optimise",
    description:
      "Each month, we reinvest budget from underperforming activity into your highest converting channels. The result: your cost per lead falls and your return on spend rises compounding month after month.",
    icon: "fa-solid fa-chart-line",
  },
];

const MarketingProcess = () => {
  return (
    <section
      className="section marketing-process"
      aria-labelledby="marketing-process-title"
    >
      <div className="container">
        <div className="row mb-50">
          <div className="col-12 text-center">
            <span className="sub-title justify-content-center">
              <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
              how we work
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </span>
            <h2
              id="marketing-process-title"
              className="title title-anim mt-3 mb-0"
            >
              A Clear Process. No surprises. Full accountability.
            </h2>
            <p className="custom-margin marketing-process__lead">
              We don&apos;t start creative work until there&apos;s a documented
              strategy. And we don&apos;t accept a strategy until it has
              measurable KPIs tied to your actual business goals not marketing
              vanity metrics.
            </p>
          </div>
        </div>

        <ol className="marketing-process__list" aria-label="Our 4-step process">
          {STEPS.map((step, index) => (
            <li key={step.number} className="marketing-process__item">
              <div className="marketing-process__card">
                <span
                  className="marketing-process__number"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <span
                  className="marketing-process__icon"
                  aria-hidden="true"
                >
                  <i className={step.icon}></i>
                </span>
                <h3 className="marketing-process__title">{step.title}</h3>
                <p className="marketing-process__desc">{step.description}</p>
              </div>
              {index < STEPS.length - 1 && (
                <span
                  className="marketing-process__connector"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default MarketingProcess;
