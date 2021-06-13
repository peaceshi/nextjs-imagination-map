/* global document */
import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import MapGL from "react-map-gl";

const EMPTY_STYLE = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: ["https://assets.yuanshen.site/tiles_dq/{z}/ppp{x}_{y}.jpg"],
      tileSize: 256,
      attribution:`Imagination Map`
    },
  },
  layers: [
    {
      id: "tiles_dq",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};
export default function Home() {
  const [viewport, setViewport] = useState({
    longitude: 90,
    latitude: -45,
    zoom: 4,
    maxZoom: 7,
    minZoom: 3,
    bearing: 0,
  });

  return (
    <>
      <Head>
      <link href="https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.css" rel="stylesheet" />
      </Head>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle={EMPTY_STYLE}
        onViewportChange={setViewport}
        mapboxApiAccessToken={`0`}
      >
        {/* <Source id="raster-tiles" type="raster" data={geojson}>
        <Layer {...parkLayer} paint={{ "fill-color": parkColor }} />
      </Source> */}
      </MapGL>
    </>
  );
}
