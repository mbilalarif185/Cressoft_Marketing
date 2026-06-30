import type { GetServerSideProps } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Dynamic /robots.txt — tells crawlers what they may index and, crucially,
 * advertises the sitemap so search engines can discover every indexable URL.
 *
 * Served via getServerSideProps (Pages Router) for parity with feed.xml.ts,
 * so the canonical SITE_URL (env-overridable) is always used. The sitemap
 * itself is a static file at public/sitemap.xml. Cache headers for this path
 * are set in next.config.js.
 */
const buildRobots = () =>
  [
    "User-agent: *",
    "Allow: /",
    // Keep API + Next internals out of the index.
    "Disallow: /api/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = buildRobots();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=86400"
  );
  res.write(body);
  res.end();
  return { props: {} };
};

const Robots = () => null;
export default Robots;
