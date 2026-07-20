import React, { useCallback, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import dotlarge from "public/images/agency/dot-large.webp";
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
    id: "saas-core",
    title: "SaaS Development is Our Core",
    description:
      "We are not a generalist agency that does everything. SaaS platform development, white-label products and AI automation are what we do best \u2014 and what we have delivered for 500+ clients across the UK, USA and UAE.",
    image: serviceInnovation,
    alt: "SaaS platform development team at Quantel Solutions",
    bullets: [
      "Custom SaaS platforms",
      "White label products",
      "AI automation systems",
      "End-to-end delivery",
    ],
  },
  {
    id: "london-global",
    title: "London Headquartered, Globally Delivered",
    description:
      "Our headquarters is at 20 Fenchurch Street, London. Our 50+ specialist team operates across UK, USA and UAE timezones \u2014 giving every client the accountability of a London-based partner with the capacity of a global team.",
    image: serviceResults,
    alt: "Quantel Solutions London headquarters and global team",
    bullets: [
      "London HQ address",
      "50+ specialist team",
      "UK USA UAE timezone cover",
      "Single accountable partner",
    ],
  },
  {
    id: "stay-after-launch",
    title: "We Stay After Launch",
    description:
      "Most agencies disappear after they hand over the files. We do not. Our 98% client retention rate exists because we treat every project as the beginning of a long relationship \u2014 not the end of a contract.",
    image: serviceModernization,
    alt: "Long-term client partnership and post-launch support",
    bullets: [
      "98% client retention",
      "Post-launch support included",
      "Monthly retainer options",
      "Long-term partnership model",
    ],
  },
  {
    id: "transparent",
    title: "Transparent from Day One",
    description:
      "Every project starts with a clear scope, a fixed timeline and an honest budget conversation. We do not do vague proposals, surprise invoices or scope creep without your sign-off. You always know exactly where your project stands.",
    image: serviceConsulting,
    alt: "Transparent project scope, timeline and budget",
    bullets: [
      "Fixed scope and timeline",
      "Honest budget conversations",
      "Weekly progress updates",
      "No surprise charges",
    ],
  },
  {
    id: "three-markets",
    title: "Three Markets. One Team.",
    description:
      "We serve clients across the UK, USA and UAE from one coordinated team. No handoffs between offices. No communication gaps. The same senior specialists who scope your project build and deliver it.",
    image: serviceLocal,
    alt: "One coordinated team serving UK, USA and UAE",
    bullets: [
      "UK USA UAE coverage",
      "One coordinated team",
      "Senior specialists on every project",
      "No offshore handoffs",
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
    <section className="section service-f fade-wrapper " aria-labelledby="why-choose-quantel">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header--secondary g-ind">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="section__header text-center text-lg-start mb-0">
                    <span className="sub-title">
                      Why UK, USA &amp; UAE Businesses Choose Quantel
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </span>
                    <h2 id="why-choose-quantel" className="title title-anim">
                      What Makes Quantel Different
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
