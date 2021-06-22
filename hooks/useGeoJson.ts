import { fetchGeoJson } from "@lib/fetchData";
import { FeatureCollection } from "@nebula.gl/edit-modes";
import { useEffect, useState } from "react";
const initialGeoJson: FeatureCollection = {
  id: "initial-geojson",
  type: "FeatureCollection",
  features: []
};
export const useGeoJson = (url: string): FeatureCollection => {
  const [geoJson, setGeoJson] = useState<FeatureCollection>(() => initialGeoJson);
  useEffect(() => {
    void (async () => {
      const region = await fetchGeoJson(url);
      setGeoJson(region);
    })();
  }, [setGeoJson, url]);
  return geoJson;
};
