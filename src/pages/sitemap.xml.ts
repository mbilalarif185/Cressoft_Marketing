import type { GetServerSideProps } from "next";

import { getAllPostMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

/**
 * Dynamic /sitemap.xml.
 *
 * Static marketing/service/geo routes are listed explicitly below (carried over
 * verbatim from the former hand-maintained public/sitemap.xml, preserving each
 * URL's lastmod/priority/changefreq). Blog posts are generated at request time
 * from getAllPostMeta() — which merges MDX files and PUBLISHED CMS records — so
 * posts published via the admin CMS appear automatically without editing this
 * file.
 *
 * Posts flagged `noindex` are excluded here (Fix 3C): a noindexed post keeps its
 * `noindex, nofollow` robots meta on the page AND drops out of the sitemap, with
 * no manual step. Served via getServerSideProps for parity with feed.xml.ts /
 * robots.txt.ts; cache headers also set in next.config.js.
 */

type StaticRoute = {
  /** Path relative to the site root, e.g. "/services". "/" for the homepage. */
  path: string;
  /** W3C datetime string for <lastmod>. */
  lastmod: string;
  /** 0.0–1.0 crawl priority. */
  priority: string;
  /** Optional <changefreq> hint. */
  changefreq?: string;
};

// Non-blog routes. Blog URLs are appended dynamically below.
const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", lastmod: "2026-06-30T17:40:39+00:00", priority: "1.00" },
  { path: "/about-us", lastmod: "2026-06-30T17:40:31+00:00", priority: "0.80" },
  {
    path: "/services",
    lastmod: "2026-07-11T00:00:00+00:00",
    priority: "0.90",
    changefreq: "monthly",
  },
  {
    path: "/success-stories",
    lastmod: "2026-06-30T17:40:31+00:00",
    priority: "0.80",
  },
  { path: "/blog", lastmod: "2026-06-30T17:40:39+00:00", priority: "0.80" },
  { path: "/contact", lastmod: "2026-06-30T17:40:32+00:00", priority: "0.80" },
  {
    path: "/services/saas-development",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/white-label-solutions",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/ai-automation",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/web-development",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/seo",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/social-media-marketing",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/mobile-app-development",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/ecommerce-solutions",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/erp-solutions",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  {
    path: "/services/ui-ux-design",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.80",
  },
  { path: "/faq", lastmod: "2026-06-30T17:40:37+00:00", priority: "0.80" },
  {
    path: "/privacy-policy",
    lastmod: "2026-06-30T17:40:37+00:00",
    priority: "0.80",
  },
  {
    path: "/terms-and-conditions",
    lastmod: "2026-06-30T17:40:37+00:00",
    priority: "0.80",
  },
  {
    path: "/services/custom-software",
    lastmod: "2026-06-30T17:40:39+00:00",
    priority: "0.64",
  },
  {
    path: "/uk",
    lastmod: "2026-07-02T00:00:00+00:00",
    priority: "0.80",
    changefreq: "monthly",
  },
  {
    path: "/usa",
    lastmod: "2026-07-02T00:00:00+00:00",
    priority: "0.80",
    changefreq: "monthly",
  },
  {
    path: "/uae",
    lastmod: "2026-07-02T00:00:00+00:00",
    priority: "0.80",
    changefreq: "monthly",
  },
  {
    path: "/usa/saas-development",
    lastmod: "2026-07-09T00:00:00+00:00",
    priority: "0.90",
    changefreq: "monthly",
  },
  {
    path: "/usa/ai-automation",
    lastmod: "2026-07-09T00:00:00+00:00",
    priority: "0.90",
    changefreq: "monthly",
  },
  {
    path: "/usa/white-labelling",
    lastmod: "2026-07-09T00:00:00+00:00",
    priority: "0.90",
    changefreq: "monthly",
  },
  {
    path: "/usa/web-development",
    lastmod: "2026-07-09T00:00:00+00:00",
    priority: "0.90",
    changefreq: "monthly",
  },
];

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const loc = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

const urlEntry = (route: StaticRoute) => {
  const changefreq = route.changefreq
    ? `\n  <changefreq>${route.changefreq}</changefreq>`
    : "";
  return `<url>
  <loc>${escapeXml(loc(route.path))}</loc>
  <lastmod>${route.lastmod}</lastmod>${changefreq}
  <priority>${route.priority}</priority>
</url>`;
};

const buildSitemap = async () => {
  const posts = await getAllPostMeta();

  // Fix 3C: keep only indexable posts out of the sitemap.
  const indexablePosts = posts.filter((p) => !p.noindex);

  const blogRoutes: StaticRoute[] = indexablePosts.map((p) => ({
    path: `/blog/${p.slug}`,
    lastmod: p.date,
    priority: "0.80",
    changefreq: "weekly",
  }));

  const entries = [...STATIC_ROUTES, ...blogRoutes].map(urlEntry).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await buildSitemap();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(xml);
  res.end();
  return { props: {} };
};

const SitemapPage = () => null;
export default SitemapPage;
