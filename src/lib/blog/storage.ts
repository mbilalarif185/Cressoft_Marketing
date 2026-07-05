// NOTE: the App-Router guide marked this `import "server-only"`. In the Pages
// Router the server/client split is enforced by the getServerSideProps / API
// boundaries instead, and a side-effectful `server-only` import can leak into a
// client bundle when a page type-imports from here — so it is intentionally
// omitted (matching the project's existing src/lib/blog.ts convention).
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
function pickNewerPosts(
  remote: BlogPostsFile | null,
  local: BlogPostsFile,
): BlogPostRecord[] {
  // No remote copy at all (Blob read failed) → trust disk.
  if (!remote) return local.posts;

  const remoteTs = fileTimestamp(remote);
  const localTs = fileTimestamp(local);

  // If either copy carries a `savedAt`, the most recently saved one wins —
  // EVEN IF it is empty. This is critical on serverless: deleting the last
  // post writes an empty (but newer) Blob copy, and it must beat the stale
  // committed disk copy instead of resurrecting the deleted post.
  if (remoteTs !== 0 || localTs !== 0) {
    return remoteTs >= localTs ? remote.posts : local.posts;
  }

  // Neither copy is stamped (legacy / hand-seeded files): fall back to the
  // non-empty one, preferring the smaller when both have posts.
  if (!remote.posts.length) return local.posts;
  if (!local.posts.length) return remote.posts;
  return remote.posts.length <= local.posts.length ? remote.posts : local.posts;
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