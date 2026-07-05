import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { put } from "@vercel/blob";

import { requireAdminApi } from "@/lib/admin/auth";

/**
 * Image upload.
 *
 * NOTE (Pages Router port): the App-Router guide used `request.formData()`,
 * which isn't available on the Node `req` here. Instead the client sends the
 * raw file as the request body with the content type on `Content-Type` and the
 * original name on `x-filename`. We disable the JSON body parser and buffer the
 * stream ourselves — no multipart dependency required.
 */
export const config = {
  api: { bodyParser: false },
};

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

function readRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BYTES) {
        reject(new Error("TOO_LARGE"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks as unknown as Uint8Array[])));
    req.on("error", reject);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(await requireAdminApi(req, res))) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const contentType = String(req.headers["content-type"] ?? "");
  if (!ALLOWED_TYPES.has(contentType)) {
    return res.status(400).json({
      ok: false,
      message: "Only JPEG, PNG, WebP, or GIF images are allowed.",
    });
  }

  let buffer: Buffer;
  try {
    buffer = await readRawBody(req);
  } catch (err) {
    if (err instanceof Error && err.message === "TOO_LARGE") {
      return res.status(400).json({ ok: false, message: "Image must be 5 MB or smaller." });
    }
    return res.status(400).json({ ok: false, message: "Could not read upload." });
  }

  if (buffer.length === 0) {
    return res.status(400).json({ ok: false, message: "No file uploaded." });
  }

  const ext = contentType.split("/")[1]?.replace("jpeg", "jpg") ?? "webp";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`blog/${filename}`, buffer, {
        access: "public",
        addRandomSuffix: false,
        contentType,
      });
      return res.status(200).json({ ok: true, url: blob.url });
    }

    const uploadDir = path.join(process.cwd(), "public", "images", "blog-uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer as unknown as Uint8Array);
    return res.status(200).json({ ok: true, url: `/images/blog-uploads/${filename}` });
  } catch (err) {
    console.error("[admin/upload]", err);
    return res.status(500).json({ ok: false, message: "Upload failed. Check server logs." });
  }
}