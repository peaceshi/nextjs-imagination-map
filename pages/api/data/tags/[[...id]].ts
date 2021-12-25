import { fetchJSON } from "@lib/fetchData";
import type { NextApiRequest, NextApiResponse } from "next";

const url = "https://assets.yuanshen.site/data/json/latest-region.json";

const API = async (request: NextApiRequest, response: NextApiResponse<TagJSON>) => {
  const { id } = request.query;
  return response.status(200).json(await fetchJSON<TagJSON>(url));
};

export default API; // Next api must be exported as default.
