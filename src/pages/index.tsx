import React from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import HomeTwoBanner from "@/components/layout/banner/HomeOneBanner";
import { getAllPostMeta } from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

import { PRIMARY_SERVICES, serviceSchema, SITE_URL } from "@/lib/seo";

// Below-the-fold sections — defer their JS so the LCP banner ships first.
// HomeTwoOffer pulls in the Swiper runtime; deferring it keeps Swiper out of
// the page-level chunk while still SSR-rendering for SEO + first paint.
const HomeTwoAward = dynamic(
  () => import("@/components/containers/home-two/HomeTwoAward"),
  { loading: () => null }
);
const HomeTwoOffer = dynamic(
  () => import("@/components/containers/home-two/HomeTwoOffer"),
  { loading: () => null }
);
const HomeTwoPortfolio = dynamic(
  () => import("@/components/containers/home-two/HomeTwoPortfolio"),
  { loading: () => null }
);
const HomeTwoSponsor = dynamic(
  () => import("@/components/containers/home-two/HomeTwoSponsor"),
  { loading: () => null }
);
const HomeTwoTestimonial = dynamic(
  () => import("@/components/containers/home-two/HomeTwoTestimonial"),
  { loading: () => null }
);
const HomeTwoBlog = dynamic(
  () => import("@/components/containers/home-two/HomeTwoBlog"),
  { loading: () => null }
);
const MarketingFaq = dynamic(
  () => import("@/components/containers/marketing-solutions/MarketingFaq"),
  { loading: () => null }
);
const CtaSuccess = dynamic(
  () => import("@/components/containers/success-stories/CtaSuccess"),
  { loading: () => null }
);
const NextPageNull = dynamic(
  () => import("@/components/containers/home/NextPageNull"),
  { loading: () => null }
);

type HomeProps = {
  blogPosts: BlogPostMeta[];
};

const HomeTwo = ({ blogPosts }: HomeProps) => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Digital Marketing Agency in Malaysia"
        description="Cressoft Marketing is a results-driven digital marketing agency in Malaysia offering SEO, Google Ads, social media marketing, and web development for SMEs across Kuala Lumpur, Selangor, Penang, and Johor."
        pathname="/"
        jsonLd={PRIMARY_SERVICES.map((s) =>
          serviceSchema({
            name: s.name,
            description: s.description,
            url: `${SITE_URL}/marketing-solutions`,
          })
        )}
      />
      <HomeTwoBanner />

      <HomeTwoAward />
      <HomeTwoOffer />
      <HomeTwoPortfolio />
      <HomeTwoSponsor />
      <HomeTwoTestimonial
        marqueeText="Grow Your Brand in Malaysia"
        marqueeHref="https://wa.me/601128890942?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services"
      />
      <MarketingFaq />
      <HomeTwoBlog posts={blogPosts} />
      <CtaSuccess />
      <NextPageNull />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    blogPosts: getAllPostMeta(),
  },
  revalidate: 3600,
});

export default HomeTwo;
