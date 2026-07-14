import React, { useId, useMemo, useState } from "react";

type Faq = {
  q: string;
  a: string;
};

// Homepage FAQ — Quantel's core SaaS, AI, and web development positioning.
// This component is used ONLY on the homepage. The /faq page has its own,
// longer set in FaqMain.tsx — editing one no longer affects the other.
// Keep the SaaS/AI/web/white-label framing; do NOT reintroduce IT-support
// / managed-IT phrasing.
const FAQS: Faq[] = [
  {
    q: "What services does Quantel Solutions offer?",
    a: "We offer SaaS development, AI automation, web development, white label software, mobile app development, ecommerce development, SEO, social media marketing, ERP solutions and UI/UX design — all delivered by our London-based global team."  },
  {
    q: "How much does SaaS development cost?",
    a: "Our SaaS development projects start from $5,000 for an MVP. Full SaaS platform development typically ranges from $15,000 to $80,000 depending on complexity. We offer a free consultation to give you an exact quote."  },
  {
    q: "Do you work with US and UAE businesses?",
    a: "Yes — we serve clients across the UK, USA and UAE. We have dedicated service pages for each market with US timezone overlap guaranteed for American clients."  },
  {
    q: "What is white label software?",
    a: "White label software is a fully rebrandable product built by us and sold under your brand. Agencies use our white label services to offer SaaS, web development and digital marketing without hiring in-house developers."  },
  {
    q: "How long does web development take?",
    a: "A standard website takes 4–6 weeks. A web application takes 8–16 weeks depending on complexity. We work in agile sprints with weekly updates throughout."  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes — all projects include post-launch support. We offer monthly retainer packages for ongoing development, maintenance and digital marketing."  },
];

const HomeFaq = () => {
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
                        aria-controls={`home-faq-${i}`}
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
                        id={`home-faq-${i}`}
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

export default HomeFaq;
