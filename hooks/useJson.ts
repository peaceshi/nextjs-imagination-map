import { FeatureCollection } from "@nebula.gl/edit-modes";
import useSWR from "swr";

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch JSON error: {${response.status} :${response.statusText}}`);
  }
  return (await response.json()) as Promise<T>;
};

export const useGeoJSON = (api: string) => {
  const swr = useSWR<FeatureCollection>(api, fetcher, {
    fallbackData: {
      id: "initial-geojson",
      type: "FeatureCollection",
      features: []
    },
    suspense: true
  });
  return swr;
};

export const useJSON = (api: string) => {
  const swr = useSWR(api, fetcher, {
    fallbackData: {},
    suspense: true
  });
  return swr;
};
