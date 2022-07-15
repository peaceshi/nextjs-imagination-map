/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Flex } from "@chakra-ui/react";
import { DownloadButton, DrawControl } from "@components/DrawControl";
import { NEW_STYLE } from "@lib/styles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useState } from "react";
import type { MapProps } from "react-map-gl";
import Map, { FullscreenControl, Layer, Source } from "react-map-gl";

type IMapInitialViewState = MapProps["initialViewState"];

const initialViewState: IMapInitialViewState = {
  latitude: 0,
  longitude: 0,
  zoom: 16,
  bearing: 0,
  pitch: 0,
  padding: { top: 10, bottom: 10, left: 10, right: 10 }
};

export const MapLayout = () => {
  const [features, setFeatures] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          description: "璃月港A8翠玦\nGgLlIi\n寄了JjPpQqYy寄了",
          name_en: "abcde",
          name_ja: "あいうえお",
          name_ch: "阿衣乌唉哦",
          name_kr: "아이우",
          id: 1
        },
        geometry: {
          type: "Point",
          coordinates: [0.0025, 0.001]
        }
      },
      {
        type: "Feature",
        properties: {
          description: "表演蒙德222's ATheater ",
          id: 2
        },
        geometry: {
          type: "Point",
          coordinates: [0.0105, 0.0105]
        }
      }
    ]
  });

  const onUpdate = useCallback((event) => {
    setFeatures((currentFeatures) => {
      const newFeatures = { ...currentFeatures };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      for (const f of event.features) {
        //@ts-expect-error: type
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((event) => {
    setFeatures((currentFeatures) => {
      const newFeatures = { ...currentFeatures };
      for (const f of event.features) {
        //@ts-expect-error: type
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  return (
    <Flex w="100vw" h="100vh">
      <Map
        mapLib={maplibregl}
        initialViewState={initialViewState}
        maxBounds={[-0.03217359309655564, -0.09078576177883144, 0.07823951528296658, 0.05648160028151732]}
        //@ts-expect-error: type
        mapStyle={NEW_STYLE}
        maxZoom={17}
        minZoom={13}
        localIdeographFontFamily="'HYWenHei 85W'"
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          userProperties={true}
          controls={{
            polygon: true,
            point: true,
            combine_features: true,
            line_string: true,
            uncombine_features: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <FullscreenControl />
        <Source id="places" type="geojson" data={features}>
          <Layer
            id="labels"
            type="symbol"
            source="places"
            filter={["==", "id", 2]}
            layout={{
              "text-allow-overlap": true,
              "text-field": ["get", "description"],
              "text-size": 40,
              "text-font": ["HYWenHei 85W"]
            }}
            paint={{
              "text-color": "rgb(236, 236, 236)",
              "text-halo-width": 0.15,
              "text-halo-blur": 0.5,
              "text-halo-color": "rgba(0, 0, 0, 76)"
            }}
            minzoom={14.5}
            // maxzoom={17}
          />
        </Source>
        <Source
          id="geojson-layer"
          type="geojson"
          data={{
            type: "Feature",
            properties: {
              description: "表演蒙德222's ATheater ",
              id: 2
            },
            geometry: {
              type: "Polygon",
              // These coordinates outline Maine.
              coordinates: [
                [
                  [0, 0],
                  [0, 0.01],
                  [0.01, 0],
                  [0, 0]
                ]
              ]
            }
          }}
        >
          <Layer
            id="poly"
            type="fill"
            source="geojson-layer"
            paint={{
              "fill-color": "#1494ef", // blue color fill
              "fill-opacity": 0.2
            }}
          />
          <Layer
            id="outline"
            type="line"
            source="geojson-layer"
            paint={{
              "line-color": "#1494ef", // blue color fill
              "line-opacity": 0.84,
              "line-width": 3
            }}
          />
        </Source>
        <DownloadButton style={{ height: "100px", width: "100px", position: "absolute" }} data={features} />
      </Map>
    </Flex>
  );
};

export { MapLayout as default };
