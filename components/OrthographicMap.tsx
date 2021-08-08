/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DeckGL from "@deck.gl/react";
import { useIconLayer, useJsonDiff, useTileLayer } from "@hooks/hooks";
import { Animations } from "@lib/animations";
import { fetchTileData } from "@lib/fetchData";
import { FeatureProperties, Tile, TileLayersSubProperties } from "@lib/Interface";
import { vignette } from "@luma.gl/shadertools";
import { clamp } from "@math.gl/core";
import { FeatureWithProps, Geometry, Point } from "@nebula.gl/edit-modes";
import { useDebounce } from "ahooks";
import { BitmapLayer, OrthographicController, OrthographicView, PostProcessEffect } from "deck.gl";
import React, { ReactElement, useCallback, useState } from "react";

const mapCenter = {
  deltaX: 12288,
  deltaY: 12288
};
const INITIAL_VIEW_STATE = {
  target: [mapCenter.deltaX, mapCenter.deltaY, 0],
  bearing: 0,
  zoom: -6,
  maxZoom: 10,
  minZoom: -6
};
const controller = {
  type: OrthographicController,
  scrollZoom: { smooth: true },
  doubleClickZoom: false,
  inertia: true
};
const postProcessEffect = new PostProcessEffect(vignette, {
  radius: 0.1,
  amount: 0.6
});

export default function OrthographicMap({ index }: { index: number }): ReactElement {
  const [layersAnimations, setLayersAnimations] = useState({
    getColor0: Animations.fadeOutColor,
    transitions0: Animations.fadeOut,
    getColor1: Animations.fadeOutColor,
    transitions1: Animations.fadeOut,
    getColor2: Animations.fadeOutColor,
    transitions2: Animations.fadeOut
  });

  const layersAnimationsDebounce = useDebounce(layersAnimations, { wait: 500 });
  const view = new OrthographicView({ id: "teyvat" });

  const diff = useJsonDiff(
    "https://assets.yuanshen.site/data/region.json",
    "https://assets.yuanshen.site/data/latest-region.json"
  );
  const tileLayer = useTileLayer({
    tileSize: 256,
    minZoom: -6,
    maxZoom: 0,
    extent: [0, 0, 24576, 24576],
    refinementStrategy: "best-available",
    getTileData: async ({ x, y, z }: Tile) => await fetchTileData({ x, y, z }, index),
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
  const tagLayer0 = useIconLayer({
    id: "tagLayer0",
    data: diff[0],
    sizeScale: 1,
    sizeUnits: "meters",
    getIcon: (d: FeatureWithProps<Geometry, FeatureProperties>) => d?.properties?.image,
    getSize: 1150,
    getPosition: (d: FeatureWithProps<Point, FeatureProperties>) => [
      d?.geometry?.coordinates[0],
      d.geometry.coordinates[1]
    ],
    getColor: [236, 236, 236, layersAnimationsDebounce.getColor0],
    //@ts-expect-error: Bad types define
    transitions: layersAnimationsDebounce.transitions0
  });
  const tagLayer1 = useIconLayer({
    id: "tagLayer1",
    data: diff[1],
    sizeScale: 1,
    sizeUnits: "meters",
    getIcon: (d: FeatureWithProps<Geometry, FeatureProperties>) => d?.properties?.image,
    getSize: 250,
    getPosition: (d: FeatureWithProps<Point, FeatureProperties>) => [
      d?.geometry?.coordinates[0],
      d.geometry.coordinates[1]
    ],
    getColor: [236, 236, 236, layersAnimationsDebounce.getColor1],
    //@ts-expect-error: Bad types define
    transitions: layersAnimationsDebounce.transitions1
  });
  const tagLayer2 = useIconLayer({
    id: "tagLayer2",
    data: diff[2],
    sizeScale: 1,
    sizeUnits: "meters",
    getIcon: (d: FeatureWithProps<Geometry, FeatureProperties>) => d?.properties?.image,
    getSize: 150,
    getPosition: (d: FeatureWithProps<Point, FeatureProperties>) => [
      d?.geometry?.coordinates[0],
      d.geometry.coordinates[1]
    ],
    getColor: [236, 236, 236, layersAnimationsDebounce.getColor2],
    //@ts-expect-error: Bad types define
    transitions: layersAnimationsDebounce.transitions2
  });
  const onViewStateChange = useCallback(
    ({ viewState, interactionState }) => {
      if (interactionState.isZooming) {
        // viewState.transitionDuration = 300;
      }
      // Deckgl will update on every change, so we need to add a region for debounce
      if (
        (viewState.zoom < -4 && layersAnimationsDebounce.getColor0 == Animations.fadeOutColor) ||
        (viewState.zoom < -4 && layersAnimationsDebounce.getColor1 == Animations.fadeInColor)
      ) {
        setLayersAnimations({
          ...layersAnimations,
          getColor0: Animations.fadeInColor,
          transitions0: Animations.fadeIn,
          getColor1: Animations.fadeOutColor,
          transitions1: Animations.fadeOut
        });
      }
      if (
        (viewState.zoom > -4 && layersAnimationsDebounce.getColor0 == 255) ||
        (viewState.zoom > -4 && viewState.zoom < -3 && layersAnimationsDebounce.getColor1 == 0) ||
        (viewState.zoom < -3 && layersAnimationsDebounce.getColor2 == 255)
      ) {
        setLayersAnimations({
          ...layersAnimations,
          getColor0: Animations.fadeOutColor,
          transitions0: Animations.fadeOut,
          getColor1: Animations.fadeInColor,
          transitions1: Animations.fadeIn,
          getColor2: Animations.fadeOutColor,
          transitions2: Animations.fadeOut
        });
      }
      if (
        (viewState.zoom > -3 && layersAnimationsDebounce.getColor1 == Animations.fadeInColor) ||
        (viewState.zoom > -3 && layersAnimationsDebounce.getColor2 == Animations.fadeOutColor)
      ) {
        setLayersAnimations({
          ...layersAnimations,
          getColor1: Animations.fadeOutColor,
          transitions1: Animations.fadeOut,
          getColor2: Animations.fadeInColor,
          transitions2: Animations.fadeIn
        });
      }
    },
    [
      layersAnimations,
      layersAnimationsDebounce.getColor0,
      layersAnimationsDebounce.getColor1,
      layersAnimationsDebounce.getColor2
    ]
  );

  return (
    <DeckGL
      views={[view]}
      layers={[tileLayer, tagLayer0, tagLayer1, tagLayer2]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={controller}
      ////@ts-expect-error: Bad types define
      // getTooltip={getTooltip}
      style={{ backgroundColor: "#000000" }}
      effects={[postProcessEffect]}
      // _onMetrics={onMetrics}
      onViewStateChange={onViewStateChange}
      ////@ts-expect-error: Bad types define
      //   getCursor={getCursor}
      useDevicePixels={false}
    />
  );
}
