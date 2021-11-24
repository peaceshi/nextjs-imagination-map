import { DataFilterExtension } from "@deck.gl/extensions";
import { TextLayer, TextLayerProps } from "@deck.gl/layers";
import { FeatureCollection, FeatureOf, FeatureWithProps, Point } from "@nebula.gl/edit-modes";
import { TFunction, useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

type Data = FeatureOf<Point> & FeatureWithProps<Point, { region: number }>;

type FilterRange = [number, number];

const initialLayerProperties: TextLayerProps<Data> = {
  id: "tag-layer",
  data: [],
  getPosition: (d: Data) => [d.geometry.coordinates[0], d.geometry.coordinates[1]],
  characterSet: "auto",
  fontFamily: "'HYWenHei 85W'",
  getText: (d) => d.id as string,
  getColor: [236, 236, 236],
  getSize: (d: Data) => (d.properties.region == 1 ? 210 : d.properties.region == 2 ? 90 : 40),
  sizeScale: 1,
  fontWeight: "normal",
  sizeUnits: "common",
  getAlignmentBaseline: "center",
  fontSettings: {
    sdf: true,
    fontSize: 68
  },
  outlineColor: [0, 0, 0, 76],
  outlineWidth: 0.15,
  filterTransformSize: false,
  filterTransformColor: false,
  filterEnabled: true,
  extensions: [new DataFilterExtension({ filterSize: 1 })]
};
const zoomRegion = {
  min: -3,
  max: 0,
  step: 1
};
const initialFilterRange: FilterRange = [zoomRegion.min - zoomRegion.step, zoomRegion.min];
const filterUpdater = (zoom: number, setFilterRange: (range: () => FilterRange) => void) => {
  if (zoom < zoomRegion.min) {
    setFilterRange(() => [zoomRegion.min - zoomRegion.step, zoomRegion.min]);
  } else if (zoom > zoomRegion.max) {
    setFilterRange(() => [zoomRegion.max - zoomRegion.step, zoomRegion.max]);
  } else {
    setFilterRange(() => [zoom - zoomRegion.step, zoom]);
  }
};
const propertiesUpdater = (
  filterRange: FilterRange,
  setLayerProperties: (properties: () => TextLayerProps<Data>) => void,
  t: TFunction,
  geojson: FeatureCollection,
  zoomRegion: { min: number; max: number; step: number }
) => {
  setLayerProperties(() => ({
    ...initialLayerProperties,
    data: geojson?.features as Data[],
    getText: (d) => t(`tag:${d.id as string}`),
    getFilterValue: (d: Data) =>
      d.properties.region == 1
        ? zoomRegion.min
        : d.properties.region == 2
        ? zoomRegion.min + zoomRegion.step
        : d.properties.region == 3
        ? zoomRegion.max - zoomRegion.step
        : zoomRegion.max,
    filterRange: filterRange
  }));
};
export const useTagLayer = (zoom: number, geoJson: FeatureCollection): TextLayer<Data, TextLayerProps<Data>> => {
  const [layerProperties, setLayerProperties] = useState<TextLayerProps<Data>>(() => ({
    ...initialLayerProperties,
    data: geoJson?.features as Data[]
  }));
  const { t } = useTranslation(["tag"]);
  const [filterRange, setFilterRange] = useState<FilterRange>(() => initialFilterRange);

  useEffect(() => {
    filterUpdater(zoom, setFilterRange);
  }, [zoom]);

  useEffect(() => {
    propertiesUpdater(filterRange, setLayerProperties, t, geoJson, zoomRegion);
  }, [filterRange, geoJson, t]);

  return new TextLayer(layerProperties);
};
export default useTagLayer;
