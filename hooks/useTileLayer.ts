import type { TileLayerProperties } from "@lib/Interface";
import { TileLayer } from "@deck.gl/geo-layers";

import { useEffect, useMemo, useState } from "react";

export const useTileLayer = (properties: TileLayerProperties): TileLayer<TileLayerProperties> => {
  const [diffProperties, setDiffProperties] = useState({});

  const diff = useMemo(
    () => ({
      // getTileData: properties.getTileData,
      renderSubLayers: properties.renderSubLayers
    }),
    [properties.renderSubLayers]
  );

  // setDiffProperties(diff);
  //@ts-expect-error: Bad types define
  return new TileLayer({ ...properties, diff });
};
