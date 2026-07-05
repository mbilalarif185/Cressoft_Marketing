import React from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import HeroSection from "@/components/HeroSection";
import { getAllPostMeta } from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

import { SITE_URL } from "@/lib/seo";

// Below-the-fold sections - defer their JS so the LCP banner ships first.
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
        title="Global Technology & SaaS Partner | Quantel Solutions"
        description="Quantel Solutions — global technology partner in London. SaaS, AI, web & white-label software for the UK, USA & UAE. 500+ projects. Book a free call."
        pathname="/"
        keywords={[
          "SaaS development UK",
          "white label software",
          "AI solutions",
          "web development London",
          "digital marketing UK",
          "technology partner UAE",
        ]}
        image={`${SITE_URL}/images/feature.png`}
        imageAlt="Quantel Solutions - Global Technology & SaaS Partner"
      />
      {/*
        Organization / LocalBusiness / WebSite JSON-LD are emitted site-wide
        from _app.tsx (single, canonical, @id-referenced nodes), so the
        homepage no longer ships a duplicate Organization block. The previous
        inline copy also carried a LinkedIn `sameAs`, now removed per the
        Instagram + Facebook-only policy.
      */}
      <HeroSection />

      <HomeTwoAward />
      <HomeTwoOffer />
      <HomeTwoPortfolio />
      <HomeTwoSponsor />
      <HomeTwoTestimonial
        marqueeText="Build Something Global with Quantel"
        marqueeHref="https://wa.me/447879301606?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services"
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
    blogPosts: await getAllPostMeta(),
  },
  revalidate: 3600,
});

export default HomeTwo;
