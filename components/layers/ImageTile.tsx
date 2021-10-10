/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from "react";

import DeckGL, { OrthographicView, COORDINATE_SYSTEM } from "deck.gl";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { load } from "@loaders.gl/core";
import { clamp } from "math.gl";

const INITIAL_VIEW_STATE = {
  target: [13000, 13000, 0],
  zoom: -7
};

//@ts-expect-error: Bad types define
function getTooltip({tile, bitmap}) {
  if (tile && bitmap) {
    return `\
    tile: x: ${tile.x}, y: ${tile.y}, z: ${tile.z}
    (${bitmap.pixel[0]},${bitmap.pixel[1]}) in ${bitmap.size.width}x${bitmap.size.height}`;
  }
  return ;
}

const ROOT_URL = "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/image-tiles/moon.image";
//@ts-expect-error: Bad types define
export default function ImageTileLayer({ autoHighlight = true, onTilesLoad }) {
  const [dimensions, setDimensions] = useState();

  useEffect(() => {
    const getMetaData = async () => {
      const dziSource = `${ROOT_URL}/moon.image.dzi`;
      const response = await fetch(dziSource);
      const xmlText = await response.text();
      const dziXML = new DOMParser().parseFromString(xmlText, "text/xml");
      //@ts-expect-error: Bad types define
      if (Number(dziXML.querySelectorAll("Image")[0].attributes.Overlap.value) !== 0) {
        // eslint-disable-next-line no-undef, no-console
        console.warn("Overlap parameter is nonzero and should be 0");
      }
      setDimensions({
        //@ts-expect-error: Bad types define
        height: Number(dziXML.querySelectorAll("Size")[0].attributes.Height.value), //@ts-expect-error: Bad types define
        width: Number(dziXML.querySelectorAll("Size")[0].attributes.Width.value), //@ts-expect-error: Bad types define
        tileSize: Number(dziXML.querySelectorAll("Image")[0].attributes.TileSize.value)
      });
    };
    void getMetaData();
  }, []);

  const tileLayer =
    dimensions &&
    new TileLayer({
      pickable: autoHighlight, //@ts-expect-error: Bad types define
      tileSize: dimensions.tileSize,
      autoHighlight,
      highlightColor: [60, 60, 60, 100],
      minZoom: -7,
      maxZoom: 0,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, //@ts-expect-error: Bad types define
      extent: [0, 0, dimensions.width, dimensions.height],
      getTileData: ({ x, y, z }) => {
        return load(`${ROOT_URL}/moon.image_files/${15 + z}/${x}_${y}.jpeg`);
      },
      onViewportLoad: onTilesLoad,

      renderSubLayers: (properties) => {
        const {
          bbox: { left, bottom, right, top }
        } = properties.tile;
        const { width, height } = dimensions;
        return new BitmapLayer(properties, {
          data: undefined,
          image: properties.data,
          bounds: [clamp(left, 0, width), clamp(bottom, 0, height), clamp(right, 0, width), clamp(top, 0, height)]
        });
      }
    });

  return (
    <DeckGL
      views={[new OrthographicView({ id: "ortho" })]} //@ts-expect-error: Bad types define
      layers={[tileLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}//@ts-expect-error: Bad types define
      getTooltip={getTooltip}
    />
  );
}
