import Head from "next/head";
import * as React from "react";
import { ReactElement } from "react";
import Map from "@components/map";
import Layout from "@components/layout";
export default function Teyvat(): ReactElement {
  return (
    <Layout>
      <Head>
        <link href="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.css" rel="stylesheet" />
      </Head>
      <Map></Map>
    </Layout>
  );
}
