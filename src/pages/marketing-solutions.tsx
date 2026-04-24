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
  "AI Solutions",
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
        title="Digital Marketing Solutions Malaysia — SEO, Web, AI & More | Cressoft Marketing"
        description="Explore Cressoft Marketing's full range of digital solutions for Malaysian businesses — SEO, web development, AI solutions, social media marketing, mobile apps, e-commerce, ERP, and UI/UX design."
        pathname="/marketing-solutions"
        keywords={[
          "digital marketing solutions Malaysia",
          "SEO services Malaysia",
          "web development Malaysia",
          "AI solutions Malaysia",
          "social media marketing Malaysia",
          "mobile app development Malaysia",
          "ecommerce Malaysia",
          "ERP Malaysia",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Digital marketing solutions offered by Cressoft Marketing Malaysia"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Marketing Solutions",
            url: `${SITE_URL}/marketing-solutions`,
          },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Digital Marketing Solutions",
          serviceType: "Digital Marketing Solutions",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "Malaysia" },
          url: `${SITE_URL}/marketing-solutions`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Cressoft Marketing Solutions",
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
        title="Marketing Solutions"
        navigation="Marketing Solutions"
        description="Cressoft is a results-first digital marketing agency in Kota Damansara,
         Malaysia. We build and run full-funnel marketing programmes for SMEs, startups, 
         and fast growing brands across Kuala Lumpur,Selangor, Penang, and Johor
          turning online visibility into real, measurable revenue."
      />
      <MarketingServices />
      <MarketingResults />
      <MarketingProcess />

      <MarketingCta />
    </Layout>
  );
};

export default MarketingSolutions;
