import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import Layout from "@/components/layout/Layout";
import BlogSingleBanner from "@/components/layout/banner/BlogSingleBanner";
import BlogDetailsMain from "@/components/containers/blog/BlogDetailsMain";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAllPostMeta,
} from "@/lib/blog";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

type BlogSinglePageProps = {
  post: Omit<BlogPost, "content">;
  source: MDXRemoteSerializeResult;
  related: BlogPostMeta[];
  recentPosts: BlogPostMeta[];
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cressoft.com";

const BlogSinglePage = ({
  post,
  source,
  related,
  recentPosts,
  prev,
  next,
}: BlogSinglePageProps) => {
  const router = useRouter();
  const url = `${SITE_URL}${router.asPath.split("?")[0]}`;
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
      name: "Cressoft",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
  };

  return (
    <Layout header={2} footer={5} video={0}>
      <Head>
        <title>{`${post.title} — Cressoft Blog`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={cover} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={cover} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </Head>

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
  };
};

export default BlogSinglePage;
