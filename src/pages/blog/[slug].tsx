import React from "react";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
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
import {
  markdownToContentTree,
  type BlogContentTree,
} from "@/lib/blog/markdown-tree";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

import { SITE_URL, ORGANIZATION_LOGO, SITE_NAME } from "@/lib/seo";

type BlogSinglePageProps = {
  post: Omit<BlogPost, "content">;
  /**
   * The post body as a prebuilt hast tree. Deliberately not a compiled-MDX
   * string — see the header comment in `lib/blog/markdown-tree.ts` for why
   * client-side MDX evaluation is incompatible with our CSP.
   */
  content: BlogContentTree;
  related: BlogPostMeta[];
  recentPosts: BlogPostMeta[];
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
};

const BlogSinglePage = ({
  post,
  content,
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
    inLanguage: "en-GB",
    articleSection: post.category,
  };

  // Only emit FAQPage structured data when the post actually carries FAQ
  // content — Google flags empty/irrelevant FAQPage markup as a rich-result
  // violation, so posts without `faqs` must not render it.
  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const jsonLd = faqJsonLd ? [articleJsonLd, faqJsonLd] : articleJsonLd;

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
        imageAlt={post.coverAlt || `${post.title} – Quantel Solutions Blog`}
        type="article"
        keywords={post.tags}
        noindex={post.noindex}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url },
        ]}
        jsonLd={jsonLd}
      >
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Seo>

      {!post.hideBlogBanner ? (
        <BlogSingleBanner
          title={post.title}
          description={post.description}
          category={post.category}
          author={post.author}
          date={post.date}
          readingMinutes={post.readingMinutes}
        />
      ) : null}
      <BlogDetailsMain
        post={post}
        content={content}
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
    paths: (await getAllSlugs()).map((slug) => ({ params: { slug } })),
    // "blocking" so posts published via the admin CMS after build render on
    // first request (then get cached via ISR). Existing MDX slugs are
    // prebuilt as before; unknown slugs still 404 via getStaticProps.
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogSinglePageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug ?? "");
  const post = await getPostBySlug(slug);
  if (!post) {
    // MUST carry `revalidate` — a notFound response without it is cached
    // permanently by Vercel. One transient Blob read failure (or a visit
    // before publish completes) would otherwise poison this slug to 404
    // until the next deploy.
    return { notFound: true, revalidate: 60 };
  }

  // Markdown → hast at build time. The client only walks the finished tree, so
  // nothing has to be `eval`'d in the browser (which our CSP forbids).
  const content = await markdownToContentTree(post.content);

  const allMeta = await getAllPostMeta();
  const idx = allMeta.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? allMeta[idx - 1] : null;
  const next = idx >= 0 && idx < allMeta.length - 1 ? allMeta[idx + 1] : null;

  // Strip the heavy `content` field from props.
  const { content: _content, ...meta } = post;

  return {
    props: {
      post: meta,
      content,
      related: await getRelatedPosts(slug, 2),
      recentPosts: allMeta.filter((p) => p.slug !== slug).slice(0, 4),
      prev,
      next,
    },
    // Short ISR window so a freshly published CMS article goes live quickly
    // even if the on-demand revalidation after publish doesn't propagate.
    revalidate: 60,
  };
};

export default BlogSinglePage;
