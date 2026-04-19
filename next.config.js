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

  compiler: {
    removeConsole: isProd,
  },

  trailingSlash: false,

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

  // Production-only: fewer resolver round-trips; skip in dev to avoid extra
  // rebuild surface during HMR (swiper/gsap are mostly used in lazy/dynamic paths).
  experimental: isProd
    ? {
        optimizePackageImports: ['swiper', 'gsap'],
      }
    : {},

  async headers() {
    const longCache = 'public, max-age=31536000, immutable'
    const devNoStore = 'no-store, must-revalidate'

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
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
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
    ]
  },
}

module.exports = nextConfig
