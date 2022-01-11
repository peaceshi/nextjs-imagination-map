import { fetchJSON } from "@lib/fetchData";
import type { NextApiRequest, NextApiResponse } from "next";

const url = "https://assets.yuanshen.site/data/json/tileMeta.json";
type Response = NextApiResponse<TileJSON | TileJSONCollection | { error: string }>;
type QueryRequest = NextApiRequest["query"];
const querySelector = (data: TileJSONCollection, query: QueryRequest, response: Response) => {
  if (query.meta == undefined) {
    return response.status(200).json(data);
  } else if (query.meta[0]) {
    switch (query.meta[0].toString()) {
      case "qd":
        return response.status(200).json(data.qd);
      case "qd1":
        return response.status(200).json(data.qd1);
      case "dq3":
      case "editor":
      default:
        return response.status(200).json(data.dq3);
    }
  } else {
    return response.status(400).json({ error: "Invalid meta" });
  }
};
const API = async (
  request: NextApiRequest,
  response: NextApiResponse<TileJSON | TileJSONCollection | { error: string }>
) => {
  const data = await fetchJSON<TileJSONCollection>(url);
  const { query } = request;
  querySelector(data, query, response);
};
export default API; // Next api must be exported as default.
