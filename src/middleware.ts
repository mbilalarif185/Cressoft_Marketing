import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getAdminCookieName, verifyAdminToken } from "@/lib/admin/session";

/**
 * Combined middleware:
 *
 * 1) Blog-admin route guard — protects `/admin/*` and `/api/admin/*` with the
 *    signed session cookie. Runs in BOTH dev and prod (before the dev-only
 *    cache logic below). The login screen + login endpoint are exempt so the
 *    sign-in flow can mint the cookie.
 *
 * 2) Dev-only `no-store` (original behaviour) — forces fresh responses in
 *    development to avoid stale HMR chunks / hydration drift. Production keeps
 *    caching as configured.
 */

const ADMIN_COOKIE = getAdminCookieName();

async function isAuthed(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    const isLogin =
      pathname === "/admin/login" || pathname === "/api/admin/login";

    if (!isLogin && !(await isAuthed(request))) {
      if (isAdminApi) {
        return NextResponse.json(
          { ok: false, message: "Unauthorized." },
          { status: 401 },
        );
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Authenticated admin requests skip the dev cache tweak below.
    return NextResponse.next();
  }

  // ---- Dev-only no-store (unchanged from the original middleware) ----
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.next();
  }
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate, max-age=0");
  res.headers.set("Pragma", "no-cache");
  return res;
}

export const config = {
  // Skip `/_next/*` and common static files — `next.config.js` already applies
  // dev `no-store` to `/_next`; running middleware on chunk/HMR paths is
  // unnecessary. This matcher still covers `/admin/*` and `/api/admin/*`.
  matcher: [
    "/((?!_next/|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff2?)$).*)",
  ],
};
