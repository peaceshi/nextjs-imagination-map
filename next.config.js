// The `next.config.js` file must be a JavaScript file as it does not get parsed by Babel or TypeScript,
// however you can add some type checking in your IDE using JSDoc as below:

// @ts-check
/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const nextConfig = {
  /* config options here */
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"]
  },
  future: {},
  webpack: (config, options) => {
    config.module.rules.push({
      resolve: {
        alias: {
          "mapbox-gl": "maplibre-gl"
        }
      }
    });
    return config;
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  // basePath: '/v3',
  experimental: {},
  reactStrictMode: true
};
module.exports = nextConfig;
