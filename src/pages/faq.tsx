import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import FaqMain from "@/components/containers/FaqMain";

import { SITE_URL, faqPageSchema } from "@/lib/seo";

const FAQ_ITEMS = [
  {
    question: "How long does it take to build and launch a SaaS or white-label product?",
    answer:
      "A focused MVP or configured white-label platform typically goes live within 6–12 weeks. Full custom SaaS products usually run 3–6 months to a production-ready v1.",
  },
  {
    question: "Do you only work with large enterprises, or do you take on startups too?",
    answer:
      "Both. We partner with early-stage startups, scaleups, and enterprises. We scope every engagement to the actual size and stage of the business.",
  },
  {
    question: "What is included in the free discovery call?",
    answer:
      "A genuine 30-minute working session with a senior Quantel strategist covering your top opportunities and a practical roadmap you can act on with or without us.",
  },
  {
    question: "Which regions and time zones do you work across?",
    answer:
      "We're headquartered in London and deliver for clients across the UK, US, UAE, and Asia-Pacific, with working hours arranged around your core team.",
  },
];

const FaqPage = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="FAQs — Global Technology & SaaS Partner | Quantel Solutions"
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
        imageAlt="Frequently asked questions — Quantel Solutions"
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
