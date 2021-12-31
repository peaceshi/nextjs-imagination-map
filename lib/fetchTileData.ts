import type { Tile } from "@lib/Interface";
import { load } from "@loaders.gl/core";
import { ImageLoader } from "@loaders.gl/images";
import { checkGameMap } from "@utils/utils";

type TileXYZ = Pick<Tile, "x" | "y" | "z">;

type TileMeta = TileJSON;
const version = `${checkGameMap()}`;

const fetchOptions = {
  fetch: {
    headers: { Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" }
  }
};
export const fetchTileData = async ({ x, y, z }: TileXYZ, Meta: TileMeta): Promise<[]> => {
  const url = `${Meta.baseUrl}/${Meta.tileName}/${z + Meta.tileLevel}/${x}_${y}.jpg?version=${version}&region=${
    Meta.tileRegion
  }`;
  return localStorage.getItem("webp") === "true"
    ? ((await load(url, ImageLoader, fetchOptions)) as Promise<[]>)
    : ((await load(url, ImageLoader)) as Promise<[]>);
};
export { fetchTileData as default };
