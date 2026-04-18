import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import UxProcess from "@/components/containers/service-details/UxProcess";

import { SITE_URL } from "@/lib/seo";

// ProjectDetailsMain renders multiple Swiper galleries — defer it so the
// Swiper runtime does not enter this page's First Load chunk.
const ProjectDetailsMain = dynamic(
  () => import("@/components/containers/project/ProjectDetailsMain")
);

const ProjectDetails = () => {
  return (
    <Layout header={2} footer={5}>
      <Seo
        title="Project Details — Cressoft Marketing Malaysia"
        description="Inside view of a digital marketing and brand identity project delivered by Cressoft for Malaysian businesses."
        pathname="/project-single"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Projects", url: `${SITE_URL}/success-stories` },
          { name: "Project Details", url: `${SITE_URL}/project-single` },
        ]}
      />
      <CmnBanner
        title="Brand Identity"
        navigation="Brand Identity"
        parent="Projects"
        parentLink="our-projects"
        description="A closer look at this brand identity programme: context, creative direction, and how the system comes to life across touchpoints."
      />
      <ProjectDetailsMain />
      <UxProcess />
    </Layout>
  );
};

export default ProjectDetails;
