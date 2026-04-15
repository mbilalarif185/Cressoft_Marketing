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
import HomeTwoCta from "@/components/containers/service-details/CtaTwo";

const HomeTwo = () => {
  return (
    <Layout header={2} footer={1} video={true}>
      <HomeTwoBanner />
    
      <HomeTwoAward />
      <HomeTwoOffer />
      <HomeTwoModal />
      <HomeTwoPortfolio />
      <HomeTwoSponsor />
      <HomeTwoTestimonial />
      <HomeTwoBlog />
      <HomeTwoCta />
      <NextPageNull />
    </Layout>
  );
};

export default HomeTwo;
