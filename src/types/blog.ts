export type BlogPostMeta = {
  /** URL slug derived from filename (no extension). */
  slug: string;
  title: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  author: string;
  category: string;
  tags: string[];
  /** Public-relative cover image path, e.g. /images/news/eight.webp. */
  cover: string;
  /** Estimated reading time in minutes (rounded up). */
  readingMinutes: number;
  /** Whether this post should be highlighted as the lead article. */
  featured?: boolean;
  /** When true, the default cover hero banner is omitted (custom in-article layout). */
  hideBlogBanner?: boolean;
};

export type BlogPost = BlogPostMeta & {
  /** Raw MDX source (frontmatter stripped). */
  content: string;
};
