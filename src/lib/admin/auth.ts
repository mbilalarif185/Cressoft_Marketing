import type { NextApiRequest, NextApiResponse } from "next";

import { getAdminCookieName, verifyAdminToken } from "@/lib/admin/session";

export function getAdminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length >= 8 ? password : null;
}

/**
 * API-route auth gate (Pages Router). Returns `true` when the request may
 * proceed; otherwise it writes the appropriate error response and returns
 * `false`. Call at the top of every admin API handler:
 *
 *   if (!(await requireAdminApi(req, res))) return;
 */
export async function requireAdminApi(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<boolean> {
  if (!getAdminPassword()) {
    res.status(503).json({
      ok: false,
      message:
        "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
    });
    return false;
  }

  const token = req.cookies[getAdminCookieName()];
  if (!token || !(await verifyAdminToken(token))) {
    res.status(401).json({ ok: false, message: "Unauthorized." });
    return false;
  }

  return true;
}