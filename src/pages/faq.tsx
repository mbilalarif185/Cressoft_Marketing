import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import FaqMain from "@/components/containers/FaqMain";

import { SITE_URL, faqPageSchema } from "@/lib/seo";

const FAQ_ITEMS = [
  {
    question: "How soon will we start seeing results from digital marketing?",
    answer:
      "Google Ads and Meta campaigns typically generate first qualified leads within 10–14 days. SEO usually shows meaningful traffic movement between months 3 and 6.",
  },
  {
    question: "Do you only work with large companies, or do you take on SMEs?",
    answer:
      "The majority of our clients are Malaysian SMEs with 5 to 200 staff. We scope every engagement to the actual size and stage of the business.",
  },
  {
    question: "What is included in the free strategy audit?",
    answer:
      "A genuine 30-minute working session with a senior Cressoft strategist covering your top 3 opportunities and a practical 30-day action plan.",
  },
  {
    question: "Do you work with businesses outside of Kuala Lumpur?",
    answer:
      "Yes. We work remotely with clients across Malaysia and have delivered campaigns for clients in Singapore and wider Southeast Asia.",
  },
];

const FaqPage = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="FAQs — Cressoft Digital Marketing Agency Malaysia"
        description="Answers to common questions about how Cressoft Marketing works, timelines, deliverables, pricing, and what to expect when you engage our digital marketing team in Malaysia."
        pathname="/faq"
        keywords={[
          "digital marketing FAQ Malaysia",
          "Cressoft FAQs",
          "marketing agency questions Malaysia",
          "SEO questions Malaysia",
          "how digital marketing works Malaysia",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Frequently asked questions — Cressoft Marketing Malaysia"
        webPageType="FAQPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "FAQs", url: `${SITE_URL}/faq` },
        ]}
        jsonLd={faqPageSchema(FAQ_ITEMS)}
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
