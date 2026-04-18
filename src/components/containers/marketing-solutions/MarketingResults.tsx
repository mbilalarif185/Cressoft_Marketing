import React from "react";

type Result = {
  metric: string;
  label: string;
  detail: string;
};

const RESULTS: Result[] = [
  {
    metric: "+219%",
    label: "More Qualified Leads",
    detail: "Average uplift across all active retainer clients over 12 months",
  },
  {
    metric: "3.8×",
    label: "Return on AD spend",
    detail: "Median ROAS across Google Ads & Meta accounts, Malaysian market",
  },
  {
    metric: "47%",
    label: "Lower cost per lead",
    detail: "After 90 days on our integrated SEO + paid funnel.",
  },
  {
    metric: "97%",
    label: "Client Retention Rate",
    detail: "Partners stay because results keep compounding not because they're locked in",
  },
];

const MarketingResults = () => {
  return (
    <section
      className="section marketing-results"
      aria-labelledby="marketing-results-title"
    >
      <div className="container">
        <div className="row align-items-center mb-50 gaper">
          <div className="col-12 col-lg-6">
            <span className="sub-title">
             Proof, Not Promises
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </span>
            <h2
              id="marketing-results-title"
              className="title title-anim mt-3 mb-0"
            >
              Results that show up in your P&L, not just a dashboard.
            </h2>
          </div>
          <div className="col-12 col-lg-6">
            <p className="marketing-results__lead">
              Every campaign is tracked end to end from first click to closed sale. 
              You always know which channel 
              generated which lead and exactly how much it cost to get them there.
            </p>
          </div>
        </div>

        <ul className="row gaper marketing-results__grid" aria-label="Performance stats">
          {RESULTS.map((r) => (
            <li
              key={r.label}
              className="col-12 col-sm-6 col-xl-3 marketing-results__col"
            >
              <article className="marketing-results__card">
                <span className="marketing-results__metric">{r.metric}</span>
                <strong className="marketing-results__label">{r.label}</strong>
                <p className="marketing-results__detail">{r.detail}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MarketingResults;
