import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostMeta } from "@/types/blog";
import type { BlogPostRecord } from "@/lib/blog/types";
import { loadAllRecords } from "@/lib/blog/storage";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const ensureDir = () => {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
};

const slugFromFilename = (filename: string) =>
  filename
    .replace(/\.mdx?$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .toLowerCase();

const readPostFile = (filename: string): BlogPost => {
  const fullPath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug: slugFromFilename(filename),
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    author: String(data.author ?? "Quantel Editorial"),
    category: String(data.category ?? "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "/images/news/poster.webp"),
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    featured: Boolean(data.featured),
    hideBlogBanner: Boolean(data.hideBlogBanner),
    content,
  };
};

/**
 * Map a PUBLISHED CMS record onto the file-based BlogPost shape so both
 * sources render through the same components + MDX pipeline.
 *
 * Uses `loadAllRecords()` from the storage layer, which reads from the local
 * `data/blog/posts.json` in disk mode and from Vercel Blob when
 * `BLOB_READ_WRITE_TOKEN` is set (so posts published on serverless persist and
 * appear here). This is why the public read API below is async.
 */
const recordToFilePost = (r: BlogPostRecord): BlogPost => {
  const minutes =
    typeof r.readingMinutes === "number" && r.readingMinutes > 0
      ? r.readingMinutes
      : Math.max(1, Math.ceil(readingTime(r.contentMarkdown).minutes));
  return {
    slug: r.slug,
    title: r.title,
    description: r.metaDescription || r.excerpt,
    date: (r.publishedAt || "").slice(0, 10) || new Date().toISOString().slice(0, 10),
    author: r.authorName,
    category: r.category || "General",
    tags: Array.isArray(r.tags) ? r.tags : [],
    cover: r.featuredImage || "/images/news/poster.webp",
    readingMinutes: minutes,
    featured: false,
    hideBlogBanner: false,
    content: r.contentMarkdown,
  };
};

const getCmsPublishedPosts = async (): Promise<BlogPost[]> => {
  try {
    const records = await loadAllRecords();
    return records
      .filter((p) => p && p.status === "published")
      .map(recordToFilePost);
  } catch {
    return [];
  }
};

/** All posts (MDX files + published CMS records), newest first. Server-only. */
export async function getAllPosts(): Promise<BlogPost[]> {
  ensureDir();
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/i.test(f));

  const filePosts = files.map(readPostFile);
  const fileSlugs = new Set(filePosts.map((p) => p.slug));
  // File-based posts win on a slug clash so an existing MDX article is never
  // shadowed by the CMS.
  const cmsPosts = (await getCmsPublishedPosts()).filter(
    (p) => !fileSlugs.has(p.slug),
  );

  return [...filePosts, ...cmsPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Lightweight metadata only (no MDX body) — safe to ship to the client. */
export async function getAllPostMeta(): Promise<BlogPostMeta[]> {
  return (await getAllPosts()).map((post) => {
    // Strip the heavy `content` field before sending to the client.
    const { content: _content, ...meta } = post;
    return meta;
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/i.test(f));
  const match = files.find((f) => slugFromFilename(f) === slug);
  if (match) return readPostFile(match);
  // Fall back to a published CMS post with this slug.
  return (await getCmsPublishedPosts()).find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getAllCategories(): Promise<string[]> {
  const set = new Set<string>();
  (await getAllPosts()).forEach((p) => set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function getAllTags(): Promise<string[]> {
  const set = new Set<string>();
  (await getAllPosts()).forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Related posts: same category first, then shared tags. Excludes the post
 * itself. Capped to `limit` items.
 */
export async function getRelatedPosts(
  slug: string,
  limit = 2,
): Promise<BlogPostMeta[]> {
  const all = await getAllPostMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const score = (p: BlogPostMeta): number => {
    if (p.slug === current.slug) return -1;
    let s = 0;
    if (p.category === current.category) s += 5;
    s += p.tags.filter((t) => current.tags.includes(t)).length;
    return s;
  };

  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ post: p, s: score(p) }))
    .sort((a, b) => b.s - a.s || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.post);
}
