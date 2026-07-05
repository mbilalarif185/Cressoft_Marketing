import type { NextApiRequest, NextApiResponse } from "next";

import { requireAdminApi } from "@/lib/admin/auth";
import { revalidateBlogPaths } from "@/lib/blog/revalidate-public";
import { ensureUniqueSlug } from "@/lib/blog/slug";
import { loadAllRecords, saveAllRecords } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";
import { validatePostInput } from "@/lib/blog/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(await requireAdminApi(req, res))) return;

  const id = String(req.query.id ?? "");

  if (req.method === "GET") {
    const posts = await loadAllRecords();
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ ok: false, message: "Not found." });
    return res.status(200).json({ ok: true, post });
  }

  if (req.method === "PUT") {
    const body = (req.body ?? {}) as Record<string, unknown>;

    const validation = validatePostInput(body, false);
    if (!validation.ok) {
      return res.status(400).json({ ok: false, errors: validation.errors });
    }

    const posts = await loadAllRecords();
    const index = posts.findIndex((p) => p.id === id);
    if (index < 0) return res.status(404).json({ ok: false, message: "Not found." });

    const existing = posts[index];
    const input = validation.data;
    const otherSlugs = posts.filter((p) => p.id !== id).map((p) => p.slug);
    const slug =
      typeof input.slug === "string" && input.slug.trim()
        ? ensureUniqueSlug(input.slug.trim(), otherSlugs, existing.slug)
        : ensureUniqueSlug(input.title ?? existing.title, otherSlugs, existing.slug);

    const updated: BlogPostRecord = {
      ...existing,
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
      contentMarkdown: input.contentMarkdown!,
      status: input.status!,
      updatedAt: new Date().toISOString(),
    };

    const next = [...posts];
    next[index] = updated;
    try {
      await saveAllRecords(next);
      await revalidateBlogPaths(res, updated.slug);
      if (existing.slug !== updated.slug) await revalidateBlogPaths(res, existing.slug);
      return res.status(200).json({ ok: true, post: updated });
    } catch (err) {
      console.error("[admin/posts PUT]", err);
      const message =
        err instanceof Error ? err.message : "Could not save post. Check server logs.";
      return res.status(500).json({ ok: false, message });
    }
  }

  if (req.method === "DELETE") {
    const posts = await loadAllRecords();
    const removed = posts.find((p) => p.id === id);
    if (!removed) return res.status(404).json({ ok: false, message: "Not found." });
    try {
      await saveAllRecords(posts.filter((p) => p.id !== id));
      await revalidateBlogPaths(res, removed.slug);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("[admin/posts DELETE]", err);
      const message =
        err instanceof Error ? err.message : "Could not delete post. Check server logs.";
      return res.status(500).json({ ok: false, message });
    }
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ ok: false, message: "Method not allowed." });
}