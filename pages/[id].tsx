import MapView from "@components/View/MapView";
import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import nextI18NextConfig from "../next-i18next.config.js";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = "zh-CN";
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale, ["tag"], nextI18NextConfig))
    }
  };
};
/**
 * getStaticPaths:  https://nextjs.org/docs/api-reference/next/getStaticPaths.html
 * @returns
 */
export const getStaticPaths: GetStaticPaths = () => {
  return {
    // paths: [{ params: { id: "qd" } }, { params: { id: "qd1" } }, { params: { id: "editor" } }],
    paths: [],
    /**
     * must set fallback to true, or will get 404 beacuse of locale not found.
     */
    fallback: true
  };
};

const Map = () => {
  const { id } = useRouter().query as { id: string };
  return <MapView id={id} />;
};
export { Map as default };
