import MapView from "@components/View/MapView";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../next-i18next.config.js";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = "zh-CN";
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale, ["tag"], nextI18NextConfig))
    }
  };
};

const Map = () => {
  return <MapView id="dq3" />;
};
export { Map as default };
