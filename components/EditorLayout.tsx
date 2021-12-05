import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  FeatureCollection,
  GeoJsonEditMode,
  ModifyMode,
  ViewMode
} from "@nebula.gl/edit-modes";
import { ReactElement, useRef } from "react";
import Draggable from "react-draggable";
const DownloadButton = ({ data }: { data: FeatureCollection }) => {
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
    const blob = new Blob([JSON.stringify(data)], { type: "octet/stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "latest-region.json";
    a.click();
  };
  return <button onClick={() => download()}>Download</button>;
};

const EditorLayout = ({
  mode,
  setMode,
  setSelectedFeatureIndexes,
  data
}: {
  mode: typeof ViewMode;
  setMode(argument0: unknown): void;
  setSelectedFeatureIndexes(argument0: unknown): void;
  data: FeatureCollection;
}): ReactElement => {
  const nodeReference = useRef(null);
  const selectAll = () => {
    const index = data.features.length;
    setSelectedFeatureIndexes([...Array.from({ length: index }, (v, k) => k)]);
    setMode(() => ModifyMode);
  };

  return (
    <Draggable handle="strong" nodeRef={nodeReference}>
      <div ref={nodeReference} style={{ position: "absolute", top: 0, right: 0, color: "white", background: "blue" }}>
        <strong className="editor-toolsbar-dragger">
          <div>Drag to Move</div>
        </strong>
        <button
          onClick={() => setMode(() => ViewMode)}
          style={{ background: mode === ViewMode ? "#3090e0" : undefined }}
        >
          View
        </button>
        <button
          onClick={() => setMode(() => ModifyMode)}
          style={{ background: mode === ModifyMode ? "#3090e0" : undefined }}
        >
          Modify
        </button>
        <button
          onClick={() => setMode(() => DrawPointMode)}
          style={{ background: mode === DrawPointMode ? "#3090e0" : undefined }}
        >
          Point
        </button>
        <button
          onClick={() => setMode(() => DrawLineStringMode)}
          style={{ background: mode === DrawLineStringMode ? "#3090e0" : undefined }}
        >
          Line
        </button>
        <button
          onClick={() => setMode(() => DrawPolygonMode)}
          style={{ background: mode === DrawPolygonMode ? "#3090e0" : undefined }}
        >
          Polygon
        </button>
        <button
          onClick={() => setMode(() => GeoJsonEditMode)}
          style={{ background: mode === GeoJsonEditMode ? "#3090e0" : undefined }}
        >
          Select
        </button>
        <button onClick={selectAll} style={{ background: mode === GeoJsonEditMode ? "#3090e0" : undefined }}>
          Select All
        </button>
        <DownloadButton data={data} />
      </div>
    </Draggable>
  );
};
export default EditorLayout;
