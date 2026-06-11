import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import MarketingServices from "@/components/containers/marketing-solutions/MarketingServices";
import MarketingResults from "@/components/containers/marketing-solutions/MarketingResults";
import MarketingProcess from "@/components/containers/marketing-solutions/MarketingProcess";
import MarketingCta from "@/components/containers/marketing-solutions/MarketingCta";

import { SITE_URL } from "@/lib/seo";

const MARKETING_SOLUTIONS_OFFERS = [
  "SaaS Product Development",
  "White-Label Solutions",
  "AI & Automation",
  "Web Development",
  "Search Engine Optimization",
  "Social Media Marketing",
  "Mobile App Development",
  "Ecommerce Solutions",
  "ERP Solutions",
  "UI/UX Design",
] as const;

const MarketingSolutions = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Technology & SaaS Solutions — SaaS, White-Label, AI & More | Quantel Solutions"
        description="Explore Quantel Solutions' full range of capabilities for global teams — SaaS product development, white-label platforms, AI & automation, web and mobile apps, e-commerce, ERP, SEO, and UI/UX design."
        pathname="/marketing-solutions"
        keywords={[
          "SaaS development UK",
          "white label software",
          "AI solutions",
          "web development London",
          "mobile app development UK",
          "ecommerce development",
          "ERP solutions",
          "digital marketing UK",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Technology and SaaS solutions offered by Quantel Solutions"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Services",
            url: `${SITE_URL}/marketing-solutions`,
          },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Technology & SaaS Solutions",
          serviceType: "Technology & SaaS Solutions",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          url: `${SITE_URL}/marketing-solutions`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Quantel Solutions Services",
            itemListElement: MARKETING_SOLUTIONS_OFFERS.map((name) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name,
              },
            })),
          },
        }}
      />
      <CmnBanner
        title="Services"
        navigation="Services"
        description="Quantel Solutions is a results-first technology company headquartered in London.
         We design, build, and scale SaaS products, white-label platforms, AI, and growth programmes
         for startups, scaleups, and enterprises across the UK, US, UAE, and beyond
          — turning ambitious roadmaps into real, measurable outcomes."
      />
      <MarketingServices />
      <MarketingResults />
      <MarketingProcess />

      <MarketingCta />
    </Layout>
  );
};

export default MarketingSolutions;
