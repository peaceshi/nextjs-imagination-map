import Head from "next/head";
import React, { ReactElement, useState } from "react";
// import Map from "@components/map";
import OrthographicMap from "@components/OrthographicMap";
export default function Layout({ children, home }: { children: unknown; home: string }): ReactElement {
  const [index, setIndex] = useState<number>(0);
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      <main>
        {children}
        {/* <Map index={index} /> */}
        <OrthographicMap />
      </main>
      {home ? (
        <div style={{ position: "absolute", right: 0, top: 20 }}>
          <div>
            <button onClick={() => setIndex(0)}>to Teyvat</button>
          </div>
          <div>
            <button onClick={() => setIndex(1)}>to QD</button>
          </div>
          <div>
            <button onClick={() => setIndex(2)}>to QD1</button>
          </div>
        </div>
      ) : // eslint-disable-next-line unicorn/no-null
      null}
    </div>
  );
}
