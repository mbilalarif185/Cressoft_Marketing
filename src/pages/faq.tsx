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
        title="FAQs - Global Technology & SaaS Partner | Quantel Solutions"
        description="Answers to common questions about how Quantel Solutions works, timelines, deliverables, pricing, and what to expect when you engage our technology team."
        pathname="/faq"
        keywords={[
          "SaaS development FAQ",
          "Quantel Solutions FAQs",
          "technology partner questions",
          "white label software questions",
          "how SaaS development works",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Frequently asked questions - Quantel Solutions"
        webPageType="FAQPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "FAQs", url: `${SITE_URL}/faq` },
        ]}
      />
      {/*
        FAQPage JSON-LD is emitted once, by <FaqMain />, from its own Q&A
        array — so we deliberately do NOT add a second FAQPage block here. Two
        FAQPage entities on one URL with divergent content confuses Google's
        rich-result parser.
      */}
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
