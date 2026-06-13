import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import HomeTwoCta from "@/components/containers/service-details/CtaTwo";

import { SITE_URL } from "@/lib/seo";

// ProjectMain renders a Swiper carousel - defer it so Swiper does not enter
// the page-level First Load JS (still SSR-rendered for SEO + paint).
const ProjectMain = dynamic(
  () => import("@/components/containers/project/ProjectMain")
);

const OurProjects = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Our Work & Success Stories - Technology Portfolio | Quantel Solutions"
        description="Explore Quantel Solutions' portfolio of successful projects - SaaS platforms, white-label products, AI solutions, web and app development, and growth campaigns for clients across the UK, US, UAE, and beyond."
        pathname="/success-stories"
        keywords={[
          "Quantel Solutions portfolio",
          "SaaS case studies",
          "white label software projects",
          "success stories technology partner",
          "AI project results",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Quantel Solutions portfolio and success stories"
        webPageType="CollectionPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Our Work", url: `${SITE_URL}/success-stories` },
        ]}
      />
      <CmnBanner
        title="Our Work"
        navigation="Our Projects"
        description="We're a London-headquartered technology company proudly partnering with startups, scaleups,
         and enterprises to build SaaS products, white-label platforms, and digital experiences
          across the UK, US, UAE, and beyond."
      />
      <ProjectMain />
      <WorkStepsProject />
      <HomeTwoCta />
    </Layout>
  );
};

export default OurProjects;
