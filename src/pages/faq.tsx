import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import FaqMain from "@/components/containers/FaqMain";

import { SITE_URL } from "@/lib/seo";

const FaqPage = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="FAQs — Cressoft Digital Marketing Agency Malaysia"
        description="Common questions about Cressoft Marketing's services, timelines, and engagement model — for SMEs and startups across Malaysia."
        pathname="/faq"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "FAQs", url: `${SITE_URL}/faq` },
        ]}
      />
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
