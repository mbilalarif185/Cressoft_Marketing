import React from "react";
import Layout from "@/components/layout/Layout";
import HomeTwoBanner from "@/components/layout/banner/HomeOneBanner";
import HomeTwoSponsor from "@/components/containers/home-two/HomeTwoSponsor";
import HomeTwoAward from "@/components/containers/home-two/HomeTwoAward";
import HomeTwoOffer from "@/components/containers/home-two/HomeTwoOffer";
import HomeTwoModal from "@/components/containers/home-two/HomeTwoModal";
import NextPageNull from "@/components/containers/home/NextPageNull";
import HomeTwoPortfolio from "@/components/containers/home-two/HomeTwoPortfolio";
import HomeTwoTestimonial from "@/components/containers/home-two/HomeTwoTestimonial";
import HomeTwoBlog from "@/components/containers/home-two/HomeTwoBlog";

import MarketingFaq from "@/components/containers/marketing-solutions/MarketingFaq";
import CtaSuccess from "@/components/containers/success-stories/CtaSuccess";

const HomeTwo = () => {
  return (
    <Layout header={2} footer={1} video={true}>
      <HomeTwoBanner />
    
      <HomeTwoAward />
      <HomeTwoOffer />
      {/* <HomeTwoModal /> */}
      <HomeTwoPortfolio />
      <HomeTwoSponsor />
      <HomeTwoTestimonial
       marqueeText="Grow Your Brand in Malaysia"
       marqueeHref="https://wa.me/601111020111?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services" />
      <MarketingFaq/>
      <HomeTwoBlog />
      <CtaSuccess />
      <NextPageNull />
    </Layout>
  );
};

export default HomeTwo;
