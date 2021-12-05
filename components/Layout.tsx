import styles from "@styles/layout/layout.module.css";
import dynamic from "next/dynamic";
import { ReactElement, ReactNode } from "react";
const Panel = dynamic(() => import("@components/Panel"));
export default function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <main>
      <div className={styles.bg}>
        {children}
        <Panel />

        {/* <Suspense fallback={false}>{children}</Suspense>
        <Suspense fallback={false}>
          <Panel />
        </Suspense> */}
      </div>
    </main>
  );
}
