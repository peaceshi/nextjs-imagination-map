import Head from "next/head";
import React, { ReactElement } from "react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      <main>{children}</main>
    </div>
  );
}
