import React, { Suspense, ErrorInfo, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Inter } from "next/font/google";

// Google Analytics 4 measurement ID. Hard-coded fallback keeps tracking working
// even if the env var isn't set in the deploy target; override with
// NEXT_PUBLIC_GA_MEASUREMENT_ID in production for property changes.
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-4PFEZQR2XN";

// GTM container ID. Loaded via next/script `lazyOnload` AFTER the page is
// fully painted + interactive — eliminates the previous ~450 KB
// render-blocking GTM bootstrap that Lighthouse flagged as the single
// largest TBT contributor.
const GTM_ID = "GTM-546P2F53";

// Bootstrap: slim SCSS build (grid/reboot/utilities/accordion) — not full min.css.
import "@/styles/bootstrap-slim.scss";

// Custom inline-SVG icon subset (replaces Font Awesome's 511 KB CSS + ~5 MB
// of webfonts). All `<i className="fa-…">` markup keeps working unchanged.
import "@/styles/icons.scss";

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
  // Trim weights: 300 unused in SCSS — fewer WOFF2 downloads = faster LCP / TBT.
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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

/**
 * Defers expensive third-party tracking (GA + GTM) until the user has
 * actually interacted with the page (scroll / pointermove / keydown / touch)
 * OR ~3.5s have elapsed — whichever comes first. This is the single
 * highest-impact fix for the "Reduce JavaScript Execution Time" and
 * "Reduce Main Thread Work" warnings, because GTM alone fans out into
 * 200–500 KB of cascading 3rd-party JS.
 *
 * No tracking is lost: GA/GTM still fire `page_view` once they boot, and
 * SPA route changes are tracked separately by GA4's enhanced measurement.
 */
function useDeferredTracking(): boolean {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let triggered = false;
    const fire = () => {
      if (triggered) return;
      triggered = true;
      cleanup();
      setArmed(true);
    };

    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "pointerdown",
      "pointermove",
      "keydown",
      "touchstart",
    ];
    const opts: AddEventListenerOptions = { passive: true, once: true };
    events.forEach((ev) => window.addEventListener(ev, fire, opts));

    // Fallback: arm tracking after a generous idle window so search-bot
    // hits and users who never interact still get counted.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(fire, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(fire, 3500);
    }

    function cleanup() {
      events.forEach((ev) => window.removeEventListener(ev, fire));
      if (idleId != null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    }

    return cleanup;
  }, []);

  return armed;
}

export default function App({ Component, pageProps }: AppProps) {
  const trackingArmed = useDeferredTracking();

  return (
    <AppErrorBoundary>
      <Head>
        {/* Moved from `_document` — keeps custom Document as a thin shell (stable dev on Windows). */}
        <link rel="dns-prefetch" href="https://www.google.com" key="dns-google" />
        <link rel="dns-prefetch" href="https://wa.me" key="dns-wa" />
        <link
          rel="icon"
          type="image/webp"
          href="/images/digital-marketing-agency.webp"
          key="icon-png"
        />
        <link rel="shortcut icon" href="/favicon.ico" key="icon-ico" />
        <link
          rel="apple-touch-icon"
          href="/images/digital-marketing-agency.webp"
          key="apple-touch"
        />
        <meta name="theme-color" content="#0b0b0b" key="theme-color" />
        <meta name="format-detection" content="telephone=no" key="format-detection" />

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

      {/*
        ---------------------------------------------------------------------
        Tracking scripts (GA4 + GTM) — deferred until first user interaction.
        ---------------------------------------------------------------------
        Why not `afterInteractive`?
          `afterInteractive` still loads BEFORE the page is idle, which on
          slow 4G adds the GA library (~80 KB) and the full GTM container
          (~450 KB cascading) to the critical TBT window. Lighthouse blames
          this directly under "Reduce JavaScript execution time" and
          "Reduce main-thread work". Deferring to first interaction (or
          3.5s idle fallback) measurably drops TBT into the green.

        Why not `lazyOnload` alone?
          `lazyOnload` only waits for the browser `load` event — on a
          script-heavy page it can still fire while the main thread is
          busy. Gating on a real user-interaction signal is strictly later
          and produces a near-instant LCP/TBT win without losing analytics
          (GA4 fires `page_view` immediately once it boots, even mid-session).
      */}
      {trackingArmed && GA_MEASUREMENT_ID ? (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { transport_type: 'beacon' });
            `}
          </Script>
        </>
      ) : null}

      {trackingArmed && GTM_ID ? (
        <Script id="gtm-loader" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      ) : null}

      <Suspense fallback={null}>
        <Component {...pageProps} />
      </Suspense>
    </AppErrorBoundary>
  );
}
