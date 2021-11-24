import Layout from "@components/Layout";
import OrthographicMap from "@components/OrthographicMap";
import { useGeoJson } from "@hooks/hooks";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../next-i18next.config.js";
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
  const { data, fallbackData } = useGeoJson("/api/data/tag");
  return (
    <Layout>
      <OrthographicMap id="dq3" data={data ?? fallbackData} />
    </Layout>
  );
}
