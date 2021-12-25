/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { GeoJsonEditMode, ViewMode } from "@nebula.gl/edit-modes";
import { SelectionLayer } from "@nebula.gl/layers";
import { SELECTION_TYPE } from "@nebula.gl/layers/src/layers/selection-layer";
import { useMemo, useState } from "react";

interface SelectionLayerProperties {
  id: string;
  selectionType: string | null;
  layerIds: string[];
  onSelect: (argument0: any) => void;
  _subLayerProps: Record<string, unknown>;
}

export const useSelectionLayer = (mode: typeof ViewMode, setSelectedFeatureIndexes: (argument0: number[]) => void) => {
  const [layerProperties, setLayerProperties] = useState<SelectionLayerProperties>({
    id: "selection",
    selectionType: mode === GeoJsonEditMode ? SELECTION_TYPE.RECTANGLE : SELECTION_TYPE.NONE,
    onSelect: ({ pickingInfos }: any) => {
      setSelectedFeatureIndexes(pickingInfos.map((pi: { index: any }) => pi.index));
    },
    layerIds: ["geojson-layer"],
    _subLayerProps: {
      getTentativeFillColor: () => [255, 0, 255, 100],
      getTentativeLineColor: () => [0, 0, 255, 100],
      getTentativeLineDashArray: () => [0, 0],
      lineWidthMinPixels: 3
    }
  });
  useMemo(() => {
    setLayerProperties({
      id: "selection",
      selectionType: mode === GeoJsonEditMode ? SELECTION_TYPE.RECTANGLE : SELECTION_TYPE.NONE,
      onSelect: ({ pickingInfos }: any) => {
        setSelectedFeatureIndexes(pickingInfos.map((pi: { index: any }) => pi.index));
      },
      layerIds: ["geojson-layer"],
      _subLayerProps: {
        getTentativeFillColor: () => [255, 0, 255, 100],
        getTentativeLineColor: () => [0, 0, 255, 100],
        getTentativeLineDashArray: () => [0, 0],
        lineWidthMinPixels: 3
      }
    });
  }, [mode, setSelectedFeatureIndexes]);
  return new SelectionLayer(layerProperties);
};
