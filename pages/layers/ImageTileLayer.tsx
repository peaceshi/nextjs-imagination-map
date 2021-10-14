import Layout from "@components/layout";
import ImageTileLayer from "@components/layers/ImageTile";
import { TileLayerChangePanel } from "@components/panel";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { ReactElement, useState } from "react";

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //@ts-expect-error: Bad types define
    ...(await serverSideTranslations(locale, ["common", "footer"]))
  }
});
export default function Home(): ReactElement {
  const [tileLayerUrlIndex, setTileLayerUrlIndex] = useState<number>(0);
  const { t } = useTranslation(["common", "footer"]);
  const router = useRouter();
  return (
    <>
      <Layout>
        <ImageTileLayer onTilesLoad={undefined} />
      </Layout>
      <div style={{ position: "absolute", left: 0, top: 20 }}>
        <div>
          <Link href="/" locale={router.locale === "en" ? "de" : "en"}>
            <button>{t("footer:description")}</button>
          </Link>
        </div>
        <div>
          <Link href="/" locale={router.locale === "en" ? "de" : "en"}>
            <button>{t("common:change-locale")}</button>
          </Link>
        </div>
      </div>
      <TileLayerChangePanel
        style={{ position: "absolute", right: 0, top: 20 }}
        setTileLayerUrlIndex={setTileLayerUrlIndex}
      />
    </>
  );
}