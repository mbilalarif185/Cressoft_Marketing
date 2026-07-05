import type { NextApiRequest, NextApiResponse } from "next";

import { getAdminPassword } from "@/lib/admin/auth";
import { buildSessionCookie, createAdminToken } from "@/lib/admin/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const configured = getAdminPassword();
  if (!configured) {
    return res.status(503).json({
      ok: false,
      message: "Admin login is not configured on this server.",
    });
  }

  const body = (req.body ?? {}) as { password?: string };
  const password = typeof body.password === "string" ? body.password : "";
  if (!password || password !== configured) {
    return res.status(401).json({ ok: false, message: "Invalid password." });
  }

  try {
    const token = await createAdminToken();
    res.setHeader("Set-Cookie", buildSessionCookie(token));
  } catch {
    return res.status(503).json({
      ok: false,
      message: "Session secret is not configured (ADMIN_SESSION_SECRET).",
    });
  }

  return res.status(200).json({ ok: true });
}