import type { CmsAuthor, CmsBlogPost } from "@/lib/blog/cms-data";
import type { BlogPostRecord } from "@/lib/blog/types";

function readingMinutesFromMarkdown(
  body: string,
  fallback: number | undefined,
): number {
  if (typeof fallback === "number" && fallback > 0) return Math.round(fallback);
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function recordToCmsPost(record: BlogPostRecord): CmsBlogPost {
  const author: CmsAuthor = {
    name: record.authorName,
    role: record.authorRole,
    avatarSrc: record.authorAvatar,
  };

  return {
    slug: record.slug,
    title: record.title,
    metaTitle: record.metaTitle,
    excerpt: record.excerpt,
    author,
    publishedAt: record.publishedAt,
    featuredImage: record.featuredImage,
    imageFit: record.imageFit,
    readingMinutes: readingMinutesFromMarkdown(
      record.contentMarkdown,
      record.readingMinutes,
    ),
    tags: record.tags ?? [],
    seoKeywords: record.seoKeywords ?? [],
    contentMarkdown: record.contentMarkdown,
    metaDescription: record.metaDescription,
    ogImage: record.ogImage ?? record.featuredImage,
    category: record.category,
    status: record.status,
  };
}