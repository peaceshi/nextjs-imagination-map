import ImageTileLayer from "@components/layers/ImageTile";
import Layout from "@components/Layout";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactElement } from "react";
const Panel = dynamic(() => import("@components/Panel"));
const initialLocale = "zh-CN";
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? initialLocale, ["common", "footer", "tag"]))
  }
});
export default function Home(): ReactElement {
  const { t } = useTranslation(["common", "footer"]);
  const router = useRouter();
  return (
    <>
      <Layout>
        <ImageTileLayer onTilesLoad={undefined} />
      </Layout>
      <Panel href="/layers/ImageTileLayer" t={t} router={router} />
    </>
  );
}
