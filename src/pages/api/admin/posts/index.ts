import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { requireAdminApi } from "@/lib/admin/auth";
import { revalidateBlogPaths } from "@/lib/blog/revalidate-public";
import { ensureUniqueSlug } from "@/lib/blog/slug";
import { loadAllRecords, saveAllRecords } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";
import { sanitizeFaqs, validatePostInput } from "@/lib/blog/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(await requireAdminApi(req, res))) return;

  if (req.method === "GET") {
    const posts = await loadAllRecords();
    return res.status(200).json({ ok: true, posts });
  }

  if (req.method === "POST") {
    const body = (req.body ?? {}) as Record<string, unknown>;

    const validation = validatePostInput(body, true);
    if (!validation.ok) {
      return res.status(400).json({ ok: false, errors: validation.errors });
    }

    const input = validation.data;
    const posts = await loadAllRecords();
    const slugs = posts.map((p) => p.slug);
    const slug =
      typeof input.slug === "string" && input.slug.trim()
        ? ensureUniqueSlug(input.slug.trim(), slugs)
        : ensureUniqueSlug(input.title ?? "", slugs);

    const now = new Date().toISOString();
    const record: BlogPostRecord = {
      id: randomUUID(),
      slug,
      title: input.title!.trim(),
      metaTitle:
        typeof input.metaTitle === "string" ? input.metaTitle.trim() : undefined,
      metaDescription:
        typeof input.metaDescription === "string"
          ? input.metaDescription.trim()
          : undefined,
      excerpt: input.excerpt!.trim(),
      authorName: input.authorName!.trim(),
      authorRole:
        typeof input.authorRole === "string" ? input.authorRole.trim() : undefined,
      authorAvatar:
        typeof input.authorAvatar === "string"
          ? input.authorAvatar.trim()
          : undefined,
      publishedAt: input.publishedAt!,
      featuredImage: input.featuredImage!.trim(),
      ogImage: typeof input.ogImage === "string" ? input.ogImage.trim() : undefined,
      imageFit: input.imageFit === "contain" ? "contain" : "cover",
      readingMinutes:
        typeof input.readingMinutes === "number"
          ? Math.round(input.readingMinutes)
          : undefined,
      tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
      category:
        typeof input.category === "string" ? input.category.trim() : undefined,
      seoKeywords: Array.isArray(input.seoKeywords)
        ? input.seoKeywords.map(String)
        : [],
      // Only store when true so the record stays clean (default is indexable).
      noindex: input.noindex === true ? true : undefined,
      // Drop empty/partial pairs; undefined when there are none.
      faqs: sanitizeFaqs(input.faqs),
      contentMarkdown: input.contentMarkdown!,
      status: input.status!,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await saveAllRecords([record, ...posts]);
      if (record.status === "published") {
        await revalidateBlogPaths(res, record.slug);
      }
      return res.status(200).json({ ok: true, post: record });
    } catch (err) {
      console.error("[admin/posts POST]", err);
      const message =
        err instanceof Error ? err.message : "Could not save post. Check server logs.";
      return res.status(500).json({ ok: false, message });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ ok: false, message: "Method not allowed." });
}