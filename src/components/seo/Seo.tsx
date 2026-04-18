import React from "react";
import Head from "next/head";
import {
  buildPageSeo,
  PageSeoInput,
  SITE_NAME,
  SITE_LOCALE,
  webPageSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo";

type SeoProps = PageSeoInput & {
  /** Optional breadcrumb trail; first item should be the page itself's parent. */
  breadcrumbs?: { name: string; url: string }[];
  /** Extra JSON-LD blocks (already parsed objects, not strings). */
  jsonLd?: object | object[];
  /** Children rendered inside <Head>, e.g. extra <link>/<meta>. */
  children?: React.ReactNode;
};

const stringify = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * Drop-in `<Seo>` for any page. Renders:
 *   - <title>, <meta description / keywords>
 *   - canonical link (https://cressoft.net/<path>)
 *   - Open Graph + Twitter cards
 *   - WebPage + (optional) BreadcrumbList JSON-LD
 *
 * Site-wide schemas (Organization, LocalBusiness, WebSite) live in _app.tsx
 * so we don't ship them on every page payload.
 */
const Seo: React.FC<SeoProps> = ({ breadcrumbs, jsonLd, children, ...input }) => {
  const seo = buildPageSeo(input);
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const webPage = webPageSchema({
    title: seo.fullTitle,
    description: seo.description,
    url: seo.url,
  });

  const crumbs =
    breadcrumbs && breadcrumbs.length
      ? breadcrumbSchema(breadcrumbs)
      : null;

  const extra = Array.isArray(jsonLd)
    ? jsonLd
    : jsonLd
    ? [jsonLd]
    : [];

  return (
    <Head>
      <title>{seo.fullTitle}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      )}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />

      <link rel="canonical" href={seo.url} />

      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.fullTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.fullTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.imageAlt} />

      {/* Geo hints help Google associate the site with Malaysia. */}
      <meta name="geo.region" content="MY-10" />
      <meta name="geo.placename" content="Kota Damansara, Selangor, Malaysia" />
      <meta name="geo.position" content="3.1559;101.5853" />
      <meta name="ICBM" content="3.1559, 101.5853" />

      <link rel="alternate" hrefLang="en-MY" href={seo.url} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL + "/"} />

      <script
        type="application/ld+json"
        key="webpage-jsonld"
        dangerouslySetInnerHTML={{ __html: stringify(webPage) }}
      />
      {crumbs && (
        <script
          type="application/ld+json"
          key="breadcrumb-jsonld"
          dangerouslySetInnerHTML={{ __html: stringify(crumbs) }}
        />
      )}
      {extra.map((data, i) => (
        <script
          type="application/ld+json"
          key={`page-jsonld-${i}`}
          dangerouslySetInnerHTML={{ __html: stringify(data) }}
        />
      ))}

      {children}
    </Head>
  );
};

export default Seo;
