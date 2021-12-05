import { fetchJSON } from "@lib/fetchData";
import type { FeatureCollection } from "@nebula.gl/edit-modes";
import type { NextApiRequest, NextApiResponse } from "next";

const url = "https://assets.yuanshen.site/data/json/latest-region.json";

export default async (request: NextApiRequest, response: NextApiResponse<FeatureCollection>) => {
  const { meta } = request.query;
  // console.log(meta);
  return response.status(200).json(await fetchJSON(url));
};
