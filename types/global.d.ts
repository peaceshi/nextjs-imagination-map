// global.d.ts should NOT have any import directly.
/// <reference types="jest-extended" />
/// <reference types="geojson" />
/**
 * DeckGL InitialViewState
 */
declare interface InitialViewState {
  /**
   * The world position at the center of the viewport.
   *
   * Default `[0, 0, 0]`.
   */
  target: [number, number, number];
  /**
   * The zoom level of the viewport.
   *
   * `zoom: 0` maps one unit distance to one pixel on screen, and increasing `zoom` by `1` scales the same object to twice as large.
   *
   * To apply independent zoom levels to the X and Y axes, supply an array `[zoomX, zoomY]`.
   *
   * Default `0`.
   */
  zoom: number;
  /**
   * The max zoom level of the viewport.
   *
   * Default `Infinity`.
   */
  maxZoom: number;
  /**
   * The min zoom level of the viewport.
   *
   * Default `-Infinity`.
   */
  minZoom: number;
}
declare interface TagJSON extends GeoJSON {
  type: "FeatureCollection";
  features: Array<Feature<Point, { id: string; properties: { region: number } }>>;
}
declare interface TileJSON {
  baseUrl: string;
  tileName: string;
  tileLevel: number;
  tileRegion: string;
  tileSize: number;
  minZoomNative: number;
  maxZoomNative: number;
  width: number;
  height: number;
  version: number;
  extName: string;
}
declare interface TileJSONCollection {
  [key: string]: TileJSON;
}
