import React, { useId, useMemo, useState } from "react";

type Faq = {
  q: string;
  a: string;
};

const FAQS: Faq[] = [
  {
    q: "How soon will we start seeing results from digital marketing?",
    a: "It depends on the channel. Google Ads and Meta campaigns typically generate their first qualified leads within 10–14 days of launch as your ads begin reaching active buyers. SEO is a longer game you'll usually see meaningful traffic movement between months 3 and 6, but those rankings compound without ongoing ad spend. We recommend an integrated approach: paid ads for immediate leads while SEO builds your long term organic asset. From day one, you'll receive weekly updates so there's never a period where you don't know what's happening."  },
  {
    q: "Do you only work with large companies, or do you take on SMEs?",
    a: "The majority of our clients are Malaysian SMEs businesses with 5 to 200 staff who need proper marketing but don't have the budget or need for a full in house team. We scope every engagement to the actual size and stage of the business. A focused programme is genuinely useful and properly executed it's not a stripped-down version of something bigger. We also work with growth stage startups and established brands scaling into new verticals or cities."  },
  {
    q: "What's included in the free strategy audit?",
    a: "Your free 30 minute audit is a genuine working session with a senior Cressoft strategist  not a sales pitch dressed up as a consultation. We'll review your current online presence, identify your top 3 highest-leverage opportunities, and give you a practical 30-day action plan you could implement with or without us. Within 24 hours of the call, we'll email you a written summary of the findings and recommendations. No obligation, no pressure to sign anything."  },
  {
    q: "What if we already have an in house marketing team or existing agency?",
    a: "We're set up to work alongside internal teams and existing agencies not replace them. Many clients use us to own a specific channel (e.g. Google Ads) while their in house team handles content or social. Others bring us in to audit and improve work that's already running. We're flexible on structure and always start by understanding what's already in place before recommending any changes."  },
  {
    q: "Do you work with businesses outside of Kuala Lumpur?",
    a: "Yes. Our team works remotely with clients across Malaysia Penang, Johor Bahru, Seremban, Kota Kinabalu, Kuching, and beyond. For local SEO work, we have experience ranking businesses in every major Malaysian city. Strategy calls happen over Zoom or Google Meet, and day to day communication runs through WhatsApp and email. Being based in Kota Damansara doesn't limit who we work with we've also delivered campaigns for clients across Singapore and wider Southeast Asia."  },
  {
    q: "How do we measure success? What KPIs do you use?",
    a: "We tie KPIs to your actual business goals, not marketing vanity metrics. Depending on your objective, we track metrics like qualified leads generated, cost per lead, cost per acquisition, return on ad spend, organic traffic to key converting pages, and where we have e-commerce data direct revenue. Before any work begins, we document a written set of KPIs and targets that we're held to each month. These are reviewed and updated quarterly as the programme evolves."  },
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
               Malaysian Business Owners Ask US Most
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
