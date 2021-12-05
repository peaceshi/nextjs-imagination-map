import styles from "@styles/panel/panel.module.css";
import { TFunction, useTranslation } from "next-i18next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";
const LanguageSelector = ({ t, router }: { t: TFunction; router: NextRouter }) => (
  <ul>
    <li key="language-selector">{t("tag:选择语言")}</li>
    {router.locales?.map((locale, index) => (
      <li key={index}>
        <Link href={router.pathname} locale={locale}>
          {locale}
        </Link>
      </li>
    ))}
  </ul>
);
export const LanguageControlPanel = (): ReactElement => {
  const { t } = useTranslation(["tag"]);
  const router = useRouter();
  return (
    <div className={styles.right}>
      <LanguageSelector t={t} router={router} />
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
export { Panel as default } from "./Panel";
