import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import DeckGL from "@deck.gl/react";
import { MapView } from "@deck.gl/core";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, PathLayer } from "@deck.gl/layers";
import { WebMercatorViewport } from "@deck.gl/core";
import { TextLayer } from "@deck.gl/layers";
import { load } from "@loaders.gl/core";
import { ImageLoader } from "@loaders.gl/images";
import useSWR from "swr";
import { MapController } from "deck.gl";

const northEdge = 0;
const westEdge = 0;
const southEdge = -79.17;
const eastEdge = 135;
const lon2tile = (lon:number, zoom:number) => {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
};
const lat2tile = (lat:number, zoom:number) => {
  return Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
      Math.pow(2, zoom)
  );
};
const topTile = (northEdge:number, zoom:number)=>lat2tile(northEdge, zoom);
const leftTile = (westEdge:number, zoom:number)=>lon2tile(westEdge, zoom);
const bottomTile = (southEdge:number, zoom:number)=>lat2tile(southEdge, zoom);
const rightTile = (eastEdge:number, zoom:number)=>lon2tile(eastEdge, zoom);
export const fetchTileData = ({ x, y, z }: { x: number; y: number; z: number }): any=> {
  if ((x>=leftTile(westEdge, z)&&x<rightTile(eastEdge, z))&&(y>=topTile(northEdge, z)&&y<=bottomTile(southEdge, z))) {
    return ( load(`https://assets.yuanshen.site/tiles_dq/${z}/ppp${x}_${y}.jpg`, ImageLoader, {
      worker: true,
      reuseWorkers: true,
    }));
  }else{
    return null;
  }
};

const INITIAL_VIEW_STATE = {
  longitude: 90,
  latitude: -45,
  zoom: 4,
  maxZoom: 10,
  minZoom: 2,
  bearing: 0,
};
const controller = {
  type: MapController,
  scrollZoom: {speed: 1, smooth: true},
  doubleClickZoom: false,
  inertia: true
};
// function getTooltip({tile}) {
//   return tile && `tile: x: ${tile.x}, y: ${tile.y}, z: ${tile.z}`;
// }
export default function Home({ showBorder = false, onTilesLoad = null }) {
  const view =new MapView({ repeat: true });
  const tileLayer = new TileLayer({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    // data: [
    //   `https://assets.yuanshen.site/tiles_dq/{z}/ppp{x}_{y}.jpg`
    // ],
    maxRequests: -1,
    pickable: false, //@ts-expect-error: Bad types define
    onViewportLoad: onTilesLoad,
    // https://wiki.openstreetmap.org/wiki/Zoom_levels
    maxZoom: 8,
    minZoom: 2,
    tileSize: 256,
    maxCacheSize: 10240,
    refinementStrategy: "best-available",
    getTileData: ({ x, y, z }) => fetchTileData({ x, y, z }),
    //@ts-expect-error: Bad types define
    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;
      return [
        new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        }),
        showBorder &&
          new PathLayer({
            id: `${props.id}-border`,
            visible: props.visible,
            data: [
              [
                [west, north],
                [west, south],
                [east, south],
                [east, north],
                [west, north],
              ],
            ], //@ts-expect-error: Bad types define
            getPath: (d) => d,
            getColor: [255, 255, 255],
            widthMinPixels: 1,
          }),
        false &&
          new TextLayer({
            id: `${props.id}-border-text`,
            visible: props.visible,
            data: [
              {
                tiles: `id:${props.id}`,
                lonlat: `(${west.toFixed(2)},${north.toFixed(2)})`,
              },
            ],
            fontWeight: "bold", //@ts-expect-error: Bad types define
            getPosition: [west, north],
            getColor: [255, 255, 255], //@ts-expect-error: Bad types define
            getText: (d) => d.lonlat,
            getSize: 32,
            getTextAnchor: "middle",
            getAlignmentBaseline: "center",
          }),
          false &&
          new TextLayer({
            id: `${props.id}-border-center-text`,
            visible: props.visible,
            data: [
              {
                info: `${props.id}\n(x: ${props.tile.x}, y: ${props.tile.y}, z: ${props.tile.z})`,
                lonlat: [west + (east - west) / 2, north + (south - north) / 2],
              },
            ],
            fontWeight: "bold", //@ts-expect-error: Bad types define
            getPosition: (d) => d.lonlat,
            getColor: [255, 255, 255], //@ts-expect-error: Bad types define
            getText: (d) => d.info,
            getSize: 24,
            getTextAnchor: "middle",
            getAlignmentBaseline: "center",
          }),
      ];
    },
  });
  return (
    // <div style={{width:"100vw", height:"100vh",background:"url('https://assets.yuanshen.site/images/bg/144cf86c91fc23674dfeb1b7e8caba77148f550828707161fcd475814d92667b.png') no-repeat center center fixed",backgroundSize:"cover"}}>
    //   <div style={{width:"100vw", height:"100vh",background:"url('https://assets.yuanshen.site/images/bg/6008ef84b4b2136e34b55acb5a80d3b0ec84604dbbf4c6b25e1d67aa96f0b880.png') no-repeat center center fixed",backgroundSize:"cover"}}>
    <DeckGL
      layers={[tileLayer]}
      views={[view]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={controller}
      glOptions={{
        // Tell browser to use discrete GPU if available
        powerPreference: "high-performance",
      }}
      useDevicePixels={false}
      // getTooltip={getTooltip}
    />
    // </div>
    // </div>
  );
}
