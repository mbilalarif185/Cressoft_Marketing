import type { BlogPostRecord, BlogPostStatus } from "@/lib/blog/types";

export type PostInput = Partial<BlogPostRecord> & {
  title?: string;
  excerpt?: string;
  contentMarkdown?: string;
  publishedAt?: string;
  featuredImage?: string;
  authorName?: string;
  status?: BlogPostStatus;
};

export type ValidationResult =
  | { ok: true; data: PostInput }
  | { ok: false; errors: Record<string, string> };

/**
 * Coerce an arbitrary `faqs` value (from a CMS request body) into a clean array
 * of question/answer pairs, dropping any pair missing a question or answer.
 * Returns `undefined` when there is no usable FAQ content so the stored record
 * omits the field and the frontend never emits an empty FAQPage schema.
 */
export function sanitizeFaqs(
  value: unknown,
): { question: string; answer: string }[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const faqs = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const q = String((item as Record<string, unknown>).question ?? "").trim();
      const a = String((item as Record<string, unknown>).answer ?? "").trim();
      return q && a ? { question: q, answer: a } : null;
    })
    .filter((f): f is { question: string; answer: string } => f !== null);
  return faqs.length > 0 ? faqs : undefined;
}

export function validatePostInput(
  input: PostInput,
  isCreate: boolean,
): ValidationResult {
  const errors: Record<string, string> = {};

  const title = typeof input.title === "string" ? input.title.trim() : "";
  const excerpt = typeof input.excerpt === "string" ? input.excerpt.trim() : "";
  const contentMarkdown =
    typeof input.contentMarkdown === "string" ? input.contentMarkdown.trim() : "";
  const featuredImage =
    typeof input.featuredImage === "string" ? input.featuredImage.trim() : "";
  const authorName =
    typeof input.authorName === "string" ? input.authorName.trim() : "";
  const publishedAt =
    typeof input.publishedAt === "string" ? input.publishedAt.trim() : "";
  const status =
    input.status === "draft" || input.status === "published"
      ? input.status
      : undefined;

  if (!title) errors.title = "Title is required.";
  if (!excerpt) errors.excerpt = "Description / excerpt is required.";
  if (!contentMarkdown) errors.contentMarkdown = "Content is required.";
  if (!featuredImage) errors.featuredImage = "Featured image is required.";
  if (!authorName) errors.authorName = "Author name is required.";
  if (!publishedAt) errors.publishedAt = "Publish date is required.";
  else if (Number.isNaN(new Date(publishedAt).getTime())) {
    errors.publishedAt = "Publish date must be a valid date.";
  }

  if (!status) errors.status = "Status must be draft or published.";

  if (isCreate && typeof input.slug === "string" && !input.slug.trim()) {
    errors.slug = "Slug cannot be empty.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: input };
}