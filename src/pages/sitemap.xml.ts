import type { GetServerSideProps } from "next";
import { getAllPostMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

/**
 * Static, indexable routes. Anything that should appear in Google's
 * sitemap should be listed here. Dynamic routes (e.g. /blog/[slug])
 * are appended below.
 */
const STATIC_ROUTES: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0 },
  { loc: "/about-us", changefreq: "monthly", priority: 0.9 },
  { loc: "/marketing-solutions", changefreq: "monthly", priority: 0.95 },
  { loc: "/success-stories", changefreq: "monthly", priority: 0.8 },
  { loc: "/portfolio", changefreq: "monthly", priority: 0.7 },
  { loc: "/our-story", changefreq: "monthly", priority: 0.6 },
  { loc: "/blog", changefreq: "daily", priority: 0.9 },
  { loc: "/faq", changefreq: "monthly", priority: 0.6 },
  { loc: "/contact", changefreq: "monthly", priority: 0.8 },
  { loc: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { loc: "/terms-and-conditions", changefreq: "yearly", priority: 0.3 },
];

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildXml = (entries: SitemapEntry[]) => {
  const urls = entries
    .map((e) => {
      const lines = [
        `    <loc>${escapeXml(e.loc)}</loc>`,
        e.lastmod && `    <lastmod>${e.lastmod}</lastmod>`,
        e.changefreq && `    <changefreq>${e.changefreq}</changefreq>`,
        e.priority !== undefined && `    <priority>${e.priority.toFixed(2)}</priority>`,
      ]
        .filter(Boolean)
        .join("\n");
      return `  <url>\n${lines}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().slice(0, 10);

  const blogEntries: SitemapEntry[] = getAllPostMeta().map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: "monthly",
    priority: 0.6,
  }));

  const entries: SitemapEntry[] = [
    ...STATIC_ROUTES.map((r) => ({
      ...r,
      loc: `${SITE_URL}${r.loc === "/" ? "/" : r.loc}`,
      lastmod: today,
    })),
    ...blogEntries,
  ];

  const xml = buildXml(entries);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(xml);
  res.end();

  return { props: {} };
};

const Sitemap = () => null;
export default Sitemap;
