/** A single question/answer pair used to build FAQPage structured data. */
export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPostMeta = {
  /** URL slug derived from filename (no extension). */
  slug: string;
  title: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  author: string;
  /**
   * Optional author avatar (absolute URL or public-relative path). When absent
   * the author bio falls back to an initials badge.
   */
  authorAvatar?: string;
  category: string;
  tags: string[];
  /** Public-relative cover image path, e.g. /images/news/eight.webp. */
  cover: string;
  /** Alt text for the cover image (SEO/accessibility). Falls back to the title when unset. */
  coverAlt?: string;
  /** Estimated reading time in minutes (rounded up). */
  readingMinutes: number;
  /** Whether this post should be highlighted as the lead article. */
  featured?: boolean;
  /** When true, the default cover hero banner is omitted (custom in-article layout). */
  hideBlogBanner?: boolean;
  /**
   * When true, the post is hidden from search: the template emits
   * `noindex, nofollow` robots meta and the post is excluded from the sitemap.
   * Sourced from the CMS record (`BlogPostRecord.noindex`) or MDX frontmatter.
   */
  noindex?: boolean;
  /**
   * Optional FAQ content. When present (and non-empty) the blog template emits
   * FAQPage JSON-LD alongside the BlogPosting schema.
   *
   * NOTE FOR CMS TEAM: this is currently only populated from MDX frontmatter
   * (`faqs:` in the file's front matter). The admin CMS record shape has a
   * matching optional field (`BlogPostRecord.faqs`) — wire the CMS editor UI to
   * populate it so published posts can surface FAQ rich results too.
   */
  faqs?: BlogFaq[];
};

export type BlogPost = BlogPostMeta & {
  /** Raw MDX source (frontmatter stripped). */
  content: string;
};
