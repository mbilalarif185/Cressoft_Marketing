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