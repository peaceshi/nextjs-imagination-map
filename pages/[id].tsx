import MainView from "@components/View/MainView";
import type { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import nextI18NextConfig from "../next-i18next.config.js";
/**
 * getStaticProps
 * @url https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = "zh-CN";
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale, ["tag"], nextI18NextConfig))
    }
  };
};
/**
 * getStaticPaths
 * @description You must use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes with getStaticProps.
 * @url https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    /**
     * @url https://nextjs.org/docs/basic-features/data-fetching#fallback-false
     * If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
     */
    fallback: true
  };
};

const Map = () => {
  const { id } = useRouter().query as { id: string };
  return <MainView id={id} />;
};
export { Map as default };
