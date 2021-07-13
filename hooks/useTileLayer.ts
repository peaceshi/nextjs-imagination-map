import { TileLayer } from "@deck.gl/geo-layers";
import type { TileLayerProperties } from "@lib/Interface";
import { useMemo } from "react";

// class TileLayerEx extends TileLayer<D, P extends TileLayerProps<D> = TileLayerProps<D>> {}
export const useTileLayer = (properties: TileLayerProperties): TileLayer<TileLayerProperties> => {
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
