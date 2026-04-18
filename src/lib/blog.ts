import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

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
    author: String(data.author ?? "Cressoft Editorial"),
    category: String(data.category ?? "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "/images/news/poster.png"),
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    featured: Boolean(data.featured),
    content,
  };
};

/** All posts, newest first. Server-only — relies on `fs`. */
export function getAllPosts(): BlogPost[] {
  ensureDir();
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/i.test(f));

  return files
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Lightweight metadata only (no MDX body) — safe to ship to the client. */
export function getAllPostMeta(): BlogPostMeta[] {
  return getAllPosts().map((post) => {
    // Strip the heavy `content` field before sending to the client.
    const { content: _content, ...meta } = post;
    return meta;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/i.test(f));
  const match = files.find((f) => slugFromFilename(f) === slug);
  return match ? readPostFile(match) : null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  getAllPosts().forEach((p) => set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Related posts: same category first, then shared tags. Excludes the post
 * itself. Capped to `limit` items.
 */
export function getRelatedPosts(slug: string, limit = 2): BlogPostMeta[] {
  const all = getAllPostMeta();
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
