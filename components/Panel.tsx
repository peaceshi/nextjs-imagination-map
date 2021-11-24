import styles from "@styles/panel/panel.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export const LanguageControlPanel = (): ReactElement => {
  const { t } = useTranslation(["tag"]);
  const router = useRouter();
  return (
    <div className={styles.right}>
      <Link href={router.pathname} locale={router.locale === "en-US" ? "ja-JP" : "en-US"}>
        <button>{t("tag:选择语言")}</button>
      </Link>
    </div>
  );
};
export const TileLayerControlPanel = (): ReactElement => {
  return (
    <div className={styles.left}>
      <div>
        <Link href="/">
          <button>to Teyvat</button>
        </Link>
      </div>
      <div>
        <Link href="/qd">
          <button>to QD</button>
        </Link>
      </div>
      <div>
        <Link href="/qd1">
          <button>to QD1</button>
        </Link>
      </div>
      <div>
        <Link href="/layers/ImageTileLayer">
          <button>ImageTileLayer</button>
        </Link>
      </div>
      <div>
        <Link href="/editor">
          <button>Editor</button>
        </Link>
      </div>
    </div>
  );
};
export const Panel = (): ReactElement => (
  <>
    <LanguageControlPanel />
    <TileLayerControlPanel />
  </>
);
export default Panel;
