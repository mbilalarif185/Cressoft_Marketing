import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import HomeTwoCta from "@/components/containers/service-details/CtaTwo";

import { SITE_URL } from "@/lib/seo";

// ProjectMain renders a Swiper carousel — defer it so Swiper does not enter
// the page-level First Load JS (still SSR-rendered for SEO + paint).
const ProjectMain = dynamic(
  () => import("@/components/containers/project/ProjectMain")
);

const OurProjects = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Success Stories — Digital Marketing Wins in Malaysia"
        description="See how Malaysian SMEs, startups, and regional brands grow with Cressoft Marketing — from Petaling Jaya and Penang to Johor Bahru and Kota Kinabalu."
        pathname="/success-stories"
        keywords={[
          "digital marketing success stories Malaysia",
          "marketing case studies Kuala Lumpur",
          "SEO results Malaysia",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Success Stories", url: `${SITE_URL}/success-stories` },
        ]}
      />
      <CmnBanner
        title="Our Work"
        navigation="Our Projects"
        description="We're a Kuala Lumpur based digital marketing agency proudly partnering with Malaysian SMEs, homegrown startups,
         and regional brands to build powerful online presences  from Petaling Jaya to Penang,
          Johor Bahru to Kota Kinabalu."
      />
      <ProjectMain />
      <WorkStepsProject />
      <HomeTwoCta />
    </Layout>
  );
};

export default OurProjects;
