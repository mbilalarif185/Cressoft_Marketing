import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectMain from "@/components/containers/project/ProjectMain";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import HomeTwoCta from "@/components/containers/service-details/CtaTwo";

const OurProjects = () => {
  return (
    <Layout header={2} footer={1} video={0}>
      <CmnBanner
        title="Our Work"
        navigation="Our Projects"
        description="We're a Kuala Lumpur based digital marketing agency proudly partnering with Malaysian SMEs, homegrown startups,
         and regional brands to build powerful online presences  from Petaling Jaya to Penang,
          Johor Bahru to Kota Kinabalu."/>
      <ProjectMain />
      <WorkStepsProject />
      <HomeTwoCta />
    </Layout>
  );
};

export default OurProjects;
