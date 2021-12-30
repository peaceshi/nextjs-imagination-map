import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

const APP_NAME = "next-pwa example";
const APP_DESCRIPTION = "This is an example of using next-pwa plugin";
/**
 * Custom Document
 * @url https://nextjs.org/docs/advanced-features/custom-document
 */
export default class AppDocument extends Document {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(context);
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />

          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#3367D6" />

          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />

          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link rel="dns-prefetch" href="https://assets.yuanshen.site" />
          <link
            rel="preload"
            href="https://assets.yuanshen.site/fonts/woff2/font.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
