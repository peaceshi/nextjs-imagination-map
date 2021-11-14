import { Tile } from "@lib/Interface";
import { load } from "@loaders.gl/core";
import { ImageLoader } from "@loaders.gl/images";
import tileMeta from "@settings/tileMeta.json";
import { checkGameMap } from "@utils/utils";

type tileXYZ = Pick<Tile, "x" | "y" | "z">;

type TileMeta = typeof tileMeta.dq3;
const version = `?version=${checkGameMap()}`;

const fetchOptions = {
  fetch: {
    headers: { Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" }
  }
};
const fetchData = async ({ x, y, z }: tileXYZ, Meta: TileMeta): Promise<[]> => {
  const url = `${Meta.baseUrl}/${Meta.tileName}/${z + Meta.tileLevel}/${x}_${y}.jpg${version}?region=${
    Meta.tileRegion
  }`;
  return localStorage.getItem("webp") === "true"
    ? ((await load(url, ImageLoader, fetchOptions)) as Promise<[]>)
    : ((await load(url, ImageLoader)) as Promise<[]>);
};

export const fetchTileData = async ({ x, y, z }: tileXYZ, tileUrlIndex: TileMeta): Promise<[]> => {
  return await fetchData({ x, y, z }, tileUrlIndex);
};
export default fetchTileData;
