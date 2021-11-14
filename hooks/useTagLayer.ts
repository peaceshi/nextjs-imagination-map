/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { DataFilterExtension } from "@deck.gl/extensions";
import { TextLayer, TextLayerProps } from "@deck.gl/layers";
import { Vector2 } from "@math.gl/core";
import d from "@data/latest-region.json";
import { useEffect, useState } from "react";

const data = d.features;
type Data = typeof data[number];
type FilterRange = [number, number];
const initialLayerProperties: TextLayerProps<Data> = {
  id: "all-text",
  data: data,
  getPosition: (d: Data) => new Vector2(d.geometry.coordinates[0], d.geometry.coordinates[1]).scale(1 / 3).toArray(),
  characterSet: "auto",
  fontFamily: "'HYWenHei 85W'",
  getText: (d) => d.properties.image.id,
  getColor: [236, 236, 236],
  getSize: (d: Data) => (d.properties.region == 1 ? 210 : d.properties.region == 2 ? 90 : 30), // baseFontSize
  sizeScale: 1,
  fontWeight: "normal",
  sizeUnits: "meters",
  getAlignmentBaseline: "center",
  fontSettings: {
    sdf: true,
    fontSize: 64,
    buffer: 7,
    radius: 12
  },
  outlineColor: [0, 0, 0, 76],
  outlineWidth: 0.25,
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
  setLayerProperties: (properties: () => TextLayerProps<Data>) => void
) => {
  setLayerProperties(() => ({
    ...initialLayerProperties,
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
export const useTagLayer = (viewState: Record<string, unknown>): TextLayer<Data, TextLayerProps<Data>> => {
  const zoom = viewState.zoom as number;
  const [layerProperties, setLayerProperties] = useState<TextLayerProps<Data>>(() => initialLayerProperties);
  const [filterRange, setFilterRange] = useState<FilterRange>(() => initialFilterRange);
  useEffect(() => {
    filterUpdater(zoom, setFilterRange);
  }, [zoom]);
  useEffect(() => {
    propertiesUpdater(filterRange, setLayerProperties);
  }, [filterRange]);
  return new TextLayer(layerProperties);
};
export default useTagLayer;
