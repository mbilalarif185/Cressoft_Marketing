import React, { useId, useMemo, useState } from "react";

type Faq = {
  q: string;
  a: string;
};

const FAQS: Faq[] = [
  {
    q: "How long does it take to build and launch a SaaS or white-label product?",
    a: "It depends on scope. A focused MVP or a configured white-label platform (CRM, ERP, LMS, or e-commerce) typically goes live within 6–12 weeks. Full custom SaaS products with multi-tenant architecture, billing, and integrations usually run 3–6 months to a production-ready v1. We work in short, demoable sprints, so you see working software early and often rather than waiting months for a single big reveal."  },
  {
    q: "Do you only work with large enterprises, or do you take on startups too?",
    a: "Both. We partner with early-stage startups shipping their first product, scaleups hardening their platform for growth, and enterprises modernising legacy systems. We scope every engagement to the actual size and stage of the business, so a startup gets a lean, fast-moving team while an enterprise gets the governance, documentation, and security posture it needs."  },
  {
    q: "What's included in the free discovery call?",
    a: "Your discovery call is a genuine working session with a senior Quantel strategist — not a sales pitch dressed up as a consultation. We'll review your goals, your current stack, and identify the highest-leverage opportunities, then outline a practical roadmap you could act on with or without us. Within 24 hours we'll follow up with a written summary of the findings and recommendations. No obligation."  },
  {
    q: "Can you work alongside our existing in-house engineering or marketing team?",
    a: "Absolutely. We're set up to augment internal teams, not replace them. Many clients embed us to own a specific workstream — a SaaS module, an AI feature, or a paid-acquisition channel — while their in-house team handles the rest. We're flexible on structure and always start by understanding what's already in place before recommending changes."  },
  {
    q: "Which regions and time zones do you work across?",
    a: "We're headquartered in London and deliver for clients across the UK, US, UAE, and Asia-Pacific. Our delivery model is remote-first with overlapping working hours arranged around your core team, so collaboration stays smooth regardless of time zone. Calls run over Zoom or Google Meet, and day-to-day communication runs through Slack, email, and WhatsApp."  },
  {
    q: "How do we measure success? What KPIs do you use?",
    a: "We tie KPIs to your actual business outcomes, not vanity metrics. Depending on the engagement, that can mean product velocity and uptime, activation and retention rates, cost per acquisition, return on ad spend, or direct revenue. Before any work begins, we document a written set of KPIs and targets, then review and update them each quarter as the programme evolves."  },
];

const MarketingFaq = () => {
  const headingId = useId();
  const [open, setOpen] = useState<number>(0);

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    }),
    []
  );

  const toggle = (i: number) => setOpen((cur) => (cur === i ? -1 : i));

  return (
    <>
      <section
        className="section marketing-faq"
        aria-labelledby={headingId}
      >
        <div className="container">
          <div className="row mb-50">
            <div className="col-12 text-center">
              <span className="sub-title justify-content-center">
                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                Frequently Asked
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2
                id={headingId}
                className="title title-anim mt-3 mb-0"
              >
               What Global Clients Ask Us
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <ul className="marketing-faq__list" aria-label="Frequently asked questions">
                {FAQS.map((faq, i) => {
                  const isOpen = open === i;
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
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                        aria-controls={`marketing-faq-${i}`}
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
                        id={`marketing-faq-${i}`}
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

      {/* schema.org/FAQPage — surfaces these answers in Google search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
};

export default MarketingFaq;
