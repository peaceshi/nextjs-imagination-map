import * as React from "react";
import { ReactElement, useCallback, useState } from "react";
import DeckGL from "@deck.gl/react";
import { BitmapLayer, OrthographicController, OrthographicView, PostProcessEffect } from "deck.gl";
import { useTileLayer } from "@hooks/useTileLayer";
import { clamp } from "@math.gl/core";
import { useDimensions } from "@hooks/useDimensions";
import { Tile, TileLayersSubProperties } from "@lib/Interface";
import { fetchTileData } from "@lib/fetchData";
import { vignette } from "@luma.gl/shadertools";

const mapCenter = {
  deltaX: 12288,
  deltaY: 12288
};
const INITIAL_VIEW_STATE = {
  target: [mapCenter.deltaX, mapCenter.deltaY, 0],
  bearing: 0,
  zoom: -5,
  maxZoom: 10,
  minZoom: -5
};
const controller = {
  type: OrthographicController,
  scrollZoom: { speed: 1, smooth: true },
  doubleClickZoom: false,
  inertia: true
};
const postProcessEffect = new PostProcessEffect(vignette, {
  radius: 0.1,
  amount: 0.6
});
export default function OrthographicMap(): ReactElement {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  //   const dimensions = useDimensions("https://assets.yuanshen.site/tiles/map.image.dzi");
  const view = new OrthographicView({ id: "teyvat" });
  const layer = useTileLayer({
    tileSize: 256,
    minZoom: -6,
    maxZoom: 0,
    extent: [0, 0, 24576, 24576],
    refinementStrategy: "best-available",
    getTileData: async ({ x, y, z }: Tile) => await fetchTileData({ x, y, z }),
    renderSubLayers: (properties: TileLayersSubProperties) => {
      const { left, bottom, right, top } = properties.tile.bbox;
      const width = 24576;
      const height = 24576;
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
  });
  return (
    <DeckGL
      views={[view]}
      layers={[layer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={controller}
      ////@ts-expect-error: Bad types define
      // getTooltip={getTooltip}
      style={{ backgroundColor: "#000000" }}
      effects={[postProcessEffect]}
      // _onMetrics={onMetrics}
      // onViewStateChange={onViewStateChange}
      //@ts-expect-error: Bad types define
      //   getCursor={getCursor}
      useDevicePixels={false}
    />
  );
}
