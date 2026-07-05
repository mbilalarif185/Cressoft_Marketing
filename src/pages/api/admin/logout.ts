import type { NextApiRequest, NextApiResponse } from "next";

import { buildClearedSessionCookie } from "@/lib/admin/session";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }
  res.setHeader("Set-Cookie", buildClearedSessionCookie());
  return res.status(200).json({ ok: true });
}