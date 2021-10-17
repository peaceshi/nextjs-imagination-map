import { load } from "@loaders.gl/core";
import { ImageLoader } from "@loaders.gl/images";
import { JSONLoader } from "@loaders.gl/json";
import { FeatureCollection } from "@nebula.gl/edit-modes";
import { checkGameMap } from "@utils/utils";
import { Tile } from "./Interface";

export const fetchDziMeta = async (dziSource: string): Promise<{ height: number; width: number; tileSize: number }> => {
  const response = await fetch(dziSource);
  const xmlText = await response.text();
  if (!response.ok || !xmlText) {
    throw new Error(`fetch failed, ${response.toString()}`);
  }
  const dziXML = new DOMParser().parseFromString(xmlText, "text/xml");
  const height = Number(dziXML.querySelectorAll("Size")[0].getAttribute("Height".valueOf())) * 2;
  const width = Number(dziXML.querySelectorAll("Size")[0].getAttribute("Width".valueOf())) * 2;
  const tileSize = Number(dziXML.querySelectorAll("Image")[0].getAttribute("TileSize".valueOf()));
  return { height, width, tileSize };
};

const version = `?version=${checkGameMap()}`;
const fetchOptions = { fetch: { headers: { Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" } } };
const baseUrl = `https://assets.yuanshen.site`;

export const fetchTileData = async ({ x, y, z }: Pick<Tile, "x" | "y" | "z">, tileUrlIndex: number): Promise<[]> => {
  switch (tileUrlIndex) {
    case 1:
      return (await load(
        `${baseUrl}/tiles_qd1/${z + 14}/${x}_${y}.jpg${version}?region=qd`,
        ImageLoader,
        fetchOptions
      )) as Promise<[]>;
    case 2:
      return (await load(
        `${baseUrl}/tiles_qd1/${z + 14}/${x}_${y}.jpg${version}?region=qd1`,
        ImageLoader,
        fetchOptions
      )) as Promise<[]>;
    default:
      return (await load(
        `${baseUrl}/tiles_dq3/${z + 13}/${x}_${y}.jpg${version}?region=Teyvat`,
        ImageLoader,
        fetchOptions
      )) as Promise<[]>;
  }
};
export const fetchGeoJson = async (url: string): Promise<FeatureCollection> => {
  return (await load(url, JSONLoader)) as Promise<FeatureCollection>;
};
