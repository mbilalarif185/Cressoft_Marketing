import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import PortfolioMain from "@/components/containers/PortfolioMain";

const OurPortfolio = () => {
  return (
    <Layout header={2} footer={5} video={0}>
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
