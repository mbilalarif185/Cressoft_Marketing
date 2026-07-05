# Blog Admin CMS — Full Implementation Guide

A self-hosted, database-free blog CMS for **Next.js (App Router)**. Posts are stored in a
single JSON file (optionally mirrored to Vercel Blob). Auth is a single password + signed
JWT cookie. Markdown editing via `@uiw/react-md-editor`, rendering via `remark`.

Copy the files below into the same paths in your target project, install the dependencies,
set the env vars, and it works identically.

---

## Table of contents

1. [Architecture at a glance](#1-architecture-at-a-glance)
2. [Dependencies](#2-dependencies)
3. [Environment variables](#3-environment-variables)
4. [File map](#4-file-map)
5. [Auth layer](#5-auth-layer)
6. [Storage layer](#6-storage-layer)
7. [Types, validation, slug, links, dates](#7-types-validation-slug-links-dates)
8. [API routes](#8-api-routes)
9. [Admin UI (pages)](#9-admin-ui-pages)
10. [Admin UI (components)](#10-admin-ui-components)
11. [Public blog read layer + rendering](#11-public-blog-read-layer--rendering)
12. [Data file seed](#12-data-file-seed)
13. [Setup checklist](#13-setup-checklist)
14. [How it all flows](#14-how-it-all-flows)

---

## 1. Architecture at a glance

- **No database.** All posts live in `data/blog/posts.json`. On serverless (Vercel) the file
  is mirrored to Vercel Blob; disk is a best-effort cache and the newer copy (by `savedAt`
  timestamp) wins on read.
- **Auth = one password.** `ADMIN_PASSWORD` is compared on login; success mints a 12-hour
  HS256 JWT stored in an httpOnly cookie (`felinda_admin_session`). Enforced twice: in
  `middleware.ts` (redirect/401) and again in each API route (`requireAdminApi`).
- **Draft vs published** is a single `status` field. The public read layer filters to
  `published`; a preview route can render any status.
- **Publish = save with `status: "published"`.** Not a separate action. After any
  create/edit/delete, affected paths are `revalidatePath()`-ed.

```
/admin                      → dashboard, list of all posts
/admin/login                → sign-in form
/admin/posts/new            → create form
/admin/posts/[id]/edit      → edit form
/admin/preview/[slug]       → renders a post (incl. drafts) in the real layout

/api/admin/login   POST     → set session cookie
/api/admin/logout  POST     → clear cookie
/api/admin/posts   GET/POST → list / create
/api/admin/posts/[id]  GET/PUT/DELETE
/api/admin/upload  POST     → image upload (Blob or local disk)

/blog                       → public list (published only)
/blog/[slug]                → public article (published only)
```

---

## 2. Dependencies

```jsonc
// package.json — dependencies
{
  "@uiw/react-md-editor": "^4.1.1",   // markdown editor
  "@vercel/blob": "^2.4.0",           // optional remote storage + uploads
  "jose": "^6.2.3",                   // JWT sign/verify (edge-safe)
  "lucide-react": "^1.8.0",           // icons (ChevronLeft in preview)
  "next": "^16.2.4",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "remark": "^15.0.1",                // markdown → HTML
  "remark-gfm": "^4.0.1",
  "remark-html": "^16.0.1",
  "server-only": "^0.0.1"
}
```

Install:

```bash
npm i @uiw/react-md-editor @vercel/blob jose lucide-react remark remark-gfm remark-html server-only
```

> The `@/...` import alias maps to the project root. Ensure `tsconfig.json` has:
> ```jsonc
> { "compilerOptions": { "paths": { "@/*": ["./*"] } } }
> ```

---

## 3. Environment variables

```bash
# Blog admin (required for /admin)
ADMIN_PASSWORD=change-me-to-a-strong-password        # min 8 chars
ADMIN_SESSION_SECRET=change-me-to-a-long-random-string-min-16-chars

# Optional: Vercel Blob for blog JSON + image uploads on serverless (Vercel).
# Without this, posts are stored in data/blog/posts.json and uploads in
# public/images/blog-uploads/
BLOB_READ_WRITE_TOKEN=
```

- Local dev without Blob works fine — posts write to `data/blog/posts.json`, uploads to
  `public/images/blog-uploads/`.
- On Vercel, the filesystem is ephemeral, so set `BLOB_READ_WRITE_TOKEN` (from the Vercel
  Blob store) or your posts won't persist between deploys/instances.

---

## 4. File map

```
middleware.ts                                  # route guard
lib/admin/auth.ts                              # server-side auth gate for API
lib/admin/session.ts                           # JWT cookie create/verify/destroy
lib/blog/types.ts                              # BlogPostRecord + file shape
lib/blog/storage.ts                            # dual-backend JSON store (disk + Blob)
lib/blog/validation.ts                         # input validation
lib/blog/slug.ts                               # slugify + uniqueness
lib/blog/normalize-markdown-links.ts           # bare-domain → https:// fixer
lib/blog/revalidate-public.ts                  # revalidatePath helper
lib/blog/format-date.ts                        # date formatter
lib/blog/to-blog-post.ts                        # record → view model
lib/blog-data.ts                               # public read layer (published filter)
lib/render-markdown.ts                         # markdown → HTML

app/admin/layout.tsx                           # noindex wrapper
app/admin/page.tsx                             # dashboard
app/admin/login/page.tsx                       # login form
app/admin/posts/new/page.tsx                   # create
app/admin/posts/[id]/edit/page.tsx             # edit
app/admin/preview/[slug]/page.tsx              # preview (drafts visible)

app/api/admin/login/route.ts
app/api/admin/logout/route.ts
app/api/admin/posts/route.ts                   # GET list / POST create
app/api/admin/posts/[id]/route.ts              # GET / PUT / DELETE
app/api/admin/upload/route.ts                  # image upload

components/admin/AdminShell.tsx                # admin chrome + logout
components/admin/PostList.tsx                  # dashboard list + delete
components/admin/PostForm.tsx                  # create/edit form (save draft / publish)
components/admin/MarkdownEditor.tsx            # MD editor wrapper
components/admin/editor-commands.tsx           # custom toolbar

app/blog/page.tsx                              # public list
app/blog/[slug]/page.tsx                       # public article
components/blog/BlogContent.tsx                # renders HTML (bring your own styles)
components/blog/AuthorBox.tsx                  # (bring your own / see notes)

data/blog/posts.json                           # the "database"
```

> **Note on `components/blog/*` and `components/seo/*`, `Header`, `Footer`:** the public
> `/blog` pages reference presentational components (`BlogList`, `BlogCard`, `BlogContent`,
> `AuthorBox`, `RelatedPosts`, `JsonLd`, `Header`, `Footer`) and SEO helpers
> (`buildPageMetadata`, `pageWebSiteJsonLd`, `breadcrumbJsonLd`, `absoluteUrl`) that are
> project-specific styling/SEO. The **admin CMS itself does not depend on them** — only the
> public rendering does. Either port your own versions or strip those imports. The essential,
> reusable core is everything under `lib/`, `app/admin/`, `app/api/admin/`, and
> `components/admin/`.

---

## 5. Auth layer

### `middleware.ts`

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "felinda_admin_session";

function getSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (pathname.startsWith("/api/admin/login")) {
      return NextResponse.next();
    }
    const authed = await hasValidSession(request);
    if (!authed) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
};
```

### `lib/admin/session.ts`

```ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "felinda_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 16 characters).");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}
```

### `lib/admin/auth.ts`

```ts
import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin/session";

export function getAdminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length >= 8 ? password : null;
}

export async function requireAdminApi(): Promise<NextResponse | null> {
  if (!getAdminPassword()) {
    return NextResponse.json(
      { ok: false, message: "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 503 },
    );
  }
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  return null;
}
```

---

## 6. Storage layer

### `lib/blog/storage.ts`

```ts
import "server-only";

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { get, head, put } from "@vercel/blob";

import type { BlogPostRecord, BlogPostsFile } from "@/lib/blog/types";

const DATA_DIR = path.join(process.cwd(), "data", "blog");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");
const BLOB_POSTS_PATH = "blog/posts.json";

function emptyFile(): BlogPostsFile {
  return { version: 1, posts: [] };
}

function normalizeFile(data: unknown): BlogPostsFile {
  if (
    data &&
    typeof data === "object" &&
    "posts" in data &&
    Array.isArray((data as BlogPostsFile).posts)
  ) {
    const raw = data as BlogPostsFile;
    return { version: 1, savedAt: raw.savedAt, posts: raw.posts };
  }
  return emptyFile();
}

function fileTimestamp(file: BlogPostsFile): number {
  const t = file.savedAt ? Date.parse(file.savedAt) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

/** Prefer the copy that was saved most recently (fixes stale Blob CDN vs fresh disk). */
function pickNewerPosts(remote: BlogPostsFile | null, local: BlogPostsFile): BlogPostRecord[] {
  if (!remote?.posts.length) return local.posts;
  if (!local.posts.length) return remote.posts;

  const remoteTs = fileTimestamp(remote);
  const localTs = fileTimestamp(local);

  if (remoteTs === 0 && localTs === 0) {
    return remote.posts.length <= local.posts.length ? remote.posts : local.posts;
  }
  if (remoteTs === 0) return local.posts;
  if (localTs === 0) return remote.posts;
  return remoteTs >= localTs ? remote.posts : local.posts;
}

async function readBlobJson(): Promise<unknown | null> {
  try {
    const result = await get(BLOB_POSTS_PATH, { access: "public" });
    if (result?.statusCode === 200 && result.stream) {
      const text = await new Response(result.stream).text();
      return JSON.parse(text) as unknown;
    }
  } catch {
    // fall through to cache-busted URL fetch
  }

  const meta = await head(BLOB_POSTS_PATH);
  if (!meta?.url) return null;
  const res = await fetch(`${meta.url}?_=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as unknown;
}

async function readFromBlob(): Promise<BlogPostsFile | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    return normalizeFile(await readBlobJson());
  } catch {
    return null;
  }
}

async function writeToBlob(file: BlogPostsFile): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for remote blog storage.");
  }
  await put(BLOB_POSTS_PATH, JSON.stringify(file, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

async function readFromDisk(): Promise<BlogPostsFile> {
  try {
    const raw = await readFile(POSTS_FILE, "utf8");
    return normalizeFile(JSON.parse(raw));
  } catch {
    return emptyFile();
  }
}

async function writeToDisk(file: BlogPostsFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(POSTS_FILE, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}

export function usesRemoteBlogStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function loadAllRecords(): Promise<BlogPostRecord[]> {
  const local = await readFromDisk();
  if (!usesRemoteBlogStorage()) return local.posts;

  const remote = await readFromBlob();
  return pickNewerPosts(remote, local);
}

export async function saveAllRecords(posts: BlogPostRecord[]): Promise<void> {
  const file: BlogPostsFile = {
    version: 1,
    savedAt: new Date().toISOString(),
    posts,
  };

  try {
    await writeToDisk(file);
  } catch (err) {
    if (!usesRemoteBlogStorage()) throw err;
  }
  if (usesRemoteBlogStorage()) {
    await writeToBlob(file);
  }
}

export async function getRecordById(id: string): Promise<BlogPostRecord | undefined> {
  const posts = await loadAllRecords();
  return posts.find((p) => p.id === id);
}

export async function getRecordBySlug(slug: string): Promise<BlogPostRecord | undefined> {
  const posts = await loadAllRecords();
  return posts.find((p) => p.slug === slug);
}
```

---

## 7. Types, validation, slug, links, dates

### `lib/blog/types.ts`

```ts
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
```

### `lib/blog/validation.ts`

```ts
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

const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePostInput(input: PostInput, isCreate: boolean): ValidationResult {
  const errors: Record<string, string> = {};

  const title = typeof input.title === "string" ? input.title.trim() : "";
  const excerpt = typeof input.excerpt === "string" ? input.excerpt.trim() : "";
  const contentMarkdown =
    typeof input.contentMarkdown === "string" ? input.contentMarkdown.trim() : "";
  const featuredImage =
    typeof input.featuredImage === "string" ? input.featuredImage.trim() : "";
  const authorName = typeof input.authorName === "string" ? input.authorName.trim() : "";
  const publishedAt = typeof input.publishedAt === "string" ? input.publishedAt.trim() : "";
  const status = input.status === "draft" || input.status === "published" ? input.status : undefined;

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

  if (input.authorAvatar && typeof input.authorAvatar === "string" && EMAIL_LIKE.test(input.authorAvatar)) {
    // no-op; avatar is optional path
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: input };
}
```

### `lib/blog/slug.ts`

```ts
export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function ensureUniqueSlug(base: string, existing: string[], currentSlug?: string): string {
  const normalized = slugifyTitle(base) || "post";
  if (currentSlug === normalized) return normalized;
  if (!existing.includes(normalized)) return normalized;
  let i = 2;
  while (existing.includes(`${normalized}-${i}`)) i += 1;
  return `${normalized}-${i}`;
}
```

### `lib/blog/normalize-markdown-links.ts`

```ts
/**
 * Markdown treats URLs without a scheme as relative paths.
 * On /blog/my-post, [text](cressoft.net) becomes /blog/cressoft.net.
 * Prefix https:// for domain-like targets (not site paths like /contact).
 */
export function needsHttpsPrefix(url: string): boolean {
  const u = url.trim();
  if (!u || u.startsWith("/") || u.startsWith("#") || u.startsWith(".")) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return false;
  return /^[\w-]+(\.[\w-]+)+([\/?#].*)?$/i.test(u) || /^www\./i.test(u);
}

export function normalizeMarkdownExternalLinks(markdown: string): string {
  return markdown.replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g, (match, text, url) => {
    if (!needsHttpsPrefix(url)) return match;
    return `[${text}](https://${url.replace(/^\/+/, "")})`;
  });
}
```

### `lib/blog/revalidate-public.ts`

```ts
import { revalidatePath } from "next/cache";

export function revalidateBlogPaths(slug?: string): void {
  revalidatePath("/blog");
  revalidatePath("/admin");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/admin/preview/${slug}`);
  }
}
```

### `lib/blog/format-date.ts`

```ts
// Formats an ISO date (or yyyy-mm-dd) into a human-readable string.
// Adjust locale/options to taste.
export function formatBlogDate(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

### `lib/blog/to-blog-post.ts`

```ts
import type { BlogAuthor, BlogPost } from "@/lib/blog-data";
import type { BlogPostRecord } from "@/lib/blog/types";

function readingMinutesFromMarkdown(body: string, fallback: number | undefined): number {
  if (typeof fallback === "number" && fallback > 0) return Math.round(fallback);
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function recordToBlogPost(record: BlogPostRecord): BlogPost {
  const author: BlogAuthor = {
    name: record.authorName,
    role: record.authorRole,
    avatarSrc: record.authorAvatar,
  };

  return {
    slug: record.slug,
    title: record.title,
    metaTitle: record.metaTitle,
    excerpt: record.excerpt,
    author,
    publishedAt: record.publishedAt,
    featuredImage: record.featuredImage,
    imageFit: record.imageFit,
    readingMinutes: readingMinutesFromMarkdown(record.contentMarkdown, record.readingMinutes),
    tags: record.tags ?? [],
    seoKeywords: record.seoKeywords ?? [],
    contentMarkdown: record.contentMarkdown,
    metaDescription: record.metaDescription,
    ogImage: record.ogImage ?? record.featuredImage,
    category: record.category,
    status: record.status,
  };
}
```

### `lib/render-markdown.ts`

```ts
import { remark } from "remark";
import remarkHtml from "remark-html";

import { normalizeMarkdownExternalLinks } from "@/lib/blog/normalize-markdown-links";

/**
 * Renders trusted markdown (mock CMS / static content) to an HTML string.
 * NOTE: output is NOT sanitized — only use with trusted (admin-authored) content.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const normalized = normalizeMarkdownExternalLinks(markdown);
  const file = await remark().use(remarkHtml).process(normalized);
  return String(file);
}
```

---

## 8. API routes

### `app/api/admin/login/route.ts`

```ts
import { NextResponse } from "next/server";

import { getAdminPassword } from "@/lib/admin/auth";
import { createAdminSession } from "@/lib/admin/session";

export async function POST(request: Request) {
  const configured = getAdminPassword();
  if (!configured) {
    return NextResponse.json(
      { ok: false, message: "Admin login is not configured on this server." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password || password !== configured) {
    return NextResponse.json({ ok: false, message: "Invalid password." }, { status: 401 });
  }

  try {
    await createAdminSession();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Session secret is not configured (ADMIN_SESSION_SECRET)." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
```

### `app/api/admin/logout/route.ts`

```ts
import { NextResponse } from "next/server";

import { destroyAdminSession } from "@/lib/admin/session";

export async function POST() {
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
```

### `app/api/admin/posts/route.ts`

```ts
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin/auth";
import { revalidateBlogPaths } from "@/lib/blog/revalidate-public";
import { ensureUniqueSlug } from "@/lib/blog/slug";
import { loadAllRecords, saveAllRecords } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";
import { validatePostInput } from "@/lib/blog/validation";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const posts = await loadAllRecords();
  return NextResponse.json({ ok: true, posts });
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validatePostInput(body, true);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
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
    metaTitle: typeof input.metaTitle === "string" ? input.metaTitle.trim() : undefined,
    metaDescription:
      typeof input.metaDescription === "string" ? input.metaDescription.trim() : undefined,
    excerpt: input.excerpt!.trim(),
    authorName: input.authorName!.trim(),
    authorRole: typeof input.authorRole === "string" ? input.authorRole.trim() : undefined,
    authorAvatar: typeof input.authorAvatar === "string" ? input.authorAvatar.trim() : undefined,
    publishedAt: input.publishedAt!,
    featuredImage: input.featuredImage!.trim(),
    ogImage: typeof input.ogImage === "string" ? input.ogImage.trim() : undefined,
    imageFit: input.imageFit === "contain" ? "contain" : "cover",
    readingMinutes:
      typeof input.readingMinutes === "number" ? Math.round(input.readingMinutes) : undefined,
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    category: typeof input.category === "string" ? input.category.trim() : undefined,
    seoKeywords: Array.isArray(input.seoKeywords) ? input.seoKeywords.map(String) : [],
    contentMarkdown: input.contentMarkdown!,
    status: input.status!,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await saveAllRecords([record, ...posts]);
    if (record.status === "published") revalidateBlogPaths(record.slug);
    return NextResponse.json({ ok: true, post: record });
  } catch (err) {
    console.error("[admin/posts POST]", err);
    const message =
      err instanceof Error ? err.message : "Could not save post. Check server logs.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
```

### `app/api/admin/posts/[id]/route.ts`

```ts
import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin/auth";
import { revalidateBlogPaths } from "@/lib/blog/revalidate-public";
import { ensureUniqueSlug } from "@/lib/blog/slug";
import { loadAllRecords, saveAllRecords } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";
import { validatePostInput } from "@/lib/blog/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const { id } = await context.params;
  const posts = await loadAllRecords();
  const post = posts.find((p) => p.id === id);
  if (!post) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true, post });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const { id } = await context.params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validatePostInput(body, false);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const posts = await loadAllRecords();
  const index = posts.findIndex((p) => p.id === id);
  if (index < 0) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });

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
    metaTitle: typeof input.metaTitle === "string" ? input.metaTitle.trim() : undefined,
    metaDescription:
      typeof input.metaDescription === "string" ? input.metaDescription.trim() : undefined,
    excerpt: input.excerpt!.trim(),
    authorName: input.authorName!.trim(),
    authorRole: typeof input.authorRole === "string" ? input.authorRole.trim() : undefined,
    authorAvatar: typeof input.authorAvatar === "string" ? input.authorAvatar.trim() : undefined,
    publishedAt: input.publishedAt!,
    featuredImage: input.featuredImage!.trim(),
    ogImage: typeof input.ogImage === "string" ? input.ogImage.trim() : undefined,
    imageFit: input.imageFit === "contain" ? "contain" : "cover",
    readingMinutes:
      typeof input.readingMinutes === "number" ? Math.round(input.readingMinutes) : undefined,
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    category: typeof input.category === "string" ? input.category.trim() : undefined,
    seoKeywords: Array.isArray(input.seoKeywords) ? input.seoKeywords.map(String) : [],
    contentMarkdown: input.contentMarkdown!,
    status: input.status!,
    updatedAt: new Date().toISOString(),
  };

  const next = [...posts];
  next[index] = updated;
  try {
    await saveAllRecords(next);
    revalidateBlogPaths(updated.slug);
    if (existing.slug !== updated.slug) revalidateBlogPaths(existing.slug);
    return NextResponse.json({ ok: true, post: updated });
  } catch (err) {
    console.error("[admin/posts PUT]", err);
    const message =
      err instanceof Error ? err.message : "Could not save post. Check server logs.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const { id } = await context.params;
  const posts = await loadAllRecords();
  const removed = posts.find((p) => p.id === id);
  if (!removed) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  try {
    await saveAllRecords(posts.filter((p) => p.id !== id));
    revalidateBlogPaths(removed.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/posts DELETE]", err);
    const message =
      err instanceof Error ? err.message : "Could not delete post. Check server logs.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
```

### `app/api/admin/upload/route.ts`

```ts
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { requireAdminApi } from "@/lib/admin/auth";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "No file uploaded." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { ok: false, message: "Only JPEG, PNG, WebP, or GIF images are allowed." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, message: "Image must be 5 MB or smaller." }, { status: 400 });
  }

  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "webp";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`blog/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  }

  const uploadDir = path.join(process.cwd(), "public", "images", "blog-uploads");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);
  return NextResponse.json({ ok: true, url: `/images/blog-uploads/${filename}` });
}
```

---

## 9. Admin UI (pages)

### `app/admin/layout.tsx`

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
```

### `app/admin/page.tsx`

```tsx
import AdminShell from "@/components/admin/AdminShell";
import PostList from "@/components/admin/PostList";
import { loadAllRecords } from "@/lib/blog/storage";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const posts = await loadAllRecords();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <AdminShell title="All posts">
      <PostList initialPosts={sorted} />
    </AdminShell>
  );
}
```

### `app/admin/login/page.tsx`

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.message ?? "Login failed.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4f0] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl border border-line bg-ivory/80 p-8 shadow-sm"
      >
        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-luxe text-muted">Felinda CMS</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">Sign in</h1>
          <p className="mt-2 font-sans text-sm text-muted">Blog management for authorized staff only.</p>
        </div>
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800">
            {error}
          </p>
        ) : null}
        <label className="block space-y-2">
          <span className="font-sans text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 font-sans text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink py-3 font-sans text-sm font-medium text-cream transition hover:bg-noir disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6f4f0]" />}>
      <LoginForm />
    </Suspense>
  );
}
```

### `app/admin/posts/new/page.tsx`

```tsx
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return <PostForm mode="create" />;
}
```

### `app/admin/posts/[id]/edit/page.tsx`

```tsx
import { notFound } from "next/navigation";

import PostForm from "@/components/admin/PostForm";
import { getRecordById } from "@/lib/blog/storage";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPageProps) {
  const { id } = await params;
  const post = await getRecordById(id);
  if (!post) notFound();
  return <PostForm mode="edit" initial={post} />;
}
```

### `app/admin/preview/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import AuthorBox from "@/components/blog/AuthorBox";
import BlogContent from "@/components/blog/BlogContent";
import { formatBlogDate, getPostBySlugForPreview } from "@/lib/blog-data";
import { renderMarkdown } from "@/lib/render-markdown";

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default async function AdminPreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugForPreview(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.contentMarkdown);
  const isDraft = post.status === "draft";

  return (
    <div className="min-h-screen bg-cream">
      <div
        className={`sticky top-0 z-50 border-b px-4 py-3 text-center font-sans text-sm ${
          isDraft
            ? "border-amber-200 bg-amber-50 text-amber-950"
            : "border-emerald-200 bg-emerald-50 text-emerald-950"
        }`}
      >
        Admin preview · {isDraft ? "Draft (not public)" : "Published"}
        <Link href="/admin" className="ml-4 underline">
          Back to admin
        </Link>
      </div>

      <main>
        <article className="border-b border-line/80 bg-shell/20">
          <div className="mx-auto max-w-3xl px-6 pb-12 pt-10 lg:px-10 lg:pt-14">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted transition hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
              Back to admin
            </Link>
            <header className="mt-10">
              <p className="font-sans text-xs font-medium uppercase tracking-luxe text-muted">
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                <span aria-hidden className="mx-2 text-line">·</span>
                {post.readingMinutes} min read
              </p>
              <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
                {post.title}
              </h1>
            </header>
          </div>
        </article>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <div className="relative -mt-6 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-line bg-shell shadow-sm sm:aspect-[2/1]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              className={post.imageFit === "contain" ? "object-contain" : "object-cover"}
              sizes="(max-width: 1024px) 100vw, 56rem"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
          <AuthorBox author={post.author} publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
          <div className="mt-14">
            <BlogContent html={html} />
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 10. Admin UI (components)

### `components/admin/AdminShell.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
};

export default function AdminShell({ children, title }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f6f4f0] text-ink">
      <header className="border-b border-line/80 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-luxe text-muted">
              Felinda CMS
            </p>
            <h1 className="font-serif text-xl text-ink">{title ?? "Blog admin"}</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Link
              href="/admin"
              className={`rounded-full px-3 py-1.5 font-sans text-sm transition ${
                pathname === "/admin" ? "bg-ink text-cream" : "text-muted hover:text-ink"
              }`}
            >
              Posts
            </Link>
            <Link
              href="/admin/posts/new"
              className={`rounded-full px-3 py-1.5 font-sans text-sm transition ${
                pathname === "/admin/posts/new" ? "bg-ink text-cream" : "text-muted hover:text-ink"
              }`}
            >
              New post
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-1.5 font-sans text-sm text-muted transition hover:text-ink"
              target="_blank"
            >
              View blog
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-line px-3 py-1.5 font-sans text-sm text-ink transition hover:border-clay/50"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
```

### `components/admin/PostList.tsx`

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

import type { BlogPostRecord } from "@/lib/blog/types";
import { formatBlogDate } from "@/lib/blog/format-date";

type PostListProps = {
  initialPosts: BlogPostRecord[];
};

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    setError(null);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (!res.ok) {
      setError("Could not delete post. Please try again.");
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    // Do not router.refresh() here — a stale Blob CDN read would re-insert the deleted post.
  }

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line bg-ivory/60 px-6 py-16 text-center font-sans text-muted">
        No posts yet.{" "}
        <Link href="/admin/posts/new" className="font-medium text-ink underline">
          Create your first post
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800">
          {error}
        </p>
      ) : null}
      <ul className="divide-y divide-line/80 overflow-hidden rounded-2xl border border-line bg-ivory/70">
        {posts.map((post) => (
          <li key={post.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-serif text-lg text-ink">{post.title}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-sans text-xs font-medium ${
                    post.status === "published"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <p className="mt-1 font-sans text-sm text-muted">
                /blog/{post.slug} · {formatBlogDate(post.publishedAt)}
                {post.category ? ` · ${post.category}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/admin/preview/${post.slug}`}
                className="rounded-full border border-line px-4 py-2 font-sans text-sm text-ink transition hover:border-clay/50"
              >
                Preview
              </Link>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="rounded-full border border-line px-4 py-2 font-sans text-sm text-ink transition hover:border-clay/50"
              >
                Edit
              </Link>
              <button
                type="button"
                disabled={deletingId === post.id}
                onClick={() => handleDelete(post.id, post.title)}
                className="rounded-full border border-red-200 px-4 py-2 font-sans text-sm text-red-800 transition hover:bg-red-50 disabled:opacity-50"
              >
                {deletingId === post.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### `components/admin/PostForm.tsx`

> This is the heart of the "write" and "publish" UI. Two buttons call the same `save()`
> with a different `status`: **Save draft** → `save("draft")`, **Publish** →
> `save("published")`. Title auto-generates the slug until you edit the slug manually.

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ogImage: string;
  imageFit: "cover" | "contain";
  metaTitle: string;
  metaDescription: string;
  category: string;
  tags: string;
  seoKeywords: string;
  status: BlogPostStatus;
};

function toFormState(initial?: BlogPostRecord): FormState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    slugTouched: Boolean(initial?.slug),
    excerpt: initial?.excerpt ?? "",
    contentMarkdown: initial?.contentMarkdown ?? "",
    authorName: initial?.authorName ?? "Felinda Atelier",
    authorRole: initial?.authorRole ?? "Design studio",
    authorAvatar: initial?.authorAvatar ?? "",
    publishedAt: initial?.publishedAt?.slice(0, 10) ?? today,
    featuredImage: initial?.featuredImage ?? "",
    ogImage: initial?.ogImage ?? "",
    imageFit: initial?.imageFit ?? "cover",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
    category: initial?.category ?? "",
    tags: (initial?.tags ?? []).join(", "),
    seoKeywords: (initial?.seoKeywords ?? []).join(", "),
    status: initial?.status ?? "draft",
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

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !prev.slugTouched) {
        next.slug = slugifyTitle(String(value));
      }
      if (key === "slug") next.slugTouched = true;
      return next;
    });
  }, []);

  async function uploadImage(file: File, target: "featuredImage" | "ogImage") {
    setUploading(true);
    setMessage(null);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    setUploading(false);
    const data = await res.json();
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
      ogImage: form.ogImage || undefined,
      imageFit: form.imageFit,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      category: form.category || undefined,
      tags: splitList(form.tags),
      seoKeywords: splitList(form.seoKeywords),
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
    router.refresh();
  }

  const previewSlug = form.slug || autoSlug;

  return (
    <AdminShell title={mode === "create" ? "New post" : "Edit post"}>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          save(form.status);
        }}
      >
        {message ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800">
            {message}
          </p>
        ) : null}

        <section className="grid gap-6 rounded-2xl border border-line bg-ivory/70 p-6 lg:grid-cols-2">
          <Field label="Title *" error={errors.title}>
            <input
              className="field-input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </Field>
          <Field label="URL slug" hint="Auto-generated from title unless you edit it." error={errors.slug}>
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm text-muted">/blog/</span>
              <input
                className="field-input flex-1"
                value={form.slug}
                onChange={(e) => update("slug", slugifyTitle(e.target.value) || e.target.value)}
              />
            </div>
          </Field>
          <Field label="Description / excerpt *" error={errors.excerpt}>
            <textarea
              className="field-input min-h-[100px]"
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              required
            />
          </Field>
          <Field label="Category">
            <input
              className="field-input"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="e.g. Guides, Education"
            />
          </Field>
          <Field label="Author name *" error={errors.authorName}>
            <input
              className="field-input"
              value={form.authorName}
              onChange={(e) => update("authorName", e.target.value)}
              required
            />
          </Field>
          <Field label="Author role">
            <input
              className="field-input"
              value={form.authorRole}
              onChange={(e) => update("authorRole", e.target.value)}
            />
          </Field>
          <Field label="Publish date *" error={errors.publishedAt}>
            <input
              type="date"
              className="field-input"
              value={form.publishedAt}
              onChange={(e) => update("publishedAt", e.target.value)}
              required
            />
          </Field>
          <Field label="Status *" error={errors.status}>
            <select
              className="field-input"
              value={form.status}
              onChange={(e) => update("status", e.target.value as BlogPostStatus)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              className="field-input"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
            />
          </Field>
          <Field label="SEO keywords (comma-separated)">
            <input
              className="field-input"
              value={form.seoKeywords}
              onChange={(e) => update("seoKeywords", e.target.value)}
            />
          </Field>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-ivory/70 p-6">
          <h2 className="font-serif text-xl text-ink">SEO</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Field label="Meta title">
              <input
                className="field-input"
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
              />
            </Field>
            <Field label="Meta description">
              <textarea
                className="field-input min-h-[80px]"
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-ivory/70 p-6">
          <h2 className="font-serif text-xl text-ink">Images</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Field label="Featured image *" error={errors.featuredImage}>
              <input
                className="field-input"
                value={form.featuredImage}
                onChange={(e) => update("featuredImage", e.target.value)}
                placeholder="/images/... or uploaded URL"
              />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="mt-2 block font-sans text-sm"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, "featuredImage");
                }}
              />
            </Field>
            <Field label="OG image (social share)">
              <input
                className="field-input"
                value={form.ogImage}
                onChange={(e) => update("ogImage", e.target.value)}
              />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="mt-2 block font-sans text-sm"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, "ogImage");
                }}
              />
            </Field>
            <Field label="Image fit">
              <select
                className="field-input"
                value={form.imageFit}
                onChange={(e) => update("imageFit", e.target.value as "cover" | "contain")}
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
              </select>
            </Field>
          </div>
          {form.featuredImage ? (
            <div className="relative mt-2 aspect-[21/9] max-w-xl overflow-hidden rounded-xl border border-line bg-shell">
              <Image src={form.featuredImage} alt="Featured preview" fill className="object-cover" />
            </div>
          ) : null}
        </section>

        <section className="space-y-3 rounded-2xl border border-line bg-ivory/70 p-6">
          <h2 className="font-serif text-xl text-ink">Content *</h2>
          {errors.contentMarkdown ? (
            <p className="font-sans text-sm text-red-700">{errors.contentMarkdown}</p>
          ) : null}
          <p className="font-sans text-xs text-muted">
            External links need a full URL, e.g.{" "}
            <code className="rounded bg-shell px-1">https://cressoft.net</code> — bare domains like{" "}
            <code className="rounded bg-shell px-1">cressoft.net</code> are auto-fixed on save.
          </p>
          <MarkdownEditor
            value={form.contentMarkdown}
            onChange={(v) => update("contentMarkdown", v)}
          />
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="rounded-full border border-line bg-ivory px-6 py-2.5 font-sans text-sm font-medium text-ink transition hover:border-clay/50 disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save("published")}
            className="rounded-full border border-ink bg-ink px-6 py-2.5 font-sans text-sm font-medium text-cream transition hover:bg-noir disabled:opacity-50"
          >
            {saving ? "Saving…" : "Publish"}
          </button>
          {previewSlug ? (
            <Link
              href={`/admin/preview/${previewSlug}`}
              className="rounded-full border border-line px-6 py-2.5 font-sans text-sm font-medium text-ink transition hover:border-clay/50"
            >
              Preview
            </Link>
          ) : null}
          <Link href="/admin" className="font-sans text-sm text-muted hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>

      <style jsx global>{`
        .field-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: #fff;
          padding: 0.65rem 0.85rem;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 0.875rem;
          color: #1a1a1a;
        }
        .field-input:focus {
          outline: 2px solid rgba(0, 0, 0, 0.2);
          outline-offset: 1px;
        }
      `}</style>
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
    <label className="block space-y-1.5">
      <span className="font-sans text-sm font-medium text-ink">{label}</span>
      {hint ? <span className="block font-sans text-xs text-muted">{hint}</span> : null}
      {children}
      {error ? <span className="block font-sans text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
```

### `components/admin/MarkdownEditor.tsx`

```tsx
"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { blogEditorCommands, blogEditorExtraCommands } from "@/components/admin/editor-commands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div data-color-mode="light" className="admin-md-editor overflow-hidden rounded-xl border border-line">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={420}
        preview="live"
        visibleDragbar={false}
        commands={blogEditorCommands}
        extraCommands={blogEditorExtraCommands}
      />
      <style jsx global>{`
        .admin-md-editor .w-md-editor-toolbar {
          flex-wrap: wrap;
          gap: 2px;
          padding: 6px 8px;
        }
        .admin-md-editor .w-md-editor-toolbar li > button {
          min-width: 2rem;
          height: 2rem;
          border-radius: 6px;
        }
        .admin-md-editor .w-md-editor-toolbar li > button:hover {
          background: rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
}
```

### `components/admin/editor-commands.tsx`

```tsx
"use client";

import type { ExecuteState, ICommand, TextAreaTextApi } from "@uiw/react-md-editor/commands";
import {
  bold,
  checkedListCommand,
  code,
  codeBlock,
  codeEdit,
  codeLive,
  codePreview,
  divider,
  fullscreen,
  heading1,
  heading2,
  heading3,
  heading4,
  help,
  hr,
  image,
  italic,
  link,
  orderedListCommand,
  quote,
  strikethrough,
  table,
  unorderedListCommand,
} from "@uiw/react-md-editor/commands";

function toolbarLabel(text: string) {
  return (
    <span className="inline-flex min-w-[1.35rem] items-center justify-center font-sans text-[11px] font-semibold leading-none">
      {text}
    </span>
  );
}

function selectLine(text: string, selection: { start: number; end: number }) {
  const start = text.slice(0, selection.start).lastIndexOf("\n") + 1;
  let end = text.slice(selection.end).indexOf("\n") + selection.end;
  if (end === selection.end - 1) end = text.length;
  return { start, end };
}

const paragraph: ICommand = {
  name: "paragraph",
  keyCommand: "paragraph",
  buttonProps: { "aria-label": "Paragraph", title: "Paragraph" },
  icon: toolbarLabel("P"),
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const range = selectLine(state.text, state.selection);
    const lineState = api.setSelectionRange(range);
    const plain = lineState.selectedText.replace(/^#{1,6}\s+/, "");
    api.replaceSelection(plain);
  },
};

function withLabel(command: ICommand, label: string, title: string): ICommand {
  return {
    ...command,
    icon: toolbarLabel(label),
    buttonProps: {
      ...command.buttonProps,
      "aria-label": title,
      title,
    },
  };
}

const headingToolbar = [
  withLabel(heading1, "H1", "Heading 1"),
  withLabel(heading2, "H2", "Heading 2"),
  withLabel(heading3, "H3", "Heading 3"),
  withLabel(heading4, "H4", "Heading 4"),
  paragraph,
];

/** Toolbar with explicit heading + paragraph controls (not hidden in a dropdown). */
export const blogEditorCommands: ICommand[] = [
  bold,
  italic,
  strikethrough,
  divider,
  ...headingToolbar,
  divider,
  hr,
  link,
  quote,
  code,
  codeBlock,
  image,
  table,
  divider,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
  divider,
  help,
];

export const blogEditorExtraCommands: ICommand[] = [
  codeEdit,
  codeLive,
  codePreview,
  divider,
  fullscreen,
];
```

---

## 11. Public blog read layer + rendering

### `lib/blog-data.ts`

```ts
import "server-only";

import { cache } from "react";

import { recordToBlogPost } from "@/lib/blog/to-blog-post";
import { loadAllRecords } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";

export type BlogAuthor = {
  name: string;
  role?: string;
  avatarSrc?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  author: BlogAuthor;
  publishedAt: string;
  featuredImage: string;
  ogImage?: string;
  imageFit?: "cover" | "contain";
  readingMinutes: number;
  tags: string[];
  category?: string;
  seoKeywords: string[];
  contentMarkdown: string;
  status?: "draft" | "published";
};

const loadRecords = cache(async () => loadAllRecords());

async function publishedRecords(): Promise<BlogPostRecord[]> {
  const records = await loadRecords();
  return records.filter((r) => r.status === "published");
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return (await publishedRecords())
    .map(recordToBlogPost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const records = await publishedRecords();
  const record = records.find((p) => p.slug === slug);
  return record ? recordToBlogPost(record) : undefined;
}

// Preview loads ANY status (drafts included).
export async function getPostBySlugForPreview(slug: string): Promise<BlogPost | undefined> {
  const records = await loadRecords();
  const record = records.find((p) => p.slug === slug);
  return record ? recordToBlogPost(record) : undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  return (await publishedRecords()).map((p) => p.slug);
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const current = await getPostBySlug(slug);
  if (!current) return [];
  const tagSet = new Set(current.tags);
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.reduce((n, t) => n + (tagSet.has(t) ? 1 : 0), 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map((x) => x.post);
}

export { formatBlogDate } from "@/lib/blog/format-date";
```

### `components/blog/BlogContent.tsx` (minimal reference)

The public `/blog` pages (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`) are project-specific
(they pull in your `Header`, `Footer`, SEO/JSON-LD helpers). The one component the CMS/preview
truly needs is a renderer for the HTML string produced by `renderMarkdown`. A minimal version:

```tsx
type BlogContentProps = { html: string };

// `html` is produced by lib/render-markdown.ts from trusted, admin-authored markdown.
export default function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="prose prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

> `AuthorBox` (used by preview + article) just renders `author.name`, `author.role`,
> `publishedAt`, and `readingMinutes` — build one to match your design, or inline the fields.

---

## 12. Data file seed

Create `data/blog/posts.json` with an empty store to start:

```json
{
  "version": 1,
  "posts": []
}
```

Records are shaped like `BlogPostRecord` (see types). Example of one saved post:

```json
{
  "id": "8f97a5ff-65ff-46f6-b569-c1b03c076c26",
  "slug": "how-to-design-custom-engagement-ring",
  "title": "How to Design a Custom Engagement Ring",
  "metaTitle": "Custom Engagement Ring: Complete Guide",
  "metaDescription": "Everything you need to know...",
  "excerpt": "A first-timer's complete guide...",
  "authorName": "Felinda Atelier",
  "authorRole": "Design studio",
  "publishedAt": "2026-05-21",
  "featuredImage": "/images/blog/hero.webp",
  "ogImage": "/images/blog/hero.webp",
  "imageFit": "cover",
  "readingMinutes": 14,
  "tags": ["guides", "rings"],
  "category": "Guides",
  "seoKeywords": ["custom ring"],
  "contentMarkdown": "## Intro\n\nBody text with [a link](https://example.com).",
  "status": "published",
  "createdAt": "2026-05-30T04:57:40.989Z",
  "updatedAt": "2026-05-30T05:04:02.127Z"
}
```

> Add `public/images/blog-uploads/` to `.gitignore` if you don't want local uploads committed.

---

## 13. Setup checklist

1. `npm i @uiw/react-md-editor @vercel/blob jose lucide-react remark remark-gfm remark-html server-only`
2. Ensure `@/*` path alias in `tsconfig.json`.
3. Copy all files from the [file map](#4-file-map) into the same paths.
4. Add env vars (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, optional `BLOB_READ_WRITE_TOKEN`).
5. Create `data/blog/posts.json` → `{ "version": 1, "posts": [] }`.
6. Port or stub the public `components/blog/*` (`BlogContent`, `AuthorBox`, `BlogList`,
   `BlogCard`, `RelatedPosts`) and any SEO helpers (`buildPageMetadata`, JSON-LD) referenced
   by `app/blog/*` — or trim those imports if you only need the admin.
7. Provide the Tailwind color tokens used in the markup (`ink`, `cream`, `noir`, `ivory`,
   `line`, `muted`, `shell`, `clay`, `tracking-luxe`, `font-serif`, `font-sans`) in your
   `tailwind.config.js`, or find-and-replace them with your own classes.
8. `npm run dev`, visit `/admin/login`, sign in, create → Save draft → Preview → Publish.

### Tailwind tokens referenced (map to your design system)

| Token | Meaning in original |
|-------|--------------------|
| `ink` | primary near-black text |
| `noir` | darker hover black |
| `cream` / `ivory` | light backgrounds |
| `shell` | subtle panel background |
| `line` | border color |
| `muted` | secondary text |
| `clay` | accent (hover borders) |
| `tracking-luxe` | wide letter-spacing |
| `font-serif` / `font-sans` | heading / body fonts |

---

## 14. How it all flows

**Write & publish lifecycle:**

1. **Sign in** at `/admin/login` → password checked against `ADMIN_PASSWORD` → 12h JWT cookie set.
2. **New post** at `/admin/posts/new` → fill fields, write markdown, upload images (Blob or disk).
3. **Save draft** → `POST /api/admin/posts` with `status: "draft"` → stored, invisible to public.
4. **Preview** at `/admin/preview/{slug}` → renders in the real article layout with a draft banner.
5. **Publish** → same form, "Publish" button → `status: "published"` → saved + `revalidatePath("/blog")`.
6. **Live** → appears at `/blog` (list) and `/blog/{slug}` (article), drafts filtered out by the read layer.
7. **Edit** at `/admin/posts/{id}/edit` → `PUT` re-saves, revalidates new + old slug if it changed.
8. **Delete** → `DELETE`, removed from JSON, paths revalidated.

**Request → storage path (create/publish):**

```
PostForm.save("published")
  └─ POST /api/admin/posts
       ├─ middleware.ts         (JWT check → 401 if bad)
       ├─ requireAdminApi()     (re-check auth)
       ├─ validatePostInput()   (400 on bad fields)
       ├─ ensureUniqueSlug()    (dedupe slug)
       ├─ saveAllRecords()      (write disk + Blob, stamp savedAt)
       └─ revalidateBlogPaths(slug)   (if published)
```

**Security notes to keep in mind:**

- `renderMarkdown` output is **not sanitized** — this is fine because only the authenticated
  admin writes content. If you ever accept untrusted markdown, add `rehype-sanitize`.
- Password comparison is plain equality; it's a single shared password, not per-user accounts.
- The admin is fully gated by `middleware.ts` + `requireAdminApi()`; `robots: noindex` keeps
  `/admin` and `/admin/preview` out of search engines.
```
