import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import { normalizeMarkdownExternalLinks } from "@/lib/blog/normalize-markdown-links";
import { slugifyTitle } from "@/lib/blog/slug";
import type { BlogPostRecord, BlogPostStatus } from "@/lib/blog/types";

type PostFormProps = {
  mode: "create" | "edit";
  initial?: BlogPostRecord;
};

type FaqDraft = { question: string; answer: string };

type FormState = {
  title: string;
  slug: string;
  slugTouched: boolean;
  excerpt: string;
  contentMarkdown: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  featuredImage: string;
  featuredImageAlt: string;
  ogImage: string;
  imageFit: "cover" | "contain";
  metaTitle: string;
  metaDescription: string;
  category: string;
  tags: string;
  seoKeywords: string;
  status: BlogPostStatus;
  noindex: boolean;
  faqs: FaqDraft[];
};

function toFormState(initial?: BlogPostRecord): FormState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    slugTouched: Boolean(initial?.slug),
    excerpt: initial?.excerpt ?? "",
    contentMarkdown: initial?.contentMarkdown ?? "",
    authorName: initial?.authorName ?? "Quantel Editorial",
    authorRole: initial?.authorRole ?? "Quantel Solutions",
    authorAvatar: initial?.authorAvatar ?? "",
    publishedAt: initial?.publishedAt?.slice(0, 10) ?? today,
    featuredImage: initial?.featuredImage ?? "",
    featuredImageAlt: initial?.featuredImageAlt ?? "",
    ogImage: initial?.ogImage ?? "",
    imageFit: initial?.imageFit ?? "cover",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
    category: initial?.category ?? "",
    tags: (initial?.tags ?? []).join(", "),
    seoKeywords: (initial?.seoKeywords ?? []).join(", "),
    status: initial?.status ?? "draft",
    noindex: initial?.noindex ?? false,
    // Clone so edits never mutate the server record passed in as a prop.
    faqs: (initial?.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  };
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function PostForm({ mode, initial }: PostFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(initial));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const autoSlug = useMemo(() => slugifyTitle(form.title), [form.title]);

  const update = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "title" && !prev.slugTouched) {
          next.slug = slugifyTitle(String(value));
        }
        if (key === "slug") next.slugTouched = true;
        return next;
      });
    },
    [],
  );

  const addFaq = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }, []);

  const updateFaq = useCallback(
    (index: number, field: keyof FaqDraft, value: string) => {
      setForm((prev) => {
        const faqs = prev.faqs.map((faq, i) =>
          i === index ? { ...faq, [field]: value } : faq,
        );
        return { ...prev, faqs };
      });
    },
    [],
  );

  const removeFaq = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  }, []);

  async function uploadImage(file: File, target: "featuredImage" | "ogImage") {
    setUploading(true);
    setMessage(null);
    // Pages Router upload route reads the raw body (no multipart), so we send
    // the File directly with its content type.
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    setUploading(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setMessage(data.message ?? "Upload failed.");
      return;
    }
    update(target, data.url);
    if (target === "featuredImage" && !form.ogImage) update("ogImage", data.url);
  }

  function buildPayload(status: BlogPostStatus) {
    return {
      title: form.title,
      slug: form.slug || autoSlug,
      excerpt: form.excerpt,
      contentMarkdown: normalizeMarkdownExternalLinks(form.contentMarkdown),
      authorName: form.authorName,
      authorRole: form.authorRole || undefined,
      authorAvatar: form.authorAvatar || undefined,
      publishedAt: form.publishedAt,
      featuredImage: form.featuredImage,
      featuredImageAlt: form.featuredImageAlt || undefined,
      ogImage: form.ogImage || undefined,
      imageFit: form.imageFit,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      category: form.category || undefined,
      tags: splitList(form.tags),
      seoKeywords: splitList(form.seoKeywords),
      noindex: form.noindex,
      // Server sanitizes further; trim + drop pairs missing a question or answer.
      faqs: form.faqs
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
        .filter((f) => f.question && f.answer),
      status,
    };
  }

  async function save(status: BlogPostStatus) {
    setSaving(true);
    setErrors({});
    setMessage(null);
    const payload = buildPayload(status);
    const url =
      mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${initial!.id}`;
    const method = mode === "create" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let data: { ok?: boolean; errors?: Record<string, string>; message?: string } = {};
    try {
      const text = await res.text();
      if (text) data = JSON.parse(text) as typeof data;
    } catch {
      data = {};
    }
    setSaving(false);
    if (!res.ok) {
      if (data.errors) setErrors(data.errors);
      else setMessage(data.message ?? "Could not save post.");
      return;
    }
    router.push("/admin");
  }

  const previewSlug = form.slug || autoSlug;

  return (
    <AdminShell title={mode === "create" ? "New post" : "Edit post"}>
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          save(form.status);
        }}
      >
        {message ? <p className="admin-alert admin-alert--error">{message}</p> : null}

        <section className="admin-card admin-grid">
          <Field label="Title *" error={errors.title}>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </Field>
          <Field
            label="URL slug"
            hint="Auto-generated from the title unless you edit it."
            error={errors.slug}
          >
            <div className="admin-slug">
              <span className="admin-slug__prefix">/blog/</span>
              <input
                className="admin-input"
                value={form.slug}
                onChange={(e) =>
                  update("slug", slugifyTitle(e.target.value) || e.target.value)
                }
              />
            </div>
          </Field>
          <Field label="Description / excerpt *" error={errors.excerpt}>
            <textarea
              className="admin-input admin-input--area"
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              required
            />
          </Field>
          <Field label="Category">
            <input
              className="admin-input"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="e.g. Guides, Engineering"
            />
          </Field>
          <Field label="Author name *" error={errors.authorName}>
            <input
              className="admin-input"
              value={form.authorName}
              onChange={(e) => update("authorName", e.target.value)}
              required
            />
          </Field>
          <Field label="Author role">
            <input
              className="admin-input"
              value={form.authorRole}
              onChange={(e) => update("authorRole", e.target.value)}
            />
          </Field>
          <Field label="Publish date *" error={errors.publishedAt}>
            <input
              type="date"
              className="admin-input"
              value={form.publishedAt}
              onChange={(e) => update("publishedAt", e.target.value)}
              required
            />
          </Field>
          <Field label="Status *" error={errors.status}>
            <select
              className="admin-input"
              value={form.status}
              onChange={(e) => update("status", e.target.value as BlogPostStatus)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              className="admin-input"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
            />
          </Field>
          <Field label="SEO keywords (comma-separated)">
            <input
              className="admin-input"
              value={form.seoKeywords}
              onChange={(e) => update("seoKeywords", e.target.value)}
            />
          </Field>
        </section>

        <section className="admin-card">
          <h2 className="admin-card__title">SEO</h2>
          <div className="admin-grid">
            <Field label="Meta title">
              <input
                className="admin-input"
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
              />
            </Field>
            <Field label="Meta description">
              <textarea
                className="admin-input admin-input--area"
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="admin-card">
          <h2 className="admin-card__title">Images</h2>
          <div className="admin-grid">
            <Field label="Featured image *" error={errors.featuredImage}>
              <input
                className="admin-input"
                value={form.featuredImage}
                onChange={(e) => update("featuredImage", e.target.value)}
                placeholder="/images/... or uploaded URL"
              />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="admin-file"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, "featuredImage");
                }}
              />
            </Field>
            <Field
              label="Featured image alt text"
              hint="Describe the image for screen readers and SEO (used for the social share image). Defaults to the post title if left blank."
            >
              <input
                className="admin-input"
                value={form.featuredImageAlt}
                onChange={(e) => update("featuredImageAlt", e.target.value)}
                placeholder="e.g. Developer reviewing code on a dual-monitor setup"
              />
            </Field>
            <Field label="OG image (social share)">
              <input
                className="admin-input"
                value={form.ogImage}
                onChange={(e) => update("ogImage", e.target.value)}
              />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="admin-file"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, "ogImage");
                }}
              />
            </Field>
            <Field label="Image fit">
              <select
                className="admin-input"
                value={form.imageFit}
                onChange={(e) =>
                  update("imageFit", e.target.value as "cover" | "contain")
                }
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
              </select>
            </Field>
          </div>
          {form.featuredImage ? (
            <div className="admin-imgpreview">
              <Image
                src={form.featuredImage}
                alt={form.featuredImageAlt || "Featured preview"}
                fill
                sizes="(max-width: 640px) 100vw, 36rem"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
        </section>

        <section className="admin-card">
          <h2 className="admin-card__title">Content *</h2>
          {errors.contentMarkdown ? (
            <p className="admin-field__error">{errors.contentMarkdown}</p>
          ) : null}
          <p className="admin-hint">
            External links need a full URL, e.g.{" "}
            <code>https://quantel.uk</code> — bare domains like{" "}
            <code>quantel.uk</code> are auto-fixed on save.
          </p>
          <MarkdownEditor
            value={form.contentMarkdown}
            onChange={(v) => update("contentMarkdown", v)}
          />
        </section>

        <section className="admin-card">
          <h2 className="admin-card__title">SEO settings</h2>

          <div className="admin-check">
            <input
              id="post-noindex"
              type="checkbox"
              className="admin-check__input"
              checked={form.noindex}
              onChange={(e) => update("noindex", e.target.checked)}
            />
            <label htmlFor="post-noindex" className="admin-check__body">
              <span className="admin-check__label">
                Hide from Google (noindex)
              </span>
              <span className="admin-check__hint">
                Turn ON to stop Google indexing this post. Use for outdated or
                off-topic content. The post stays live on your site — just
                hidden from search.
              </span>
            </label>
          </div>

          <div className="admin-faq">
            <div className="admin-faq__head">
              <span className="admin-field__label">FAQ section</span>
              <span className="admin-field__hint">
                Adding FAQs here creates a special Google rich snippet that
                shows your Q&amp;A directly in search results — above normal
                results. Very high impact.
              </span>
            </div>

            {form.faqs.map((faq, i) => (
              <div className="admin-faq__item" key={i}>
                <div className="admin-faq__fields">
                  <input
                    className="admin-input"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    placeholder="e.g. How much does it cost?"
                    aria-label={`FAQ ${i + 1} question`}
                  />
                  <textarea
                    className="admin-input admin-input--area"
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Write a clear, helpful answer"
                    aria-label={`FAQ ${i + 1} answer`}
                  />
                </div>
                <button
                  type="button"
                  className="admin-faq__remove"
                  onClick={() => removeFaq(i)}
                  aria-label={`Remove FAQ ${i + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-faq__add"
              onClick={addFaq}
            >
              {form.faqs.length === 0 ? "Add FAQ" : "Add another FAQ"}
            </button>
          </div>
        </section>

        <div className="admin-actions">
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="admin-btn admin-btn--ghost"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save("published")}
            className="admin-btn admin-btn--primary"
          >
            {saving ? "Saving…" : "Publish"}
          </button>
          {previewSlug ? (
            <Link
              href={`/admin/preview/${previewSlug}`}
              className="admin-btn admin-btn--ghost"
            >
              Preview
            </Link>
          ) : null}
          <Link href="/admin" className="admin-link admin-actions__cancel">
            Cancel
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="admin-field">
      <span className="admin-field__label">{label}</span>
      {hint ? <span className="admin-field__hint">{hint}</span> : null}
      {children}
      {error ? <span className="admin-field__error">{error}</span> : null}
    </label>
  );
}