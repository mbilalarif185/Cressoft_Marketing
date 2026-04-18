import React from "react";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import BlogSingleBanner from "@/components/layout/banner/BlogSingleBanner";
import BlogDetailsMain from "@/components/containers/blog/BlogDetailsMain";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAllPostMeta,
} from "@/lib/blog";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

import { SITE_URL, ORGANIZATION_LOGO, SITE_NAME } from "@/lib/seo";

type BlogSinglePageProps = {
  post: Omit<BlogPost, "content">;
  source: MDXRemoteSerializeResult;
  related: BlogPostMeta[];
  recentPosts: BlogPostMeta[];
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
};

const BlogSinglePage = ({
  post,
  source,
  related,
  recentPosts,
  prev,
  next,
}: BlogSinglePageProps) => {
  const router = useRouter();
  const pathname = `/blog/${post.slug}`;
  const url = `${SITE_URL}${pathname}`;
  const cover = post.cover.startsWith("http")
    ? post.cover
    : `${SITE_URL}${post.cover}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: [cover],
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION_LOGO,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    inLanguage: "en-MY",
    articleSection: post.category,
  };

  // Avoid leaving the unused router warning while still keeping the import
  // available if future logic needs it (e.g. preview mode badge).
  void router;

  return (
    <Layout header={2} footer={5}>
      <Seo
        title={post.title}
        description={post.description}
        pathname={pathname}
        image={cover}
        imageAlt={`${post.title} – Cressoft Blog`}
        type="article"
        keywords={post.tags}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url },
        ]}
        jsonLd={articleJsonLd}
      >
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Seo>

      <BlogSingleBanner
        title={post.title}
        category={post.category}
        date={post.date}
        readingMinutes={post.readingMinutes}
      />
      <BlogDetailsMain
        post={post}
        source={source}
        related={related}
        recentPosts={recentPosts}
        prev={prev}
        next={next}
        url={url}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogSinglePageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug ?? "");
  const post = getPostBySlug(slug);
  if (!post) {
    return { notFound: true };
  }

  const source = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
  });

  const allMeta = getAllPostMeta();
  const idx = allMeta.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? allMeta[idx - 1] : null;
  const next = idx >= 0 && idx < allMeta.length - 1 ? allMeta[idx + 1] : null;

  // Strip the heavy `content` field from props.
  const { content: _content, ...meta } = post;

  return {
    props: {
      post: meta,
      source,
      related: getRelatedPosts(slug, 2),
      recentPosts: allMeta.filter((p) => p.slug !== slug).slice(0, 4),
      prev,
      next,
    },
    revalidate: 3600,
  };
};

export default BlogSinglePage;
