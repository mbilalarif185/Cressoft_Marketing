import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import HomeTwoAward from "@/components/containers/home-two/HomeTwoAward";
import OurMission from "@/components/containers/OurMission";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import OurAchievement from "@/components/containers/OurAchievement";

const OurStory = () => {
  return (
    <Layout header={2} footer={1} video={0}>
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
