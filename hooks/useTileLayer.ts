import { TileLayer } from "@deck.gl/geo-layers";
import { TileLayerProps } from "@deck.gl/geo-layers/tile-layer/tile-layer";
import { clamp } from "@math.gl/core";
import { BitmapLayer } from "deck.gl";
import { useEffect, useState } from "react";
import tileMeta from "@settings/tileMeta.json";
import { Tile } from "@lib/Interface";
import { fetchTileData } from "@lib/fetchTileData";

const initialTileMeta = tileMeta.dq3;
type Data = typeof initialTileMeta;
export interface renderSubLayers extends TileLayerProps<Data> {
  id: string;
  tile: Tile;
  tileMeta: Data;
}
const initialLayerProperties: TileLayerProps<Data> = {
  tileSize: initialTileMeta.tileSize,
  minZoom: initialTileMeta.minZoomNative,
  maxZoom: initialTileMeta.maxZoomNative,
  extent: [0, 0, initialTileMeta.width, initialTileMeta.height],
  refinementStrategy: "best-available",
  getTileData: async ({ x, y, z }: Tile) => await fetchTileData({ x, y, z }, initialTileMeta),
  renderSubLayers: (properties: renderSubLayers) => {
    const { left, bottom, right, top } = properties.tile.bbox;
    const width = initialTileMeta.width;
    const height = initialTileMeta.height;
    const { id, data } = properties;
    const bbox = {
      left: clamp(left, 0, width) as number,
      bottom: clamp(bottom, 0, height) as number,
      right: clamp(right, 0, width) as number,
      top: clamp(top, 0, height) as number
    };
    return [
      new BitmapLayer({
        id: id,
        image: data,
        bounds: [bbox.left, bbox.bottom, bbox.right, bbox.top]
      })
    ];
  }
};

const tileMetaUpdater = (index: string, setTileMeta: (meta: () => Data) => void) => {
  switch (index) {
    case "qd":
      setTileMeta(() => tileMeta.qd);
      break;
    case "qd1":
      setTileMeta(() => tileMeta.qd1);
      break;
    default:
      setTileMeta(() => tileMeta.dq3);
  }
};
const propertiesUpdater = (tileMeta: Data, setLayerProperties: (properties: () => TileLayerProps<Data>) => void) => {
  setLayerProperties(() => ({
    tileSize: tileMeta.tileSize,
    minZoom: tileMeta.minZoomNative,
    maxZoom: tileMeta.maxZoomNative,
    extent: [0, 0, tileMeta.width, tileMeta.height],
    refinementStrategy: "best-available",
    getTileData: async ({ x, y, z }: Tile) => await fetchTileData({ x, y, z }, tileMeta),
    renderSubLayers: (properties: renderSubLayers) => {
      const { left, bottom, right, top } = properties.tile.bbox;
      const width = tileMeta.width;
      const height = tileMeta.height;
      const { id, data } = properties;
      const bbox = {
        left: clamp(left, 0, width) as number,
        bottom: clamp(bottom, 0, height) as number,
        right: clamp(right, 0, width) as number,
        top: clamp(top, 0, height) as number
      };
      return [
        new BitmapLayer({
          id: id,
          image: data,
          bounds: [bbox.left, bbox.bottom, bbox.right, bbox.top]
        })
      ];
    }
  }));
};

export const useTileLayer = (index: string): TileLayer<Data, TileLayerProps<Data>> => {
  const [layerProperties, setLayerProperties] = useState<TileLayerProps<Data>>(() => initialLayerProperties);
  const [tileMeta, setTileMeta] = useState<Data>(() => initialTileMeta);
  useEffect(() => {
    tileMetaUpdater(index, setTileMeta);
  }, [index]);
  useEffect(() => {
    propertiesUpdater(tileMeta, setLayerProperties);
  }, [tileMeta]);
  return new TileLayer(layerProperties);
};
