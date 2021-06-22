import { IconLayerProperties } from "@lib/Interface";
import { IconLayer } from "deck.gl";
import { useMemo } from "react";
export const useIconLayer = (properties: IconLayerProperties): IconLayer<IconLayerProperties> => {
  const diff = useMemo(
    () => ({
      getColor: properties.getColor,
      transitions: properties.transitions
    }),
    [properties.getColor, properties.transitions]
  );
  //@ts-expect-error: Bad types define
  return new IconLayer({ ...properties, diff });
};
