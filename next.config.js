const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure merged config always defines `experimental` (some tooling reads it unconditionally).
  experimental: {},
  webpack: (config, { dev, isServer }) => {
    // No persistent webpack disk cache in dev (avoids stale Windows builds), but use
    // memory cache so HMR stays aligned. `cache: false` led to hot-update.json 404s
    // and full Fast Refresh reloads after each route compile.
    if (dev) {
      config.cache = { type: 'memory' }
      // Avoid default polling: interval polling + webpack writing under `.next` can race
      // and produce `*.webpack.hot-update.json` 404s + full Fast Refresh reloads.
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
      }
      // Only on hosts where native file events are unreliable (network drive, VM, etc.):
      // PowerShell: `$env:WATCHPACK_POLLING="true"; npm run dev`
      if (process.env.WATCHPACK_POLLING === 'true') {
        config.watchOptions.poll = 1000
      }

      // Inline server chunks in dev. Next 15 on Windows splits the server bundle into
      // `.next/server/chunks/vendor-chunks/*.js` (e.g. `vendor-chunks/next.js`); the
      // webpack-runtime can race the file writer and throw `MODULE_NOT_FOUND`, which
      // cascades into 500s for every page + static asset until you wipe `.next`.
      if (isServer) {
        config.optimization = {
          ...config.optimization,
          splitChunks: false,
          runtimeChunk: false,
        }
      }
    }
    // Force a single React resolution (fixes "Can't resolve 'react'" from nested ESM like @dnd-kit)
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    }
    return config
  },
}

module.exports = nextConfig
