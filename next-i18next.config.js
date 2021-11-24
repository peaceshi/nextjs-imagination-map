const I18nextChainedBackend = require("i18next-chained-backend/dist/cjs/i18nextChainedBackend");
const I18NextHttpBackend = require("i18next-http-backend/cjs");

module.exports = {
  debug: false,
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["en-US", "zh-CN", "ja-JP", "fr-FR", "eo"],
    defaultNS: "tag",
    serializeConfig: false
  },
  ns: ["tag"], // the namespaces needs to be listed here, to make sure they got preloaded
  use: [I18nextChainedBackend],
  backend: {
    backends: [I18NextHttpBackend],
    backendOptions: [
      {
        loadPath: "https://assets.yuanshen.site/data/i18n/{{ns}}.{{lng}}.json",
        crossDomain: true,
        requestOptions: {
          mode: "no-cors",
          cache: "default"
        }
      }
    ]
  }
};
