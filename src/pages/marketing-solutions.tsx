import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import MarketingServices from "@/components/containers/marketing-solutions/MarketingServices";
import MarketingResults from "@/components/containers/marketing-solutions/MarketingResults";
import MarketingProcess from "@/components/containers/marketing-solutions/MarketingProcess";
import MarketingCta from "@/components/containers/marketing-solutions/MarketingCta";

import { PRIMARY_SERVICES, SITE_URL, serviceSchema } from "@/lib/seo";

const MarketingSolutions = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Marketing Solutions — SEO, Google Ads & Social Media Malaysia"
        description="Full-funnel digital marketing in Malaysia — SEO, Google Ads, social media marketing, and web development for SMEs across Kuala Lumpur, Selangor, Penang, and Johor."
        pathname="/marketing-solutions"
        keywords={[
          "digital marketing services Malaysia",
          "SEO agency Malaysia",
          "Google Ads agency Malaysia",
          "social media marketing Malaysia",
          "marketing solutions Kuala Lumpur",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Marketing Solutions",
            url: `${SITE_URL}/marketing-solutions`,
          },
        ]}
        jsonLd={PRIMARY_SERVICES.map((s) =>
          serviceSchema({
            name: s.name,
            description: s.description,
            url: `${SITE_URL}/marketing-solutions`,
          })
        )}
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
