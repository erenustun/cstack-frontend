/** @type {import('next').NextConfig} */

const { join } = require('path')

const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        hostname: 'localhost',
        port: '4000'
      },
      {
        hostname: 'i.pravatar.cc'
      }
    ]
  },
  i18n: {
    locales: ['cz', 'de', 'en', 'fr', 'it', 'nl'],
    defaultLocale: 'en'
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })

    return config
  }
}

module.exports = nextConfig
