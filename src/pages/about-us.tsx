import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import Agency from "@/components/containers/home/Agency";
import HomeTwoTestimonial from "@/components/containers/home-two/HomeTwoTestimonial";
import HomeTwoSponsor from "@/components/containers/home-two/HomeTwoSponsor";
import AboutCta from "@/components/containers/home-two/AboutCta";
import HomeThreeServices from "@/components/containers/home-three/HomeThreeServices"

const AboutUs = () => {
  return (
    <Layout header={2} footer={1} video={0}>
      <CmnBanner
        title="About Us"
        navigation="About Us"
        description="We are a results-driven digital marketing agency in Kuala Lumpur, dedicated to helping Malaysian businesses grow their online presence and generate measurable results."
      />
      
      <Agency />
      <HomeThreeServices />
      <HomeTwoTestimonial 
       marqueeText="More leads Less guesswork Let's grow"
  marqueeHref="https://wa.me/601111020111?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services"/>
       <HomeTwoSponsor />
      <AboutCta />
    </Layout>
  );
};

export default AboutUs;
