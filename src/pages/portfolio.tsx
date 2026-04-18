import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import PortfolioMain from "@/components/containers/PortfolioMain";

import { SITE_URL } from "@/lib/seo";

const OurPortfolio = () => {
  return (
    <Layout header={2} footer={5}>
      <Seo
        title="Portfolio — Digital Marketing Case Studies Malaysia"
        description="A selection of digital marketing campaigns, brand identities, and web projects delivered by Cressoft for clients across Malaysia."
        pathname="/portfolio"
        keywords={[
          "digital marketing portfolio Malaysia",
          "marketing case studies Malaysia",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Portfolio", url: `${SITE_URL}/portfolio` },
        ]}
      />
      <CmnBanner
        title="Portfolio Gallery"
        navigation="Portfolio Gallery"
        description="A curated selection of campaigns, identities, and digital experiences—showing how we translate briefs into work that performs and resonates."
      />
      <PortfolioMain />
    </Layout>
  );
};

export default OurPortfolio;
