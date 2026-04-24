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
  WebPageType,
} from "@/lib/seo";

type SeoProps = PageSeoInput & {
  /** Optional breadcrumb trail; first item should be the page itself's parent. */
  breadcrumbs?: { name: string; url: string }[];
  /** Extra JSON-LD blocks (already parsed objects, not strings). */
  jsonLd?: object | object[];
  /**
   * Override the default `WebPage` JSON-LD `@type` for pages that map to a
   * more specific Schema.org subtype (AboutPage, ContactPage, FAQPage,
   * CollectionPage, Blog, etc.).
   */
  webPageType?: WebPageType;
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
const Seo: React.FC<SeoProps> = ({
  breadcrumbs,
  jsonLd,
  webPageType,
  children,
  ...input
}) => {
  const seo = buildPageSeo(input);
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const webPage = webPageSchema({
    title: seo.fullTitle,
    description: seo.description,
    url: seo.url,
    type: webPageType,
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
      {/*
       * IMPORTANT: every tag below MUST carry a `key` that matches the
       * corresponding default in `_app.tsx`. next/head only deduplicates
       * <meta>/<link>/<script> tags when the keys match — otherwise the
       * default from _app.tsx wins (e.g. you keep seeing DEFAULT_TITLE in
       * the browser tab even though <Seo> "rendered" a new <title>).
       */}
      <title key="title">{seo.fullTitle}</title>
      <meta name="description" content={seo.description} key="description" />
      {seo.keywords.length > 0 && (
        <meta
          name="keywords"
          content={seo.keywords.join(", ")}
          key="keywords"
        />
      )}
      <meta name="robots" content={robots} key="robots" />
      <meta name="googlebot" content={robots} key="googlebot" />

      <link rel="canonical" href={seo.url} key="canonical" />

      <meta property="og:type" content={seo.type} key="og:type" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:locale" content={SITE_LOCALE} key="og:locale" />
      <meta property="og:url" content={seo.url} key="og:url" />
      <meta property="og:title" content={seo.fullTitle} key="og:title" />
      <meta
        property="og:description"
        content={seo.description}
        key="og:description"
      />
      <meta property="og:image" content={seo.image} key="og:image" />
      <meta property="og:image:alt" content={seo.imageAlt} key="og:image:alt" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta
        name="twitter:title"
        content={seo.fullTitle}
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={seo.description}
        key="twitter:description"
      />
      <meta
        name="twitter:image"
        content={seo.image}
        key="twitter:image"
      />
      <meta
        name="twitter:image:alt"
        content={seo.imageAlt}
        key="twitter:image:alt"
      />

      {/* Geo hints help Google associate the site with Malaysia. */}
      <meta name="geo.region" content="MY-10" key="geo.region" />
      <meta
        name="geo.placename"
        content="Kota Damansara, Selangor, Malaysia"
        key="geo.placename"
      />
      <meta
        name="geo.position"
        content="3.1559;101.5853"
        key="geo.position"
      />
      <meta name="ICBM" content="3.1559, 101.5853" key="icbm" />

      <link
        rel="alternate"
        hrefLang="en-MY"
        href={seo.url}
        key="hreflang-en-my"
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={SITE_URL + "/"}
        key="hreflang-x-default"
      />

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
