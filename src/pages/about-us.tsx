import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import Agency from "@/components/containers/home/Agency";
import HomeThreeServices from "@/components/containers/home-three/HomeThreeServices";
import AboutCta from "@/components/containers/home-two/AboutCta";

import { SITE_URL } from "@/lib/seo";

// Below-the-fold sections that pull in Swiper - defer them so the LCP banner
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
        title="About Us - Global Technology Partner Based in London | Quantel Solutions"
        description="Quantel Solutions is a London-headquartered technology company helping startups, scaleups, and enterprises across the UK, US, and UAE build SaaS products and drive measurable growth since 2021."
        pathname="/about-us"
        keywords={[
          "about Quantel Solutions",
          "technology partner London",
          "SaaS development company UK",
          "global software team",
          "full service technology company UK",
        ]}
        image={`${SITE_URL}/images/about-us.webp`}
        imageAlt="Quantel Solutions global technology team"
        webPageType="AboutPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About Us", url: `${SITE_URL}/about-us` },
        ]}
      />
      <CmnBanner
        title="About Us"
        navigation="About Us"
        description="We are a London-headquartered technology company, dedicated to helping businesses across the UK, US, UAE, and beyond build digital products and generate measurable growth."
      />

      <Agency />
      <HomeThreeServices />
      <HomeTwoTestimonial
        marqueeText="Build smarter Scale faster Go global"
        marqueeHref="https://wa.me/447879301606?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services"
      />
      <HomeTwoSponsor />
      <AboutCta />
    </Layout>
  );
};

export default AboutUs;
