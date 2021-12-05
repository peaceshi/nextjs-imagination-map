import Layout from "@components/Layout";
import { useGeoJSON } from "@hooks/hooks";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import nextI18NextConfig from "../next-i18next.config.js";
const OrthographicMap = dynamic(() => import("@components/OrthographicMap"));
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const defaultLocale = "zh-CN";
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale, ["tag"], nextI18NextConfig))
    }
  };
};
export default function Map() {
  const { data } = useGeoJSON("/api/data/tags/qd1");
  return (
    <Layout>
      <OrthographicMap id="qd1" data={data} />
    </Layout>
  );
}
