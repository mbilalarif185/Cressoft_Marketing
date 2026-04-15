const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure merged config always defines `experimental` (some tooling reads it unconditionally).
  experimental: {},
  webpack: (config, { dev }) => {
    // Disable webpack filesystem cache in dev — avoids occasional stale/corrupt
    // `.next` chunks on Windows (e.g. ENOENT for `server/pages/_document.js`).
    if (dev) {
      config.cache = false
      // Some Windows setups miss file-change events; polling makes HMR reliable.
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
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
