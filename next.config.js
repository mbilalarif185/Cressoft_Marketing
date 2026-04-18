/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide the `X-Powered-By: Next.js` fingerprint and rely on Next's built-in
  // gzip compression at the Node layer (most CDNs/PaaS layer brotli on top).
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Turn `/about-us/` into `/about-us` to avoid duplicate URL indexing.
  trailingSlash: false,

  // next/image — modern formats first, generous device sizes for hero art.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 120, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'cressoft.net' },
      { protocol: 'https', hostname: 'www.cressoft.net' },
    ],
  },

  experimental: {
    // Tree-shake heavy libraries so we only ship what each page actually uses.
    optimizePackageImports: ['swiper', 'gsap'],
  },

  async headers() {
    const isProd = process.env.NODE_ENV === 'production'
    const longCache = 'public, max-age=31536000, immutable'
    const devNoStore = 'no-store, must-revalidate'

    // Production: long cache for hashed assets.
    // Development: force no-store on ALL `/_next/*` responses (static chunks,
    // webpack HMR, hot-update JSON, etc.). Otherwise the browser can keep a
    // stale webpack runtime that still requests an old
    // `*.webpack.hot-update.json` hash → 404 → Fast Refresh full reload loop.
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
        // Site-wide security & SEO-friendly headers.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // HSTS only in production — avoids pinning odd behaviour on http://localhost during dev.
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

  // Windows dev: Next 15 can split the server bundle into
  // `.next/server/chunks/vendor-chunks/*.js`. The webpack runtime sometimes
  // races the file writer → intermittent ENOENT for `.next/server/pages/*.js`
  // (e.g. faq.js) when multiple routes compile. Inlining the server bundle in
  // dev avoids that torn state. Client + production builds are unchanged.
  //
  // Client dev: disable webpack filesystem cache so stale module graphs / HMR
  // hashes cannot survive across restarts (reduces hot-update.json 404 loops).
  webpack: (config, { dev, isServer }) => {
    if (dev && isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
        runtimeChunk: false,
      }
    }
    if (dev && !isServer) {
      config.cache = false
    }
    return config
  },

  async redirects() {
    return [
      // Force the canonical /blog list when the legacy redirect stub is hit
      // without a destination resolved by getServerSideProps (defensive safety).
      { source: '/index', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      // Common typo / legacy paths.
      { source: '/contact-us', destination: '/contact', permanent: true },
    ]
  },

  // NOTE: no custom `webpack` block, no `experimental.turbo.resolveAlias`.
  // A previous version of this file aliased `react` and `react-dom` via
  // `config.resolve.alias` to "force a single React resolution" for nested
  // packages (the original culprit was @dnd-kit, since removed). On Next 15
  // + React 19 that override is harmful: Next ships React through its own
  // framework chunk, and a manual alias produces TWO React instances in the
  // client bundle. The result is a runtime "invalid hook call" guard that
  // makes Fast Refresh refuse every update and force a full reload on every
  // render — i.e. the dev "death loop" we just spent hours debugging.
  // Next 15's defaults already deduplicate React correctly. Do not re-add
  // this alias unless you can prove a specific package needs it.
}

module.exports = nextConfig
