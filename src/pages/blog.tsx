import React from "react";
import type { GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import BlogMain from "@/components/containers/blog/BlogMain";
import {
  getAllPostMeta,
  getAllCategories,
  getAllTags,
} from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

type BlogPageProps = {
  posts: BlogPostMeta[];
  categories: string[];
  tags: string[];
};

const BlogPage = ({ posts, categories, tags }: BlogPageProps) => {
  return (
    <Layout header={2} footer={1} video={0}>
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
  };
};

export default BlogPage;
