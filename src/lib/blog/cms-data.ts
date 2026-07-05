// `server-only` intentionally omitted — see the note in lib/blog/storage.ts.
import { getRecordBySlug } from "@/lib/blog/storage";
import { recordToCmsPost } from "@/lib/blog/to-blog-post";

/**
 * CMS read layer over the JSON store. Named `cms-*` so it never collides with
 * the project's existing file-based public read layer in `src/lib/blog.ts`.
 * Used by the admin preview page (which must render ANY status, drafts
 * included). The public `/blog` integration lives in `src/lib/blog.ts`.
 */

export type CmsAuthor = {
  name: string;
  role?: string;
  avatarSrc?: string;
};

export type CmsBlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  author: CmsAuthor;
  publishedAt: string;
  featuredImage: string;
  ogImage?: string;
  imageFit?: "cover" | "contain";
  readingMinutes: number;
  tags: string[];
  category?: string;
  seoKeywords: string[];
  contentMarkdown: string;
  status?: "draft" | "published";
};

/** Preview loads ANY status (drafts included). */
export async function getCmsPostBySlugForPreview(
  slug: string,
): Promise<CmsBlogPost | undefined> {
  const record = await getRecordBySlug(slug);
  return record ? recordToCmsPost(record) : undefined;
}