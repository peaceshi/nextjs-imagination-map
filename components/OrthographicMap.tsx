import DeckGL from "@deck.gl/react";
import { useAnimation, useIconLayer, useJsonDiff, useTagLayer, useTileLayer } from "@hooks/hooks";
// import { Animations } from "@lib/Animations";
import { fetchTileData } from "@lib/fetchTileData";
import { FeatureProperties, Tile, TileLayersSubProperties } from "@lib/Interface";
import { vignette } from "@luma.gl/shadertools";
import { clamp } from "@math.gl/core";
import { FeatureWithProps, Geometry, Point } from "@nebula.gl/edit-modes";
import { useDebounce } from "ahooks";
import { BitmapLayer, OrthographicController, OrthographicView, PostProcessEffect } from "deck.gl";
import { ControllerOptions } from "@deck.gl/core/controllers/controller";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DataFilterExtension } from "@deck.gl/extensions";
type UnknownObject = Record<string, unknown>;
const mapCenter = {
  deltaX: 3568,
  deltaY: 6286
};
const INITIAL_VIEW_STATE = {
  target: [6144, 6144, 0],
  bearing: 0,
  zoom: -3, // full zoom level
  maxZoom: 10,
  minZoom: -3.5
};
const controller: ControllerOptions = {
  scrollZoom: { smooth: true },
  touchZoom: true,
  doubleClickZoom: false,
  inertia: true
};
const postProcessEffect = new PostProcessEffect(vignette, {
  radius: 0.1,
  amount: 0.6
});

export default function OrthographicMap({ index }: { index: string }): ReactElement {
  const [viewState, setViewState] = useState<UnknownObject>(INITIAL_VIEW_STATE);
  // const [layersAnimations, setLayersAnimations] = useState({
  //   getColor0: Animations.fadeOutColor,
  //   transitions0: Animations.fadeOut,
  //   getColor1: Animations.fadeOutColor,
  //   transitions1: Animations.fadeOut,
  //   getColor2: Animations.fadeOutColor,
  //   transitions2: Animations.fadeOut
  // });

  // const layersAnimationsDebounce = useDebounce(layersAnimations, { wait: 500 });
  const view = new OrthographicView({ id: index });

  // const diff = useJsonDiff(
  //   "https://assets.yuanshen.site/data/region.json",
  //   "https://assets.yuanshen.site/data/latest-region.json"
  // );
  const tileLayer = useTileLayer(index);
  // const tagLayer0 = useIconLayer({
  //   id: "tagLayer0",
  //   data: diff[0],
  //   sizeScale: 1,
  //   sizeUnits: "meters",
  //   getIcon: (d: FeatureWithProps<Geometry, FeatureProperties>) => d?.properties?.image,
  //   getSize: 1150,
  //   getPosition: (d: FeatureWithProps<Point, FeatureProperties>) => [
  //     d?.geometry?.coordinates[0],
  //     d.geometry.coordinates[1]
  //   ],
  //   // getColor: [236, 236, 236, layersAnimationsDebounce.getColor0],
  //   getColor: [236, 236, 236]
  //   ////@ts-expect-error: Bad types define
  //   // transitions: layersAnimationsDebounce.transitions0
  // });
  // const tagLayer1 = useIconLayer({
  //   id: "tagLayer1",
  //   data: diff[1],
  //   sizeScale: 1,
  //   sizeUnits: "meters",
  //   getIcon: (d: FeatureWithProps<Geometry, FeatureProperties>) => d?.properties?.image,
  //   getSize: 250,
  //   getPosition: (d: FeatureWithProps<Point, FeatureProperties>) => [
  //     d?.geometry?.coordinates[0],
  //     d.geometry.coordinates[1]
  //   ],
  //   // getColor: [236, 236, 236, layersAnimationsDebounce.getColor1],
  //   getColor: [236, 236, 236]
  //   // transitions: layersAnimationsDebounce.transitions1
  // });
  // const tagLayer2 = useIconLayer({
  //   id: "tagLayer2",
  //   data: diff[2],
  //   sizeScale: 1,
  //   sizeUnits: "meters",
  //   getIcon: (d: FeatureWithProps<Geometry, FeatureProperties>) => d?.properties?.image,
  //   getSize: 150,
  //   getPosition: (d: FeatureWithProps<Point, FeatureProperties>) => [
  //     d?.geometry?.coordinates[0],
  //     d.geometry.coordinates[1]
  //   ],
  //   // getColor: [236, 236, 236, layersAnimationsDebounce.getColor2],
  //   getColor: [236, 236, 236]
  //   // transitions: layersAnimationsDebounce.transitions2
  // });
  // const onViewStateChange = useCallback(
  //   ({ viewState, interactionState }) => {
  //     if (interactionState.isZooming) {
  //       // viewState.transitionDuration = 300;
  //     }
  //     // Deckgl will update on every change, so we need to add a region for debounce
  //     if (
  //       (viewState.zoom < -4 && layersAnimationsDebounce.getColor0 == Animations.fadeOutColor) ||
  //       (viewState.zoom < -4 && layersAnimationsDebounce.getColor1 == Animations.fadeInColor)
  //     ) {
  //       setLayersAnimations({
  //         ...layersAnimations,
  //         getColor0: Animations.fadeInColor,
  //         transitions0: Animations.fadeIn,
  //         getColor1: Animations.fadeOutColor,
  //         transitions1: Animations.fadeOut
  //       });
  //     }
  //     if (
  //       (viewState.zoom > -4 && layersAnimationsDebounce.getColor0 == 255) ||
  //       (viewState.zoom > -4 && viewState.zoom < -3 && layersAnimationsDebounce.getColor1 == 0) ||
  //       (viewState.zoom < -3 && layersAnimationsDebounce.getColor2 == 255)
  //     ) {
  //       setLayersAnimations({
  //         ...layersAnimations,
  //         getColor0: Animations.fadeOutColor,
  //         transitions0: Animations.fadeOut,
  //         getColor1: Animations.fadeInColor,
  //         transitions1: Animations.fadeIn,
  //         getColor2: Animations.fadeOutColor,
  //         transitions2: Animations.fadeOut
  //       });
  //     }
  //     if (
  //       (viewState.zoom > -3 && layersAnimationsDebounce.getColor1 == Animations.fadeInColor) ||
  //       (viewState.zoom > -3 && layersAnimationsDebounce.getColor2 == Animations.fadeOutColor)
  //     ) {
  //       setLayersAnimations({
  //         ...layersAnimations,
  //         getColor1: Animations.fadeOutColor,
  //         transitions1: Animations.fadeOut,
  //         getColor2: Animations.fadeInColor,
  //         transitions2: Animations.fadeIn
  //       });
  //     }
  //   },
  //   [
  //     layersAnimations,
  //     layersAnimationsDebounce.getColor0,
  //     layersAnimationsDebounce.getColor1,
  //     layersAnimationsDebounce.getColor2
  //   ]
  // );
  const onViewStateChange = useCallback(
    ({ viewState, interactionState }: { viewState: UnknownObject; interactionState: UnknownObject }) => {
      if (interactionState.isZooming as boolean) {
        viewState.transitionDuration = 300;
        setViewState(viewState);
      }
    },
    []
  );
  // const scatterplotLayer = useAnimation();
  const tagLayer = useTagLayer(viewState);
  return (
    <DeckGL
      views={[view]}
      // layers={[tileLayer, tagLayer0, tagLayer1, tagLayer2]}
      layers={[tileLayer, tagLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={isMobile ? true : controller}
      ////@ts-expect-error: Bad types define
      // getTooltip={getTooltip}
      // style={{ backgroundColor: "#000000" }}
      effects={[postProcessEffect]}
      // _onMetrics={onMetrics}
      onViewStateChange={onViewStateChange}
      ////@ts-expect-error: Bad types define
      //   getCursor={getCursor}
      useDevicePixels={true}
    />
  );
}
