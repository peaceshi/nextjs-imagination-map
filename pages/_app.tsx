import "@styles/index.sass";
import { checkWebpFeature, pwaHelper } from "@utils/utils";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactElement } from "react";

const MyAppHead = (): ReactElement => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Web Map</title>
  </Head>
);
const clientSideFunction = () => {
  // Because of the way Next.js handles SSR,
  // make sure your function is being called in client side only.
  void checkWebpFeature();
  pwaHelper();
};
const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  clientSideFunction();
  return (
    <>
      <MyAppHead />
      <Component {...pageProps} />
    </>
  );
};
export default appWithTranslation(MyApp);
