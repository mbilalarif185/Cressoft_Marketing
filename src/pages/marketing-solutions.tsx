import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import MarketingServices from "@/components/containers/marketing-solutions/MarketingServices";
import MarketingResults from "@/components/containers/marketing-solutions/MarketingResults";
import MarketingProcess from "@/components/containers/marketing-solutions/MarketingProcess";
import MarketingCta from "@/components/containers/marketing-solutions/MarketingCta";

const MarketingSolutions = () => {
  return (
    <Layout header={2} footer={1} video={0}>
      <CmnBanner
        title="Marketing Solutions"
        navigation="Marketing Solutions"
        description="Cressoft is a results-first digital marketing agency in Kota Damansara,
         Malaysia. We build and run full-funnel marketing programmes for SMEs, startups, 
         and fast growing brands across Kuala Lumpur,Selangor, Penang, and Johor
          turning online visibility into real, measurable revenue."/>
      <MarketingServices />
      <MarketingResults />
      <MarketingProcess />

      <MarketingCta />
    </Layout>
  );
};

export default MarketingSolutions;
