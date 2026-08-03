/** @type {import('next').NextConfig} */
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
    // Bootstrap 5.3 SCSS triggers Dart Sass deprecations in `vendor/_rfs.scss` (abs + %).
    // Those files load via includePaths → treated as deps; silence until Bootstrap updates.
    quietDeps: true,
    // `@import` is deprecated (Dart Sass 3.0). Our theme + Bootstrap 5.3 still use it;
    // migrating `main.scss` alone would break mixin visibility across partials. Silence
    // until a full `@use`/`@forward` pass (or Bootstrap ships module-first SCSS).
    silenceDeprecations: ['import', 'legacy-js-api'],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // The blog-admin markdown editor (@uiw/react-md-editor) imports CSS from
  // within its own node_modules ESM files. The Pages Router blocks global CSS
  // imports from node_modules unless the package is transpiled by Next, so we
  // opt these two packages in. Only loaded on /admin/posts/* (ssr:false).
  transpilePackages: ['@uiw/react-md-editor', '@uiw/react-markdown-preview'],

  compiler: {
    removeConsole: isProd,
  },

  trailingSlash: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 120, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'quantel.uk' },
      { protocol: 'https', hostname: 'www.quantel.uk' },
      // Vercel Blob-hosted blog images (featured / OG uploads). Blob public
      // URLs look like https://<store-id>.public.blob.vercel-storage.com/...
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },

  // Production-only: fewer resolver round-trips; skip in dev to avoid extra
  // rebuild surface during HMR (swiper/gsap are mostly used in lazy/dynamic paths).
  //
  // `optimizePackageImports` rewrites named imports from these packages so
  // Next.js can tree-shake away the modules we don't actually use. Swiper
  // matters most here — `import { Autoplay } from 'swiper/modules'` would
  // otherwise pull the full barrel (~50 KB of unused Pagination/Scrollbar/
  // Mousewheel/EffectFade/EffectCube/etc. into every Swiper-using chunk).
  // GSAP gets the same treatment so unused easings/utilities drop out.
  //
  // Note: we deliberately do NOT use `modularizeImports` to remap
  // `swiper/modules` to per-file deep paths (e.g. `swiper/modules/autoplay`)
  // because Swiper's `package.json#exports` only declares `./modules` —
  // deep paths would error out under Node's strict ESM resolver.
  experimental: isProd
    ? {
        optimizePackageImports: [
          'swiper',
          'swiper/modules',
          'swiper/react',
          'gsap',
        ],

        // Critical-CSS inlining (Next runs `critters` over the rendered HTML
        // in `server/post-process`). Two blocking <link rel="stylesheet">
        // elements sat in <head>, and Lighthouse attributed ~650 ms of
        // render-blocking time to them. Critters rewrites that to:
        //   • a <style> block of just the rules matching above-the-fold
        //     markup, inlined in <head>, and
        //   • the original sheets as `rel="preload" as="style"` +
        //     `onload="this.media='all'"` — i.e. the preload/swap-media
        //     pattern, so the full CSS lands without blocking first paint.
        //
        // Because this runs at render time rather than build time it stays
        // correct for the ISR pages (`revalidate: 3600`), which regenerate
        // their HTML after the build has finished.
        //
        // `fonts: false` (Next's default) is kept: next/font already
        // self-hosts and preloads the faces, so letting critters touch them
        // would only duplicate work.
        optimizeCss: {
          // Override Next's default `preload: 'media'`.
          //
          // In 'media' mode critters rewrites the link to
          // `media="print" onload="this.media='all'"` and THEN clones it into
          // the <noscript> fallback — attributes included. With JS disabled
          // the onload never fires, so that fallback stays `media="print"`
          // and the page renders with critical CSS only. 'js' mode builds the
          // noscript clone *before* it touches the link (see the
          // `updateLinkToPreload` ordering in critters/dist/critters.js), so
          // the fallback is a clean `rel="stylesheet"`. Same non-blocking
          // load for everyone else, minus the no-JS regression.
          preload: 'js',
          noscriptFallback: true,
          // next/font already self-hosts and preloads every face; letting
          // critters inline them again would just duplicate bytes.
          inlineFonts: false,
          // Keep the full stylesheet intact behind the async load — the
          // inlined block is above-the-fold only, and scripts/purge-css.mjs
          // is what trims the remainder.
          pruneSource: false,
        },
      }
    : {},

  async headers() {
    const longCache = 'public, max-age=31536000, immutable'
    const devNoStore = 'no-store, must-revalidate'

    // ---------------------------------------------------------------------
    // Content-Security-Policy
    // ---------------------------------------------------------------------
    // Every page here is statically generated (getStaticProps + ISR), so the
    // HTML is produced once at build time and replayed from cache. A
    // per-request nonce is therefore impossible without converting the whole
    // site to SSR — the nonce baked into the HTML would not match the one in
    // the header on any subsequent hit. That rules out the
    // `'nonce-…' 'strict-dynamic'` form Lighthouse's (informational) csp-xss
    // audit prefers, so `script-src` keeps `'unsafe-inline'`.
    //
    // What this policy still buys, all of which are real XSS/injection
    // mitigations independent of the inline-script caveat:
    //   • `object-src 'none'`   — kills <object>/<embed> plugin injection,
    //                             a classic CSP bypass vector.
    //   • `base-uri 'self'`     — stops an injected <base> from re-pointing
    //                             every relative script URL at an attacker.
    //   • `frame-ancestors`     — clickjacking defence that actually applies
    //                             to modern browsers (X-Frame-Options below
    //                             is the legacy fallback).
    //   • `form-action`         — an injected <form> cannot exfiltrate to a
    //                             third-party origin.
    //   • host allowlists       — script/connect/frame are limited to self +
    //                             the Google tag endpoints we actually use.
    //
    // `'unsafe-eval'` is deliberately NOT granted. GTM only needs it for
    // Custom HTML/JS tags; if the container starts using one, that tag will
    // break loudly rather than silently widening the policy.
    const googleTag = [
      'https://www.googletagmanager.com',
      'https://*.googletagmanager.com',
    ]

    // NOTE ON THE APEX HOSTS BELOW: a CSP `*.example.com` source does NOT
    // match `example.com`. GA4 posts its `/g/collect` beacon to the apex
    // `analytics.google.com`, so listing only `*.analytics.google.com`
    // silently blocked every hit — verified against a real browser run, not
    // assumed. Each entry here corresponds to traffic actually observed.
    const googleAnalytics = [
      'https://www.google-analytics.com',
      'https://*.google-analytics.com',
      'https://analytics.google.com',
      'https://*.analytics.google.com',
    ]

    // Google Signals / remarketing endpoints. GA4 only contacts these when
    // Signals is enabled on the property; they are separate from the core
    // analytics beacon above.
    //
    // CAVEAT: for users outside the US, GA4 sends the `ga-audiences` pixel to
    // their *regional* Google domain (www.google.co.uk, www.google.com.pk,
    // …). CSP has no TLD wildcard, so those regional variants stay blocked
    // and will log a console error for those visitors. Two ways to close
    // that gap if it matters: enumerate the country domains your audience
    // actually uses, or turn off Signals/remarketing in the GA4 property.
    // Left un-enumerated deliberately — an open-ended TLD allowlist would
    // undercut the point of having a CSP.
    const googleSignals = [
      'https://www.google.com',
      'https://stats.g.doubleclick.net',
      'https://*.g.doubleclick.net',
    ]

    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' is required for the JSON-LD blocks, the next/font
      // variable <style>, and the next/script GA + GTM bootstraps. See above
      // for why a nonce is not an option on a fully static build.
      `script-src 'self' 'unsafe-inline' ${googleTag.join(' ')} ${googleAnalytics.join(' ')}`,
      // Ditto for styles: next/font injects an inline <style>, and Bootstrap
      // utility components set inline style attributes.
      "style-src 'self' 'unsafe-inline'",
      // data: for inlined SVG/placeholder payloads, blob: for the admin
      // editor's local previews, plus the Vercel Blob store the blog uploads
      // to and the Google tag's tracking pixels.
      // data: for inlined SVG/placeholder payloads, blob: for the admin
      // editor's local previews, plus the Vercel Blob store the blog uploads
      // to and the Google tag's tracking pixels.
      //
      // This stays a strict allowlist rather than a bare `https:`. The one
      // request that needed more was GA4's `ga-audiences` remarketing ping,
      // which targets the visitor's own country Google domain (~190 possible
      // hosts, un-allowlistable) — that is switched off at the source in
      // _app.tsx instead. See the note there before re-enabling it.
      `img-src 'self' data: blob: https://*.public.blob.vercel-storage.com ${googleTag.join(' ')} ${googleAnalytics.join(' ')} ${googleSignals.join(' ')}`,
      // next/font self-hosts every face, so no third-party font origin.
      "font-src 'self' data:",
      `connect-src 'self' https://*.public.blob.vercel-storage.com ${googleTag.join(' ')} ${googleAnalytics.join(' ')} ${googleSignals.join(' ')}`,
      // Two framed third parties:
      //   • the GTM <noscript> fallback iframe in _document.tsx, and
      //   • the Google Maps office-location embed on /contact, which loads
      //     from https://www.google.com/maps?...&output=embed (see
      //     CONTACT_MAP_EMBED_URL in src/constants/contact.ts).
      // The Maps host was missing from the first version of this policy and
      // the map silently failed to render — caught by a browser pass over
      // every route rather than by reading the config.
      `frame-src 'self' https://www.google.com https://maps.google.com ${googleTag.join(' ')}`,
      "media-src 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      // `upgrade-insecure-requests` is deliberately omitted. The HSTS header
      // below (max-age 2y, includeSubDomains, preload) already forces https
      // for this origin, and every third-party source in this policy is
      // pinned to an https:// URL — so the directive would be a no-op in
      // production. What it *does* do is rewrite same-origin requests to
      // https on a plain-http origin, which breaks `next start` on
      // http://localhost (Next's route prefetches turn into failed https
      // requests). Removing it costs no real protection and keeps a local
      // production build honestly testable.
    ].join('; ')

    const prodAssetCache = isProd
      ? [
          {
            source: '/_next/static/:path*',
            headers: [{ key: 'Cache-Control', value: longCache }],
          },
          {
            source: '/_next/image',
            headers: [{ key: 'Cache-Control', value: longCache }],
          },
          {
            source:
              '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|woff|woff2|ttf|otf|mp4)',
            headers: [{ key: 'Cache-Control', value: longCache }],
          },
        ]
      : [
          {
            source: '/_next/:path*',
            headers: [{ key: 'Cache-Control', value: devNoStore }],
          },
        ]

    return [
      ...prodAssetCache,
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Severs the window.opener relationship with any cross-origin
          // document that opens us (and vice-versa), which is what
          // Lighthouse's `origin-isolation` Best-Practices audit checks for.
          // Nothing on the site relies on cross-origin popup messaging —
          // the WhatsApp / social links are plain target="_blank"
          // navigations, which keep working (they just get opener = null,
          // itself the recommended hardening).
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // Blocks other origins from embedding our responses as
          // no-cors subresources. `same-site` rather than `same-origin` so
          // the Vercel preview/prod host pair keeps working.
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          ...(isProd
            ? [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
              ]
            : []),
        ],
      },
      ...(isProd
        ? [
            {
              source: '/sitemap.xml',
              headers: [
                {
                  key: 'Cache-Control',
                  value:
                    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
                },
                {
                  key: 'Content-Type',
                  value: 'application/xml; charset=utf-8',
                },
              ],
            },
            {
              source: '/robots.txt',
              headers: [
                { key: 'Cache-Control', value: 'public, max-age=86400' },
              ],
            },
          ]
        : []),
    ]
  },

  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      // Removed stale theme demo pages (Lorem Ipsum content). 301 their
      // previously-indexed URLs to the closest real pages so inbound links and
      // search-engine equity are preserved instead of hitting a 404.
      { source: '/service-single', destination: '/services', permanent: true },
      { source: '/project-single', destination: '/success-stories', permanent: true },
      // Services hub moved from /marketing-solutions to /services (better SEO
      // URL, and it gives the /services/[slug] pages a resolving parent). 301
      // preserves bookmarks, backlinks, and search-engine equity.
      { source: '/marketing-solutions', destination: '/services', permanent: true },
    ]
  },
}

module.exports = nextConfig
