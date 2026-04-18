import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import FaqMain from "@/components/containers/FaqMain";

const FaqPage = () => {
  return (
    <Layout header={2} footer={1} video={0}>
      <CmnBanner
        title="Faq"
        navigation="Faq"
        description="Answers to common questions about how we work, timelines, deliverables, and what to expect when you engage our team."
      />
      <FaqMain />
    </Layout>
  );
};

export default FaqPage;
