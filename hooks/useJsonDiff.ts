import { fetchJSON } from "@lib/fetchData";
import { FeatureCollectionWithProperties, FeatureProperties } from "@lib/Interface";
import { FeatureWithProps, Geometry } from "@nebula.gl/edit-modes";
import { useMemo, useState } from "react";

/**
 *
 * @param original The latest image with it indexed id.
 * @param changed The user defined Position data.
 * @returns FeatureCollection
 */
const calcDiff = async (
  original: FeatureCollectionWithProperties,
  changed: FeatureCollectionWithProperties
): Promise<Set<FeatureWithProps<Geometry, FeatureProperties>>[]> => {
  const region = [new Set(), new Set(), new Set()] as Set<FeatureWithProps<Geometry, FeatureProperties>>[];
  //   const changedId = new Set<string>();
  //   for await (const item of changed.features) {
  //     changedId.add(item.properties?.image?.id);
  //     console.log(item.properties?.image?.id);
  //   }
  void Promise.all([original, changed]);
  for await (const originalItem of original.features) {
    const originalId = originalItem.properties?.image?.id;
    // console.log(changedId);
    //old do not have new id.
    // if (!changedId.has(originalId.toString())) {
    //   console.error(`Admin needs to update server data: ${originalId}`);
    // }
    for await (const changedItem of changed.features) {
      if (changedItem?.properties?.image?.id == originalId) {
        originalItem.geometry = changedItem.geometry;
      }
      switch (originalItem?.properties?.image?.id) {
        case "璃月":
        case "蒙德":
          originalItem.properties.region = 1;
          region[0].add(originalItem);
          break;
        case "碧水原":
        case "琼玑野":
        case "珉林":
        case "璃沙郊":
        case "云来海":
        case "龙脊雪山":
        case "明冠山地":
        case "苍风高地":
        case "坠星山谷":
        case "风啸山坡":
          originalItem.properties.region = 2;
          region[1].add(originalItem);
          break;
        default:
          //   item.properties.region = 3;
          region[2].add(originalItem);
      }
    }
  }
  return region;
};
export const useJsonDiff = (
  original: string,
  changed: string
): Set<FeatureWithProps<Geometry, FeatureProperties>>[] => {
  const [geoJson, setGeoJson] = useState<Set<FeatureWithProps<Geometry, FeatureProperties>>[]>([]);
  //   const [fetchDiff] = useWorker(calcDiff);
  useMemo(() => {
    void (async () => {
      const diff = await calcDiff(await fetchJSON(original), await fetchJSON(changed));
      setGeoJson(diff);
    })();
  }, [changed, original]);
  return geoJson;
};
