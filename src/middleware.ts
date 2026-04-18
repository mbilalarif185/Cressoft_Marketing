import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Dev-only: force `no-store` on (almost) every response.
 *
 * 1) `/_next/*` — webpack-dev-middleware + HMR (`*.webpack.hot-update.json`).
 *    `next.config.js` headers() often do not apply here; stale runtime →
 *    hot-update 404 loops + Fast Refresh full reloads.
 *
 * 2) Page HTML (`/`, `/about-us`, …) — if the document is cached but client
 *    chunks update (or vice versa), SSR markup can disagree with the JS bundle
 *    React hydrates with → “Hydration failed” (e.g. old `tel:` vs new phone).
 *
 * Production: noop (first line returns) so caching stays as configured.
 */
export function middleware(_request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.next();
  }
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate, max-age=0");
  res.headers.set("Pragma", "no-cache");
  return res;
}

export const config = {
  matcher: [
    "/",
    "/:path*",
  ],
};
