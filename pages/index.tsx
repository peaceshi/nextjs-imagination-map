import Head from "next/head";
import * as React from "react";
import { ReactElement } from "react";
import Layout from "@components/layout";
export default function Home(): ReactElement {
  return (
    <Layout home>
      <Head>
        <link href="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.css" rel="stylesheet" />
      </Head>
    </Layout>
  );
}
