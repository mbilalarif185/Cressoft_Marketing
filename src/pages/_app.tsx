import React, { Suspense, ErrorInfo, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";

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

/**
 * Google Consent Mode v2 defaults, denying the advertising storage types.
 *
 * WHY: with ad storage allowed, the GA4 tag fires a `ga-audiences`
 * remarketing ping to the visitor's OWN country Google domain —
 * www.google.co.uk, www.google.ae, www.google.com.pk, one of roughly 190.
 * CSP has no TLD wildcard, so that set cannot be allowlisted, and GA4 sends
 * the ping as an image or a fetch depending on context — permitting it would
 * mean opening both `img-src` and `connect-src` to a bare `https:`, gutting
 * the exfiltration protection the CSP exists to provide. Left blocked, each
 * attempt logs a console error and fails two Lighthouse Best-Practices
 * audits for every visitor outside a .com region.
 *
 * Consent Mode removes the request at the source instead of arguing with it
 * downstream. It is also the only lever that works here: setting
 * `allow_google_signals: false` on our own `gtag('config', …)` does not
 * reach the GA4 configuration tag that lives inside the GTM container, and
 * the ping kept firing. Consent state applies to every Google tag the
 * container loads.
 *
 * `analytics_storage` stays granted, so this changes nothing about ordinary
 * measurement — sessions, page views, events, conversions and attribution
 * all continue. What stops is advertising/remarketing audience building,
 * which for a London-headquartered company under UK GDPR is a defensible
 * default to ship without a consent banner.
 *
 * If a consent banner is added later, call
 * `gtag('consent', 'update', { ad_storage: 'granted', … })` on acceptance —
 * the defaults below are exactly the "before consent" state such a banner
 * expects to find. Note `wait_for_update` is 0 because there is no banner to
 * wait for yet; a banner would need a few hundred ms here.
 */
const CONSENT_DEFAULTS = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (!window.__qsConsentInit) {
  window.__qsConsentInit = 1;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
    wait_for_update: 0
  });
  gtag('set', 'ads_data_redaction', true);
}
`;

// Bootstrap: slim SCSS build (grid/reboot/utilities/accordion) — not full min.css.
import "@/styles/bootstrap-slim.scss";

import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

// Icon styles load after main.scss so mask rules win the cascade over theme
// partials. FA webfont faces below cover legacy SCSS pseudo-element glyphs.
import "@/styles/icons.scss";
import "@/styles/fa-font-compat.scss";

// NOTE: the blog-admin markdown editor's CSS is deliberately NOT imported
// here. Importing it from _app (the only place the Pages Router permits a
// global CSS import) welded ~56 KB of editor chrome onto the single
// render-blocking site-wide stylesheet that every public page loads — for a
// component that only mounts on /admin/posts/* behind an auth cookie.
// It is now served from public/vendor/mdxeditor.css and <link>-ed in by
// src/components/admin/MdxEditor.tsx when the editor actually mounts.
// See scripts/sync-editor-css.mjs (wired to prebuild/predev).

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

// Sora — distinctive geometric grotesque used for display headings. Pairs a
// characterful, premium-feeling display face with Inter's clean body text for
// an enterprise-SaaS look (à la Linear / Vercel) without generic "AI slop".
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-display",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
});

// Build the global font CSS once at module-load. Using a plain inline <style>
// (not <style jsx global>) is intentional: styled-jsx in _app.tsx with
// dynamic interpolation generates a per-render style hash that cannot be
// hot-replaced, which forces Fast Refresh into a "full reload on every
// render" loop. A static <style> tag avoids that entirely.
const FONT_GLOBAL_CSS = `:root,html,body{--font-inter:${inter.style.fontFamily};--font-display:${sora.style.fontFamily};font-family:var(--font-inter);}`;

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
          type="image/svg+xml"
          href="/favicon.svg"
          key="icon-svg"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" key="icon-ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
          key="icon-png"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          key="apple-touch"
        />
        <meta name="theme-color" content="#faf6ef" key="theme-color" />
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
          {/*
            `allow_google_signals` / `allow_ad_personalization_signals` are
            OFF deliberately. With them on, GA4 fires a `ga-audiences`
            remarketing ping to the visitor's own country Google domain —
            www.google.co.uk, www.google.ae, www.google.com.pk, one of ~190.
            CSP has no TLD wildcard, so no allowlist can cover that set, and
            GA4 sends it as an image OR a fetch depending on context: making
            it work would mean opening BOTH img-src and connect-src to a bare
            `https:`, which is precisely the exfiltration protection a CSP
            exists to provide. Every blocked attempt also logs a console
            error, failing two Lighthouse Best-Practices audits for every
            visitor outside a .com region.

            Switching the signals off removes the request at the source: the
            CSP stays strict, the console stays clean, and — for a
            London-headquartered company under UK GDPR — not shipping
            advertising identifiers by default is the safer posture anyway.

            WHAT IS LOST: GA4 stops building remarketing / advertising
            audiences and demographic reports. Ordinary analytics — sessions,
            page views, events, conversions, attribution — are unaffected.

            TO RE-ENABLE: delete these two lines, and add to next.config.js
            `img-src` AND `connect-src` the Google domains your audience
            actually resolves to (at minimum https://www.google.com plus each
            target-market ccTLD), accepting a console error for any visitor
            outside that list. Note this only governs the GA4 tag configured
            here — a Google Ads remarketing tag added inside the GTM
            container would fire independently of this setting.
          */}
          <Script id="ga-init" strategy="lazyOnload">
            {`${CONSENT_DEFAULTS}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                transport_type: 'beacon',
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      ) : null}

      {trackingArmed && GTM_ID ? (
        <Script id="gtm-loader" strategy="lazyOnload">
          {`${CONSENT_DEFAULTS}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
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
