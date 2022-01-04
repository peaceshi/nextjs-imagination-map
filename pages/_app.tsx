import { ChakraProvider } from "@chakra-ui/react";
import "@styles/index.sass";
import { checkWebpFeature, pwaHelper } from "@utils";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext } from "react";
import nextI18NextConfig from "../next-i18next.config";

export const FirstLoadingContext = createContext(true);

const MyAppHead = () => (
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
/**
 * Custom App
 * @url https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp = ({ Component, pageProps }: AppProps) => {
  clientSideFunction();
  return (
    <ChakraProvider>
      <MyAppHead />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};
export default appWithTranslation(MyApp, nextI18NextConfig);
