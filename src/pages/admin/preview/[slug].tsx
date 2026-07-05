import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import AuthorBox from "@/components/blog/AuthorBox";
import BlogContent from "@/components/blog/BlogContent";
import { getCmsPostBySlugForPreview, type CmsBlogPost } from "@/lib/blog/cms-data";
import { formatBlogDate } from "@/lib/blog/format-date";
import { renderMarkdown } from "@/lib/render-markdown";

type PreviewProps = {
  post: CmsBlogPost;
  html: string;
};

export default function AdminPreviewPage({ post, html }: PreviewProps) {
  const isDraft = post.status === "draft";

  return (
    <>
      <Head>
        <title>Preview · {post.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-preview">
        <div
          className={`admin-preview__bar ${
            isDraft ? "admin-preview__bar--draft" : "admin-preview__bar--live"
          }`}
        >
          Admin preview · {isDraft ? "Draft (not public)" : "Published"}
          <Link href="/admin" className="admin-preview__bar-link">
            Back to admin
          </Link>
        </div>

        <main>
          <article className="admin-preview__head">
            <div className="admin-preview__head-inner">
              <Link href="/admin" className="admin-preview__back">
                <ChevronLeft size={16} aria-hidden />
                Back to admin
              </Link>
              <header className="admin-preview__meta">
                <p className="admin-eyebrow">
                  <time dateTime={post.publishedAt}>
                    {formatBlogDate(post.publishedAt)}
                  </time>
                  <span aria-hidden> · </span>
                  {post.readingMinutes} min read
                </p>
                <h1 className="admin-preview__title">{post.title}</h1>
              </header>
            </div>
          </article>

          {post.featuredImage ? (
            <div className="admin-preview__media-wrap">
              <div className="admin-preview__media">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className={
                    post.imageFit === "contain" ? "object-contain" : "object-cover"
                  }
                  sizes="(max-width: 1024px) 100vw, 56rem"
                  style={{
                    objectFit: post.imageFit === "contain" ? "contain" : "cover",
                  }}
                />
              </div>
            </div>
          ) : null}

          <div className="admin-preview__body">
            <AuthorBox
              author={post.author}
              publishedAt={post.publishedAt}
              readingMinutes={post.readingMinutes}
            />
            <div className="admin-preview__content">
              <BlogContent html={html} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Auth is enforced by middleware.ts before this runs.
export const getServerSideProps: GetServerSideProps<PreviewProps> = async (
  context,
) => {
  const slug = String(context.params?.slug ?? "");
  const post = await getCmsPostBySlugForPreview(slug);
  if (!post) return { notFound: true };
  const html = await renderMarkdown(post.contentMarkdown);
  // The CMS view model leaves optional fields (metaTitle, category, author.role…)
  // as `undefined`, which getServerSideProps cannot serialize. Round-trip drops
  // those keys so the props are clean JSON.
  const safePost = JSON.parse(JSON.stringify(post)) as CmsBlogPost;
  return { props: { post: safePost, html } };
};