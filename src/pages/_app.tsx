import React, { Suspense, ErrorInfo } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";

// bootstrap (still used for grid + utility classes across hundreds of JSX nodes)
import "bootstrap/dist/css/bootstrap.min.css";

// Custom inline-SVG icon subset (replaces Font Awesome's 511 KB CSS + ~5 MB
// of webfonts). All `<i className="fa-…">` markup keeps working unchanged.
import "@/styles/icons.scss";

// custom icons (Glyphter — small, brand-specific glyph set)
import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from "@/lib/seo";

// Inter — self-hosted via next/font. Replaces the previous
// `@import url('https://fonts.googleapis.com/...')` in SCSS, which was
// render-blocking, blocked the LCP paint, and required a third-party
// connection to fonts.googleapis.com / fonts.gstatic.com.
//
// `display: swap` avoids FOIT, `preload` ensures the font file ships in the
// initial document, and the `--font-inter` CSS variable is consumed by
// `--inter` in src/styles/abstracts/_variables.scss.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

// Build the global font CSS once at module-load. Using a plain inline <style>
// (not <style jsx global>) is intentional: styled-jsx in _app.tsx with
// dynamic interpolation generates a per-render style hash that cannot be
// hot-replaced, which forces Fast Refresh into a "full reload on every
// render" loop. A static <style> tag avoids that entirely.
const FONT_GLOBAL_CSS = `:root,html,body{--font-inter:${inter.style.fontFamily};font-family:var(--font-inter);}`;

// Pre-stringify site-wide JSON-LD once. The schemas don't change between
// renders, so doing this at module init keeps each render allocation-free.
const stringifySchema = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const SITE_WIDE_SCHEMA_HTML = [
  organizationSchema(),
  localBusinessSchema(),
  websiteSchema(),
].map(stringifySchema);

type ErrorBoundaryState = { hasError: boolean };

class AppErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: "1.25rem" }}>Something went wrong</h1>
          <p style={{ marginTop: 8, color: "#444" }}>
            Refresh the page. On the dev server, a restart can clear a stuck
            client bundle after hot reload.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppErrorBoundary>
      <Head>
        {/* Defaults — every page is expected to override <title> and <meta description> via <Seo>. */}
        <meta
          httpEquiv="X-UA-Compatible"
          content="ie=edge"
          key="x-ua-compatible"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          key="viewport"
        />
        <title key="title">{DEFAULT_TITLE}</title>
        <meta
          name="description"
          content={DEFAULT_DESCRIPTION}
          key="description"
        />

        {/* Promote the next/font CSS variable to the document root so global
            SCSS (which reads `var(--font-inter)` via the `--inter` token)
            resolves on every page. Static <style> — see comment above
            FONT_GLOBAL_CSS for why this isn't <style jsx global>. */}
        <style
          key="font-global"
          dangerouslySetInnerHTML={{ __html: FONT_GLOBAL_CSS }}
        />

        {/* Site-wide JSON-LD: Organization, LocalBusiness, WebSite. Page-specific
            schemas (WebPage, BreadcrumbList, BlogPosting, Service…) live in
            their pages via <Seo />. */}
        {SITE_WIDE_SCHEMA_HTML.map((html, i) => (
          <script
            type="application/ld+json"
            key={`global-jsonld-${i}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </Head>
      <Suspense fallback={null}>
        <Component {...pageProps} />
      </Suspense>
    </AppErrorBoundary>
  );
}
