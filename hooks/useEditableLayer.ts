import type { EditAction, FeatureCollection, ViewMode } from "@nebula.gl/edit-modes";
import { EditableGeoJsonLayer } from "@nebula.gl/layers";
import { useMemo, useState } from "react";

interface EditableLayerProperties {
  id: string;
  data: FeatureCollection;
  mode: typeof ViewMode;
  selectedFeatureIndexes: number[];
  onEdit: (argument0: EditAction<FeatureCollection>) => void;
}
export const useEditableLayer = (
  data: FeatureCollection,
  mode: typeof ViewMode,
  selectedFeatureIndexes: number[],
  setGeojson: (argument0: FeatureCollection) => void
) => {
  const [layerProperties, setLayerProperties] = useState<EditableLayerProperties>({
    id: "geojson-layer",
    data: data,
    mode: mode,
    selectedFeatureIndexes,
    onEdit: ({ updatedData }: EditAction<FeatureCollection>) => {
      setGeojson(updatedData);
    }
  });
  useMemo(() => {
    setLayerProperties({
      id: "geojson-layer",
      data: data,
      mode: mode,
      selectedFeatureIndexes,
      onEdit: ({ updatedData }: EditAction<FeatureCollection>) => {
        setGeojson(updatedData);
      }
    });
  }, [data, mode, selectedFeatureIndexes, setGeojson]);
  return new EditableGeoJsonLayer(layerProperties);
};
