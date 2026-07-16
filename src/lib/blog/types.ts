export type BlogPostStatus = "draft" | "published";

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  publishedAt: string;
  featuredImage: string;
  ogImage?: string;
  imageFit?: "cover" | "contain";
  readingMinutes?: number;
  tags: string[];
  category?: string;
  seoKeywords: string[];
  /**
   * When true, the published post is hidden from search engines: the frontend
   * emits `noindex, nofollow` robots meta and the post is excluded from the
   * sitemap. The post stays live on the site. Defaults to false (omitted).
   */
  noindex?: boolean;
  /**
   * Optional FAQ pairs. Populated from the CMS editor's "SEO Settings" FAQ
   * builder (or MDX frontmatter). When present, published posts emit FAQPage
   * structured data alongside the BlogPosting schema.
   */
  faqs?: { question: string; answer: string }[];
  contentMarkdown: string;
  status: BlogPostStatus;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostsFile = {
  version: 1;
  /** Set on every save; used to pick the newest copy when Blob CDN and disk disagree. */
  savedAt?: string;
  posts: BlogPostRecord[];
};