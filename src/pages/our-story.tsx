import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import HomeTwoAward from "@/components/containers/home-two/HomeTwoAward";
import OurMission from "@/components/containers/OurMission";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";

import { SITE_URL } from "@/lib/seo";

// Bottom-of-page Swiper section — deferred to keep the page-level chunk small.
const OurAchievement = dynamic(
  () => import("@/components/containers/OurAchievement")
);

const OurStory = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Our Story — Cressoft Marketing Malaysia"
        description="The story behind Cressoft Marketing — how a Kuala Lumpur–based team grew into one of Malaysia's go-to digital marketing partners for SMEs and startups."
        pathname="/our-story"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Our Story", url: `${SITE_URL}/our-story` },
        ]}
      />
      <CmnBanner
        title="Our Story"
        navigation="Our Story"
        description="How we started, what drives us today, and the principles that shape every engagement—from first workshop to final handover."
      />
      <HomeTwoAward />
      <OurMission />
      <WorkStepsProject />
      <OurAchievement />
    </Layout>
  );
};

export default OurStory;
