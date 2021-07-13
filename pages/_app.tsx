import React, { ReactElement } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => <Component {...pageProps} />;
export default appWithTranslation(MyApp);
