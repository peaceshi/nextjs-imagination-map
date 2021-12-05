import Layout from "@components/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //@ts-expect-error: Bad types define
    ...(await serverSideTranslations(locale, ["common", "footer"]))
  }
});

export default function Home(): ReactElement {
  return (
    <>
      <Layout>
        <h1>Offline</h1>
      </Layout>
    </>
  );
}
