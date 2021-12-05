import { load } from "@loaders.gl/core";
import { JSONLoader } from "@loaders.gl/json";

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

export const fetchJSON = async <T>(url: string): Promise<T> => {
  return (await load(url, JSONLoader)) as Promise<T>;
};
