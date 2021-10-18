import styles from "@styles/panel/panel.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { NextRouter } from "next/router";
import React, { ReactElement } from "react";

interface LanguageControlPanelProperties {
  href: string;
  t: typeof useTranslation;
  router: NextRouter;
}
interface TileLayerControlPanelProperties {
  setTileLayerUrlIndex: (argument0: number) => void;
}

type PanelProperties = LanguageControlPanelProperties & TileLayerControlPanelProperties;

export const LanguageControlPanel = ({ href, t, router }: LanguageControlPanelProperties): ReactElement => {
  return (
    <div className={styles.right}>
      <div>
        <Link href={href} locale={router.locale === "en" ? "de" : "en"}>
          <button>{t("footer:description")}</button>
        </Link>
      </div>
      <div>
        <Link href={href} locale={router.locale === "en" ? "de" : "en"}>
          <button>{t("common:change-locale")}</button>
        </Link>
      </div>
    </div>
  );
};
export const TileLayerControlPanel = ({ setTileLayerUrlIndex }: TileLayerControlPanelProperties): ReactElement => {
  return (
    <div className={styles.left}>
      <div>
        <Link href="/">
          <button onClick={() => setTileLayerUrlIndex(0)}>to Teyvat</button>
        </Link>
      </div>
      <div>
        <Link href="/qd">
          <button onClick={() => setTileLayerUrlIndex(1)}>to QD</button>
        </Link>
      </div>
      <div>
        <Link href="/qd1">
          <button onClick={() => setTileLayerUrlIndex(2)}>to QD1</button>
        </Link>
      </div>
      <div>
        <Link href="/layers/ImageTileLayer">
          <button onClick={() => setTileLayerUrlIndex(2)}>ImageTileLayer</button>
        </Link>
      </div>
    </div>
  );
};
export const Panel = (properties: PanelProperties) => (
  <>
    <LanguageControlPanel href={properties.href} t={properties.t} router={properties.router} />
    <TileLayerControlPanel setTileLayerUrlIndex={properties.setTileLayerUrlIndex} />
  </>
);
export default Panel;
