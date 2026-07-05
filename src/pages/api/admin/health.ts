import type { NextApiRequest, NextApiResponse } from "next";

import { requireAdminApi } from "@/lib/admin/auth";
import { loadAllRecords, usesRemoteBlogStorage } from "@/lib/blog/storage";

/**
 * Diagnostic endpoint (admin-only). Reports what the server actually sees at
 * runtime — env-var presence (booleans, never values), the active storage
 * backend, and how many records/published posts the SAME read path used by the
 * public /blog can load. Use it to tell apart "post isn't readable" from
 * "post is readable but the page is a stale ISR cache".
 *
 *   GET /api/admin/health
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(await requireAdminApi(req, res))) return;

  let total = -1;
  let published = -1;
  let readError: string | null = null;
  let sampleSlugs: string[] = [];
  try {
    const records = await loadAllRecords();
    total = records.length;
    const pub = records.filter((r) => r.status === "published");
    published = pub.length;
    sampleSlugs = pub.slice(0, 5).map((r) => r.slug);
  } catch (err) {
    readError = err instanceof Error ? err.message : String(err);
  }

  return res.status(200).json({
    ok: true,
    env: {
      ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
      ADMIN_SESSION_SECRET: Boolean(process.env.ADMIN_SESSION_SECRET),
      BLOB_READ_WRITE_TOKEN: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    },
    storageBackend: usesRemoteBlogStorage() ? "vercel-blob" : "local-disk",
    records: { total, published, sampleSlugs },
    readError,
  });
}
