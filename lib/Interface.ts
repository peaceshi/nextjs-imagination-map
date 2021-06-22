import type { Layer } from "@deck.gl/core";
import Texture2D from "@luma.gl/webgl/classes/texture-2d";
import { BoundingBoxArray, FeatureWithProps, Geometry, Point } from "@nebula.gl/edit-modes";
export type WidthUnits = "meters" | "pixels";
export type Position2D = [number, number];
export type Position3D = [number, number, number];
export type Position = Position2D | Position3D;
export type RGBAColor = [number, number, number, number?];
export type DataSet<D> = Iterable<D>;
/**
 * [left, bottom, right, top] or [minX, minY, maxX, maxY]
 */
export type ExtentsLeftBottomRightTop = [number, number, number, number];
export interface BaseTransitionTiming {
  enter?: (v: number) => number;
  onStart?: () => void;
  onEnd?: () => void;
  onInterrupt?: () => void;
}
export interface InterpolationTransitionTiming extends BaseTransitionTiming {
  type: "interpolation";
  duration: number;
  easing?: (t: number) => number;
}
export interface SpringTransitionTiming extends BaseTransitionTiming {
  type: "spring";
  stiffness: number;
  damping: number;
}
export type TransitionTiming = InterpolationTransitionTiming | SpringTransitionTiming;
export interface MapLayerPropertiesType {
  autoHighlight: boolean;
  onTilesLoad: undefined;
  showBorder: boolean;
}
export interface DimensionsType {
  height: number;
  width: number;
  tileSize: number;
}
export interface Bbox {
  left: number;
  bottom: number;
  right: number;
  top: number;
}
export interface TileLayersSubProperties extends TileLayerProperties {
  id: string;
  tile: Tile;
}
export interface LayersVisibleType {
  textLayer1?: boolean;
  textLayer2?: boolean;
  textLayer3?: boolean;
}
export interface TextDataType {
  text: string;
  position: [number, number];
}
export interface TextLayerPropertiesType {
  data?: TextDataType[];
  characterSet: string[];
  fontFamily: string;
  fontWeight: string;
  sizeUnits: WidthUnits;
  pickable: boolean;
  getText: (data: TextDataType) => string;
  getPosition: (data: TextDataType) => [number, number];
  getColor: [number, number, number];
}

export interface LayerInputHandler<D = Record<string, unknown>> {
  (o: PickInfo<D>, event: HammerInput): unknown;
}
export interface PickInfo<D> {
  layer: typeof Layer;
  index: number;
  object: D;
  x: number;
  y: number;
  coordinate?: Position;
  picked?: boolean;
}
/**
 * https://deck.gl/#/documentation/deckgl-api-reference/layers/layer?section=properties
 */
// export interface LayerProperties<D = Properties> {
//   id?: string;
//   data?: D | DataSet<D> | Promise<DataSet<D>> | string;
//   visible?: boolean;
//   opacity?: number;
//   extensions?: [];

//   //Interaction Properties
//   pickable?: boolean;
//   onHover?: LayerInputHandler<D>;
//   onClick?: LayerInputHandler<D>;
//   onDragStart?: LayerInputHandler<D>;
//   onDrag?: LayerInputHandler<D>;
//   onDragEnd?: LayerInputHandler<D>;
//   highlightColor?: RGBAColor | ((pickInfo: PickInfo<D>) => RGBAColor);
//   highlightedObjectIndex?: number;
//   autoHighlight?: boolean;

//   //Coordinate System Properties
//   coordinateSystem?: number;
//   coordinateOrigin?: Position;
//   wrapLongitude?: boolean;
//   modelMatrix?: number;

//   //Data Properties
//   dataComparator?: (newData: D, oldData: D) => boolean;
//   dataTransform?: () => D[] | Iterable<D>;
//   _dataDiff?: (newData: D, oldData: D) => { startRow: number; endRow: number };
//   positionFormat?: "XYZ" | "XY";
//   colorFormat?: "RGBA" | "RGB";
//   numInstances?: number;
//   updateTriggers?: unknown;
//   loaders?: unknown[];
//   loadOptions?: unknown;
//   onDataLoad?: (value: D[] | Iterable<D>, context: { layer: typeof Layer }) => void;

//   //Render Properties
//   parameters?: () => unknown;
//   getPolygonOffset?: (uniform: unknown) => [number, number];
//   transitions?: { [attributeGetter: string]: TransitionTiming };
// }
export interface LayerProperties {
  id?: string;
  data?: unknown | DataSet<unknown> | Promise<DataSet<unknown>> | string;
  visible?: boolean;
  opacity?: number;
  extensions?: [];

  //Interaction Properties
  pickable?: boolean;
  onHover?: LayerInputHandler;
  onClick?: LayerInputHandler;
  onDragStart?: LayerInputHandler;
  onDrag?: LayerInputHandler;
  onDragEnd?: LayerInputHandler;
  highlightColor?: RGBAColor | ((pickInfo: PickInfo<unknown>) => RGBAColor);
  highlightedObjectIndex?: number;
  autoHighlight?: boolean;

  //Coordinate System Properties
  coordinateSystem?: number;
  coordinateOrigin?: Position;
  wrapLongitude?: boolean;
  modelMatrix?: number;

  //Data Properties
  dataComparator?: (newData: unknown, oldData: unknown) => boolean;
  dataTransform?: () => unknown[] | Iterable<unknown>;
  _dataDiff?: (newData: unknown, oldData: unknown) => { startRow: number; endRow: number };
  positionFormat?: "XYZ" | "XY";
  colorFormat?: "RGBA" | "RGB";
  numInstances?: number;
  updateTriggers?: unknown;
  loaders?: unknown[];
  loadOptions?: unknown;
  onDataLoad?: (value: unknown[] | Iterable<unknown>, context: { layer: typeof Layer }) => void;

  //Render Properties
  parameters?: () => unknown;
  getPolygonOffset?: (uniform: unknown) => [number, number];
  transitions?: { [attributeGetter: string]: TransitionTiming };
}
/**
 * Tags whose meaning is defined by the TSDoc standard.
 */
export interface Tile {
  x: number;
  y: number;
  z: number;
  url: string;
  bbox: Bbox;
}
export interface TileLayerProperties extends LayerProperties {
  // Data Options
  getTileData?: (tile: Tile) => [] | Promise<[]> | null;
  tileSize?: number;
  maxZoom?: number | null;
  minZoom?: number;
  maxCacheSize?: number;
  maxCacheByteSize?: number;
  refinementStrategy?: "best-available" | "no-overlap" | "never";
  maxRequests?: number;
  extent?: ExtentsLeftBottomRightTop;

  //Render Options
  renderSubLayers?: (properties: TileLayersSubProperties) => Layer<unknown> | Layer<unknown>[];
  zRange?: [number, number];

  //Callbacks
  onViewportLoad?: (data: unknown[]) => void;
  onTileLoad?: (tile: unknown) => void;
  onTileError?: (error: Error) => void;
}
export interface IconDefinitionBase {
  width: number;
  height: number;
  /*
   * x anchor of icon on the atlas image,
   * default to width / 2
   */
  anchorX?: number;
  /*
   * y anchor of icon on the atlas image,
   * default to height / 2
   */
  anchorY?: number;
  /*
   * whether icon is treated as a transparency
   * mask. If true, user defined color is applied. If false, original color from the image is
   * applied. Default to false.
   */
  mask?: boolean;
}
export interface IconDefinition extends IconDefinitionBase {
  x: number;
  y: number;
}
export interface IconMapping {
  [key: string]: IconDefinition;
}
export interface ObjectInfo<D, T> {
  // the index of the current iteration
  index: number;
  // the value of the 'data' prop on the layer.
  data: DataSet<D> | Promise<DataSet<D>> | string;
  // a pre-allocated array.
  // the accessor function can optionally fill data into this array and
  // return it, instead of creating a new array for every object.
  // In some browsers this improves performance significantly by
  // reducing garbage collection.
  target: T[];
}
export interface IconLayerProperties extends LayerProperties {
  iconAtlas?: Texture2D | string;
  iconMapping?: IconMapping;
  sizeScale?: number;
  sizeUnits?: WidthUnits;
  sizeMinPixels?: number;
  sizeMaxPixels?: number;
  billboard?: boolean;
  alphaCutoff?: number;

  //Data Accessors
  getIcon?: (
    x: FeatureWithProps<Geometry, FeatureProperties>
  ) => string | ({ url: string; id?: string } & IconDefinitionBase);
  getPosition?: (x: FeatureWithProps<Point, FeatureProperties>, objectInfo: ObjectInfo<unknown, Position>) => Position;
  getSize?: ((x: unknown, objectInfo: ObjectInfo<unknown, number>) => number) | number;
  getColor?: ((x: unknown, objectInfo: ObjectInfo<unknown, RGBAColor>) => RGBAColor) | RGBAColor;
  getAngle?: ((x: unknown, objectInfo: ObjectInfo<unknown, number>) => number) | number;
  getPixelOffset?: ((x: unknown, objectInfo: ObjectInfo<unknown, Position2D>) => Position2D) | Position2D;
}

export type FeatureCollectionWithProperties = {
  type: "FeatureCollection";
  features: FeatureWithProps<Geometry, FeatureProperties>[];
  properties?: Record<string, unknown>;
  id?: string | number;
  bbox?: BoundingBoxArray;
};

export interface FeatureProperties {
  image: { url: string; id: string } & IconDefinitionBase;
  region: number;
}
