import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import Agency from "@/components/containers/home/Agency";
import HomeThreeServices from "@/components/containers/home-three/HomeThreeServices";
import AboutCta from "@/components/containers/home-two/AboutCta";

import { SITE_URL } from "@/lib/seo";

// Below-the-fold sections that pull in Swiper — defer them so the LCP banner
// and Agency block don't have to wait on the carousel runtime.
const HomeTwoTestimonial = dynamic(
  () => import("@/components/containers/home-two/HomeTwoTestimonial")
);
const HomeTwoSponsor = dynamic(
  () => import("@/components/containers/home-two/HomeTwoSponsor")
);

const AboutUs = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="About Us — Digital Marketing Agency in Kuala Lumpur"
        description="Cressoft Marketing is a results-driven digital marketing agency based in Kota Damansara, Selangor — helping Malaysian SMEs grow online through SEO, Google Ads, social media, and web development."
        pathname="/about-us"
        keywords={[
          "about Cressoft",
          "digital marketing agency Kuala Lumpur",
          "marketing agency Selangor",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About Us", url: `${SITE_URL}/about-us` },
        ]}
      />
      <CmnBanner
        title="About Us"
        navigation="About Us"
        description="We are a results-driven digital marketing agency in Kuala Lumpur, dedicated to helping Malaysian businesses grow their online presence and generate measurable results."
      />

      <Agency />
      <HomeThreeServices />
      <HomeTwoTestimonial
        marqueeText="More leads Less guesswork Let's grow"
        marqueeHref="https://wa.me/601128890942?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services"
      />
      <HomeTwoSponsor />
      <AboutCta />
    </Layout>
  );
};

export default AboutUs;
