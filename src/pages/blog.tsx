import React from "react";
import type { GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import BlogMain from "@/components/containers/blog/BlogMain";
import {
  getAllPostMeta,
  getAllCategories,
  getAllTags,
} from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

import { SITE_URL } from "@/lib/seo";

type BlogPageProps = {
  posts: BlogPostMeta[];
  categories: string[];
  tags: string[];
};

const BlogPage = ({ posts, categories, tags }: BlogPageProps) => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Digital Marketing Blog Malaysia — SEO, Ads & Growth Insights | Cressoft Marketing"
        description="Articles on branding, SEO, digital marketing, and web design — practical ideas and growth insights for Malaysian businesses and SMEs from the Cressoft Marketing team."
        pathname="/blog"
        keywords={[
          "digital marketing blog Malaysia",
          "SEO tips Malaysia",
          "web design blog",
          "lead generation Malaysia",
          "Google ranking tips",
          "local SEO Malaysia",
          "SME marketing blog",
        ]}
        image={`${SITE_URL}/images/blog2.webp`}
        imageAlt="Cressoft Marketing digital marketing blog Malaysia"
        webPageType="Blog"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      >
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Cressoft Blog RSS"
          href={`${SITE_URL}/feed.xml`}
        />
      </Seo>
      <CmnBanner
        title="Blog"
        navigation="Blog"
        description="Articles on branding, marketing, and digital product thinking — practical ideas you can apply to your next launch or refresh."
      />
      <BlogMain posts={posts} categories={categories} tags={tags} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  return {
    props: {
      posts: getAllPostMeta(),
      categories: getAllCategories(),
      tags: getAllTags(),
    },
    // ISR: regenerate at most once an hour so newly added MDX posts go live
    // without a full redeploy. Safe for public blog content.
    revalidate: 3600,
  };
};

export default BlogPage;
