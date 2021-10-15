import Layout from "@components/layout";
import { useRouter } from "next/router";
import * as React from "react";
import { ReactElement } from "react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //@ts-expect-error: Bad types define
    ...(await serverSideTranslations(locale, ["common", "footer"]))
  }
});

export default function Home(): ReactElement {
  const router = useRouter();
  const { t } = useTranslation(["common", "footer"]);
  return (
    <>
      <Layout>
        <h1>{t("footer:description")}</h1>
      </Layout>
    </>
  );
}
