// The `next.config.js` file must be a JavaScript file as it does not get parsed by Babel or TypeScript,
// however you can add some type checking in your IDE using JSDoc as below:
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching
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
  extends: [
    //...
    "plugin:@next/next/recommended"
  ],
  // basePath: '/v3',
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
});

module.exports = nextConfig;
