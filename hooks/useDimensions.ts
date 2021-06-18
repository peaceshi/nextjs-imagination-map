import type { DimensionsType } from "@lib/Interface";
import { useState, useEffect } from "react";
import { fetchDziMeta } from "@lib/fetchData";
export const useDimensions = (dziSource: string): DimensionsType => {
  const [dimensions, setDimensions] = useState<DimensionsType>(() => {
    return {
      height: 12288 * 2,
      width: 12288 * 2,
      tileSize: 256
    };
  });
  // useEffect(() => {
  //   void (async () => {
  //     const dziXMLData = await fetchDziMeta(dziSource);
  //     setDimensions(dziXMLData);
  //   })();
  // }, [dziSource]);
  return dimensions;
};
