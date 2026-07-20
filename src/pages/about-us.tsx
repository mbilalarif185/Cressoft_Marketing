import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import Agency from "@/components/containers/home/Agency";
import HomeThreeServices from "@/components/containers/home-three/HomeThreeServices";
import AboutCta from "@/components/containers/home-two/AboutCta";

import { SITE_URL } from "@/lib/seo";

// Below-the-fold sections that pull in Swiper - defer them so the LCP banner
// and Agency block don't have to wait on the carousel runtime.
const HomeTwoTestimonial = dynamic(
  () => import("@/components/containers/home-two/HomeTwoTestimonial")
);
const HomeTwoSponsor = dynamic(
  () => import("@/components/containers/home-two/HomeTwoSponsor")
);

// Stat row — reuses the `.marketing-results` / `.geo-stats` card pattern that
// the geo landing pages use, so the styling stays consistent with the rest of
// the site without introducing new CSS.
const STATS: { value: string; label: string; detail: string }[] = [
  {
    value: "500+",
    label: "Projects Delivered",
    detail: "SaaS platforms, white-label products and web apps shipped since 2021.",
  },
  {
    value: "98%",
    label: "Client Retention Rate",
    detail: "Clients stay with us because we treat every project as a partnership.",
  },
  {
    value: "50+",
    label: "Team Specialists",
    detail: "Developers, designers, AI engineers, marketers and product strategists.",
  },
  {
    value: "5+",
    label: "Years in Business",
    detail: "London-founded in 2021 and delivering across the UK, USA and UAE.",
  },
];

// Company timeline — reuses the `.award` / `.award__content-meta` milestone
// markup from the homepage award section (which is not exported standalone),
// so the milestone cards match the existing design.
const TIMELINE: { year: string; title: string; detail: string }[] = [
  {
    year: "2021",
    title: "Where It All Began",
    detail:
      "Founded in London with a mission to make enterprise-grade technology accessible to ambitious businesses of all sizes.",
  },
  {
    year: "2022",
    title: "First International Clients",
    detail:
      "Expanded beyond the UK into UAE and began serving businesses in Dubai and Abu Dhabi — our first international client relationships.",
  },
  {
    year: "2023",
    title: "100+ Clients Served",
    detail:
      "Hit a major milestone — 100 clients served across the UK, USA and UAE. Grew the team to 30+ specialists.",
  },
  {
    year: "2024",
    title: "AI Automation Launch",
    detail:
      "Added dedicated AI automation and LLM integration capabilities to our service offering — responding to growing client demand.",
  },
  {
    year: "2026",
    title: "Global Delivery at Scale",
    detail:
      "500+ projects delivered. 50+ team specialists. Operating across three continents with a 98% client retention rate.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about-us#webpage`,
  url: `${SITE_URL}/about-us`,
  name: "About Quantel Solutions",
  description:
    "Quantel Solutions is a London-based SaaS development company and technology partner for startups and enterprises across the UK, USA and UAE.",
  inLanguage: "en-GB",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${SITE_URL}/about-us`,
      },
    ],
  },
};

const AboutUs = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="About Quantel Solutions | SaaS Development & Technology Partner London"
        description="Quantel Solutions is a London-based SaaS development company and technology partner for startups and enterprises across the UK, USA and UAE. 500+ projects. 50+ specialists. Book a free call."
        pathname="/about-us"
        keywords={[
          "about quantel solutions",
          "saas development company london",
          "technology partner uk",
          "white label software company uk",
          "ai automation agency london",
          "web development company uk",
          "quantel solutions london",
        ]}
        image={`${SITE_URL}/images/about-us.webp`}
        imageAlt="Quantel Solutions global technology team"
        webPageType="AboutPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About Us", url: `${SITE_URL}/about-us` },
        ]}
        jsonLd={aboutPageSchema}
      />
      <CmnBanner
        title="About Quantel Solutions"
        navigation="About Us"
        description="London-based SaaS development company and technology partner for startups and enterprises across the UK, USA and UAE. 500+ projects delivered. 98% client retention rate."
      />

      <Agency />

      {/* Stats row — between the main about section and Why Choose Us. */}
      <section
        className="section marketing-results geo-stats"
        aria-labelledby="about-stats-title"
      >
        <div className="container">
          <h2 id="about-stats-title" className="visually-hidden">
            Quantel Solutions by the numbers
          </h2>
          <ul
            className="row gaper marketing-results__grid"
            aria-label="Key figures"
          >
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className="col-12 col-sm-6 col-xl-3 marketing-results__col"
              >
                <article className="marketing-results__card">
                  <span className="marketing-results__metric">
                    {stat.value}
                  </span>
                  <strong className="marketing-results__label">
                    {stat.label}
                  </strong>
                  <p className="marketing-results__detail">{stat.detail}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company timeline — a horizontal "lifeline" spine culminating in a
          highlighted "Today" node. Dedicated .journey markup + CSS. */}
      <section className="section journey" aria-labelledby="about-timeline-title">
        <div className="container">
          <div className="journey__head">
            <div className="journey__head-main">
              <span className="sub-title">
                Our Journey
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="about-timeline-title" className="title title-anim">
                From a London Startup to Global Delivery
              </h2>
            </div>
            <p className="journey__head-note">
              Five years, three markets, one team of 50+ — here is how Quantel
              grew from its first UK client to global delivery at scale.
            </p>
          </div>

          <ol className="journey__track">
            {TIMELINE.map((milestone, index) => {
              const isNow = index === TIMELINE.length - 1;
              return (
                <li
                  key={milestone.year}
                  className={
                    "journey__step" + (isNow ? " journey__step--now" : "")
                  }
                >
                  <div className="journey__marker">
                    <span className="journey__year">{milestone.year}</span>
                    {isNow && <span className="journey__now">Today</span>}
                    <span className="journey__node" aria-hidden="true"></span>
                  </div>
                  <div className="journey__body">
                    <h3 className="journey__title">{milestone.title}</h3>
                    <p className="journey__detail">{milestone.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <HomeThreeServices />
      <HomeTwoTestimonial
        marqueeText="SaaS Development · White Label Software · AI Automation · Web Development · London Based · Global Delivery ·"
        marqueeHref="https://wa.me/447879301606?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services"
      />
      <HomeTwoSponsor />
      <AboutCta />
    </Layout>
  );
};

export default AboutUs;
