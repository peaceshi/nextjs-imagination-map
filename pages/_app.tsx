import React, { ReactElement } from "react";
import "@styles/index.sass";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Web Map</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default appWithTranslation(MyApp);
