import Layout from "@components/Layout";
import OrthographicMap from "@components/OrthographicMap";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
const Panel = dynamic(() => import("@components/Panel"));
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //@ts-expect-error: Bad types define
    ...(await serverSideTranslations(locale, ["common", "footer"]))
  }
});
export default function Home(): ReactElement {
  const [tileLayerUrlIndex] = useState<string>("qd");
  const { t } = useTranslation(["common", "footer"]);
  const router = useRouter();
  return (
    <>
      <Layout>
        <OrthographicMap index={tileLayerUrlIndex} />
      </Layout>
      <Panel href="/qd" t={t} router={router} />
    </>
  );
}
