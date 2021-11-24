import type { FeatureCollection } from "@nebula.gl/edit-modes";
import useSWR from "swr";

const fallbackData: FeatureCollection = {
  id: "initial-geojson",
  type: "FeatureCollection",
  features: []
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch geoJson error: {${response.status} :${response.statusText}}`);
  }
  return (await response.json()) as FeatureCollection;
};

export const useGeoJson = (api: string) => {
  const swr = useSWR(api, fetcher, {
    fallbackData: fallbackData
  });
  return { ...swr, fallbackData };
};
export default useGeoJson;
