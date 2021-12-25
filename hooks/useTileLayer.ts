import { TileLayer } from "@deck.gl/geo-layers";
import { TileLayerProps } from "@deck.gl/geo-layers/tile-layer/tile-layer";
import { fetchTileData } from "@lib/fetchTileData";
import { Tile } from "@lib/Interface";
import { clamp } from "@math.gl/core";
import { BitmapLayer } from "deck.gl";
import { useEffect, useState } from "react";

type Data = TileJSON;
export interface renderSubLayers extends TileLayerProps<Data> {
  id: string;
  tile: Tile;
  tileMeta: Data;
}

const propertiesUpdater = (tileMeta: Data, setLayerProperties: (properties: () => TileLayerProps<Data>) => void) => {
  setLayerProperties(() => ({
    id: tileMeta.tileName,
    tileSize: tileMeta?.tileSize,
    minZoom: tileMeta?.minZoomNative,
    maxZoom: tileMeta?.maxZoomNative,
    extent: [0, 0, tileMeta?.width, tileMeta?.height],
    refinementStrategy: "best-available",
    getTileData: async ({ x, y, z }: Tile) => await fetchTileData({ x, y, z }, tileMeta),
    renderSubLayers: (properties: renderSubLayers) => {
      const { left, bottom, right, top } = properties.tile.bbox;
      const width = tileMeta?.width;
      const height = tileMeta?.height;
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
    },
    updateTriggers: {
      id: tileMeta.tileName
    }
  }));
};

export const useTileLayer = (tileMeta: Data): TileLayer<Data, TileLayerProps<Data>> => {
  const [layerProperties, setLayerProperties] = useState<TileLayerProps<Data>>({});
  useEffect(() => {
    propertiesUpdater(tileMeta, setLayerProperties);
  }, [tileMeta]);
  return new TileLayer(layerProperties);
};
