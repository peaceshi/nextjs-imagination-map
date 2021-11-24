// import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { Panel } from "@components/Panel";

export default function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div>
      <header></header>
      <main>
        {children}
        <Panel />
      </main>
    </div>
  );
}
