import type { Layer } from "@deck.gl/core";
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
type Properties = Record<string, unknown>;
/**
 * https://deck.gl/#/documentation/deckgl-api-reference/layers/layer?section=properties
 */
export interface LayerProperties<D = Properties> {
  id?: string;
  data?: D | DataSet<D> | Promise<DataSet<D>> | string;
  visible?: boolean;
  opacity?: number;
  extensions?: [];

  //Interaction Properties
  pickable?: boolean;
  onHover?: LayerInputHandler<D>;
  onClick?: LayerInputHandler<D>;
  onDragStart?: LayerInputHandler<D>;
  onDrag?: LayerInputHandler<D>;
  onDragEnd?: LayerInputHandler<D>;
  highlightColor?: RGBAColor | ((pickInfo: PickInfo<D>) => RGBAColor);
  highlightedObjectIndex?: number;
  autoHighlight?: boolean;

  //Coordinate System Properties
  coordinateSystem?: number;
  coordinateOrigin?: Position;
  wrapLongitude?: boolean;
  modelMatrix?: number;

  //Data Properties
  dataComparator?: (newData: D, oldData: D) => boolean;
  dataTransform?: () => D[] | Iterable<D>;
  _dataDiff?: (newData: D, oldData: D) => { startRow: number; endRow: number };
  positionFormat?: "XYZ" | "XY";
  colorFormat?: "RGBA" | "RGB";
  numInstances?: number;
  updateTriggers?: unknown;
  loaders?: unknown[];
  loadOptions?: unknown;
  onDataLoad?: (value: D[] | Iterable<D>, context: { layer: typeof Layer }) => void;

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
  onViewportLoad?: (data: Tile[]) => void;
  onTileLoad?: (tile: Tile) => void;
  onTileError?: (error: Error) => void;
}
