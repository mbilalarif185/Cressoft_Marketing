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
// (HomeTwoOffer is now a static roadmap ledger - no Swiper - but deferring
// still keeps below-the-fold JS out of the page-level chunk while
// SSR-rendering for SEO + first paint.)
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
const HomeFaq = dynamic(
  () => import("@/components/containers/home-two/HomeFaq"),
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
        title="Global Technology Partner London | SaaS, AI & Web Development | Quantel Solutions"
        description="Quantel Solutions — London's global tech partner. SaaS development, AI automation, web development & white-label software for UK, USA & UAE. 500+ projects."
        pathname="/"
        keywords={[
          "SaaS development company UK",
          "AI automation agency",
          "web development London",
          "white label software UK",
          "technology partner UAE",
          "SaaS development USA",
          "digital marketing agency UK",
          "Quantel Solutions",
        ]}
        image={`${SITE_URL}/images/feature.png`}
        imageAlt="Quantel Solutions - Global Technology & SaaS Partner"
      />
      {/*
        Organization / LocalBusiness / WebSite JSON-LD are emitted site-wide
        from _app.tsx (single, canonical, @id-referenced nodes), so the
        homepage no longer ships a duplicate Organization block. `sameAs`
        covers Instagram + Facebook + LinkedIn via constants/socialLinks.ts.
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
      <HomeFaq />
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
