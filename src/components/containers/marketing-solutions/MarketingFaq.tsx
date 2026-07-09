import React, { useId, useMemo, useState } from "react";

type Faq = {
  q: string;
  a: string;
};

// SEO NOTE: several questions/answers carry keyword phrases verbatim from the
// client's homepage SEO brief ("services for it", "managed it services
// pricing", "it services for law firms", "it company near me", etc.).
// Don't "clean up" these phrasings when editing copy.
const FAQS: Faq[] = [
  {
    q: "What do your IT services cover?",
    a: "Everything a growing business needs from a full service IT company: SaaS, web, and mobile development, cloud infrastructure, IT support services, AI automation, and digital growth. We built our stack around the services for IT leaders actually budget for - so you get one accountable partner instead of five separate vendors."  },
  {
    q: "How does managed IT services pricing work?",
    a: "Fully managed IT services run on a simple monthly retainer scoped to your users, systems, and hours of coverage. Project work - a platform build, a migration, a redesign - is quoted fixed-scope up front. Either way, managed IT services pricing is agreed in writing before any work starts, with no surprise line items."  },
  {
    q: "Do you offer small business IT services as well as enterprise IT services?",
    a: "Both. Our small business IT services give early-stage teams a lean, fast-moving crew at a predictable cost, while our enterprise IT services add the governance, documentation, and security posture larger organisations need. We scope every engagement to the actual size and stage of the business."  },
  {
    q: "Do you provide industry-specific solutions, such as IT services for law firms or healthcare?",
    a: "Yes. We deliver IT services for law firms with confidentiality and case-management workflows in mind, and healthcare IT services built around patient-data compliance - alongside e-commerce, real estate, education, and finance. Every engagement starts from your industry's workflows and regulations, never a generic template."  },
  {
    q: "I searched for an \"IT company near me\" - do you work with businesses outside London?",
    a: "Absolutely. We're headquartered in London and deliver for clients across the UK, US, UAE, and Asia-Pacific, remote-first with overlapping working hours arranged around your team. Wherever you found us, we operate like the IT company near me you were searching for: responsive, in your time zone, and one call away."  },
  {
    q: "How do you compare to other IT service providers?",
    a: "Most IT service providers stop at tickets and uptime. As an IT professional services partner, we pair an IT consulting service - strategy, audits, and roadmaps - with hands-on engineering and growth marketing, and we tie KPIs to business outcomes like retention, cost per acquisition, and revenue rather than response times alone."  },
  {
    q: "What's included in the free discovery call?",
    a: "Your discovery call is a genuine working session with a senior Quantel strategist - not a sales pitch dressed up as a consultation. We'll review your goals, your current stack, and identify the highest-leverage opportunities, then outline a practical roadmap you could act on with or without us. Within 24 hours we'll follow up with a written summary of the findings and recommendations. No obligation."  },
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

      {/* schema.org/FAQPage - surfaces these answers in Google search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
};

export default MarketingFaq;
