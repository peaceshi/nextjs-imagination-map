import { load } from "@loaders.gl/core";
import { ImageLoader } from "@loaders.gl/images";
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

export const fetchTileData = async ({ x, y, z }: Pick<Tile, "x" | "y" | "z">): Promise<[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (await load(`https://assets.yuanshen.site/tiles/map.image_files/${14 + z}/${x}_${y}.png`, ImageLoader, {
    worker: true,
    reuseWorkers: true
  })) as Promise<[]>;
};
