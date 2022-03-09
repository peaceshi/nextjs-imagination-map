/* eslint-disable @typescript-eslint/no-empty-function */
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { CSSProperties } from "react";
import type { ControlPosition, MapRef } from "react-map-gl";
import { useControl } from "react-map-gl";

type ControlTypes = "point" | "line_string" | "polygon" | "trash" | "combine_features" | "uncombine_features";

export const DownloadButton = ({ data, style }: { data: any; style: CSSProperties }) => {
  const download = () => {
    // const initialJson: FeatureCollection = {
    //   id: "initial-geojson",
    //   type: "FeatureCollection",
    //   features: []
    // };
    // for (const feature of data.features) {
    //   initialJson.features.push({
    //     type: "Feature",
    //     id: feature.properties.image.id,
    //     properties: {
    //       region: feature.properties.region
    //     },
    //     geometry: {
    //       type: feature.geometry.type,
    //       coordinates: new Vector2(feature.geometry.coordinates[0], feature.geometry.coordinates[1])
    //         .scale(1 / 3)
    //         .toArray()
    //     }
    //   });
    // }
    console.log(data);
    const blob = new Blob([JSON.stringify(data)], { type: "octet/stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "latest-region.json";
    a.click();
  };
  return (
    <button style={style} onClick={() => download()}>
      Download
    </button>
  );
};
type DrawControlProps = {
  keybindings?: boolean;
  touchEnable?: boolean;
  boxSelect?: boolean;
  clickBuffer?: number;
  touchBuffer?: number;
  controls?: Partial<{ [name in ControlTypes]: boolean }>;
  displayControlsDefault?: boolean;
  styles?: any;
  modes?: any;
  defaultMode?: string;
  userProperties?: boolean;

  position?: ControlPosition;

  onCreate: (event: { features: object[] }) => void;
  onUpdate: (event: { features: object[]; action: string }) => void;
  onDelete: (event: { features: object[] }) => void;
};

export const DrawControl = (props: DrawControlProps) => {
  useControl(
    ({ map }: { map: MapRef }) => {
      map.on("draw.create", props.onCreate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
      return new MapboxDraw(props);
    },
    ({ map }: { map: MapRef }) => {
      map.off("draw.create", props.onCreate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
    },
    {
      position: props.position
    }
  );

  // eslint-disable-next-line unicorn/no-null
  return null;
};

DrawControl.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCreate: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUpdate: () => {},
  onDelete: () => {}
};
