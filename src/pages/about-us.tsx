import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import HomeTwoModal from "@/components/containers/home-two/HomeTwoModal";
import Agency from "@/components/containers/home/Agency";
import HomeTestimonial from "@/components/containers/home/HomeTestimonial";
import HomeTwoSponsor from "@/components/containers/home-two/HomeTwoSponsor";
import AboutCta from "@/components/containers/home-two/AboutCta";

const AboutUs = () => {
  return (
    <Layout header={2} footer={1} video={0}>
      <CmnBanner title="About Us" navigation="About Us" />
      <HomeTwoModal />
      <Agency />
      <HomeTestimonial />
       <HomeTwoSponsor />
      <AboutCta />
    </Layout>
  );
};

export default AboutUs;
