import React, { useCallback, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import dotlarge from "public/images/agency/dot-large.png";
import serviceResults from "public/images/service/results.webp";
import serviceModernization from "public/images/service/deep.webp";
import serviceInnovation from "public/images/service/full.webp";
import serviceConsulting from "public/images/service/trans.webp";
import serviceLocal from "public/images/service/agile.webp";

type Service = {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    id: "full-service",
    title: "Full-Service Under One Roof",
    description:
      "From SEO and Google Ads to social media, web development, content creation, and graphic design, we handle your entire digital presence so you don\u2019t need to juggle multiple vendors.",
    image: serviceInnovation,
    alt: "Full-service marketing team under one roof",
    bullets: [
      "SEO and Ads",
      "Web and design",
      "One unified team",
      "Zero vendor juggling",
    ],
  },
  {
    id: "results-driven",
    title: "Results-Driven Approach",
    description:
      "We measure everything. From click-through rates to cost-per-lead and revenue attribution, every campaign we run is tied to KPIs that matter to your business \u2014 not just impressions and likes.",
    image: serviceResults,
    alt: "Results-driven marketing dashboard",
    bullets: [
      "Data-backed decisions",
      "KPI-focused campaigns",
      "Measurable real ROI",
      "Continuous performance optimisation",
    ],
  },
  {
    id: "local-knowledge",
    title: "Deep Local Market Knowledge",
    description:
      "As a Kuala Lumpur-based agency, we understand how Malaysian consumers search, scroll, and buy. We craft bilingual strategies (English & Bahasa Malaysia) designed to resonate with your local audience.",
    image: serviceModernization,
    alt: "Deep local Malaysian market knowledge",
    bullets: [
      "Kuala Lumpur-based experts",
      "Bilingual strategy crafting",
      "Local consumer insights",
      "Culturally relevant campaigns",
    ],
  },
  {
    id: "transparent-reporting",
    title: "Transparent Reporting",
    description:
      "We send clear, easy-to-understand performance reports every month. You will always know exactly what\u2019s working, what we\u2019re optimising, and where your marketing budget is going.",
    image: serviceConsulting,
    alt: "Transparent monthly marketing performance reporting",
    bullets: [
      "Monthly clear reports",
      "Budget fully visible",
      "No hidden surprises",
      "Always stay informed",
    ],
  },
  {
    id: "agile-scalable",
    title: "Agile & Scalable Strategies",
    description:
      "Whether you\u2019re a startup just launching or an SME ready to scale, our strategies flex with your growth. We move fast, adapt quickly, and keep you ahead of your competitors.",
    image: serviceLocal,
    alt: "Agile and scalable marketing strategies for growth",
    bullets: [
      "Startup-friendly plans",
      "Scales with growth",
      "Fast market adaptation",
      "Outpace your competitors",
    ],
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

const HomeThreeServices = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleToggle = useCallback(
    (index: number) =>
      setActiveTab((current) => (current === index ? -1 : index)),
    []
  );

  // Schema.org ItemList for the "Why choose us" benefits — helps Google
  // understand the structured benefit list and can enrich SERP rendering.

  return (
    <section className="section service-f fade-wrapper " aria-labelledby="why-choose-cressoft">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header--secondary g-ind">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="section__header text-center text-lg-start mb-0">
                    <span className="sub-title">
                      Why Choose Us?
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </span>
                    <h2 id="why-choose-cressoft" className="title title-anim">
                      Why Businesses in KL Choose Cressoft Marketing
                    </h2>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="service-f-wrapper">
              {SERVICES.map((service, index) => {
                const isActive = activeTab === index;
                const panelId = `service-panel-${service.id}`;
                const buttonId = `service-toggle-${service.id}`;
                return (
                  <article
                    key={service.id}
                    className={
                      "service-f-single fade-top" +
                      (isActive ? " service-f-single-active" : "")
                    }
                    aria-labelledby={buttonId}
                  >
                    <div className="single-item">
                      <span className="sub-title" aria-hidden="true">
                        {pad2(index + 1)}
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                      <h3 id={buttonId}>{service.title}</h3>
                      <div className="p-single" id={panelId}>
                        <p>{service.description}</p>
                      </div>
                    </div>
                    <div className="p-single single-item p-sm">
                      <ul>
                        {service.bullets.map((bullet) => (
                          <li key={bullet}>
                            <i
                              className="fa-solid fa-angle-right"
                              aria-hidden="true"
                            ></i>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="single-item p-single p-sm">
                      {/* Only mount the active card's image — the others are hidden
                          via CSS, so we save 4 network requests + decode work. */}
                      {isActive && (
                        <Image
                          src={service.image}
                          alt={service.alt}
                          height={450}
                          width={300}
                          sizes="(max-width: 768px) 90vw, 300px"
                          placeholder="blur"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="toggle-service-f"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      aria-label={`${isActive ? "Collapse" : "Expand"} ${service.title}`}
                      onClick={() => handleToggle(index)}
                    ></button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Image
        src={dotlarge}
        alt=""
        aria-hidden="true"
        className="dot-img"
        loading="lazy"
      />
    
    </section>
  );
};

export default HomeThreeServices;
