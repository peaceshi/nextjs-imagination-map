/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
// The `next.config.js` file must be a JavaScript file as it does not get parsed by Babel or TypeScript,
// however you can add some type checking in your IDE using JSDoc as below:
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer"
  }
  // {
  //   key: "Content-Security-Policy",
  //   value:
  //     "script-src 'self'; object-src 'none'; style-src yuanshen.site *.yuanshen.site *.minemc.top minemc.top; child-src https:"
  // }
];
// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withPWA({
  pwa: {
    dest: "public",
    cacheOnFrontEndNav: false,
    runtimeCaching,
    buildExcludes: [/middleware-manifest\.json$/]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icons/favicon.ico",
        permanent: true
      }
    ];
  },
  i18n,
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     resolve: {
  //       alias: {
  //         "mapbox-gl": "maplibre-gl"
  //       }
  //     }
  //   });
  //   return config;
  // },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  compress: false,
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    concurrentFeatures: false
  }
});

module.exports = nextConfig;
