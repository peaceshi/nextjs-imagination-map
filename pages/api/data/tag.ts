import { load } from "@loaders.gl/core";
import { JSONLoader } from "@loaders.gl/json";
import type { FeatureCollection } from "@nebula.gl/edit-modes";
import type { NextApiRequest, NextApiResponse } from "next";

const url = "https://assets.yuanshen.site/data/json/latest-region.json";
const fetchGeoJson = async (url: string): Promise<FeatureCollection> => {
  return (await load(url, JSONLoader)) as Promise<FeatureCollection>;
};

export default async (request: NextApiRequest, response: NextApiResponse<FeatureCollection>) => {
  return response.status(200).json(await fetchGeoJson(url));
};
