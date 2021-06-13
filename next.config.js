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
    locales: ["en", "de"],
  },
  future:{
    webpack5: true
  },
  webpack: (config, options) => {
    config.module.rules.push({
      resolve:{
        alias: {
          "mapbox-gl": "maplibre-gl"
        }
      },
    })
    return config
  },
  // basePath: '/v3',
  experimental:{},
  reactStrictMode: true,
};
module.exports = nextConfig;
