export const Teyvat_STYLE = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: ["https://assets.yuanshen.site/tiles_dq/{z}/ppp{x}_{y}.jpg"],
      tileSize: 256,
      attribution: `Imagination Map`
    }
  },
  layers: [
    {
      id: "tiles_dq",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 20
    }
  ]
};
export const QD_STYLE = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: ["https://assets.yuanshen.site/tiles_qd/{z}/ppp{x}_{y}.jpg"],
      tileSize: 256,
      attribution: `Imagination Map`
    }
  },
  layers: [
    {
      id: "tiles_qd",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 20
    }
  ]
};
export const QD1_STYLE = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: ["https://assets.yuanshen.site/tiles_qd1/{z}/ppp{x}_{y}.jpg"],
      tileSize: 256,
      attribution: `Imagination Map`
    }
  },
  layers: [
    {
      id: "tiles_qd1",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 20
    }
  ]
};

export const geolocateControlStyle = {
  right: 10,
  top: 10
};
export const scaleControlStyle = {
  left: 20,
  bottom: 100
};
export const attributionStyle = {
  right: 0,
  bottom: 0
};
export const fullscreenControlStyle = {
  right: 10,
  top: 10
};
export const navControlStyle = {
  right: 10,
  top: 80
};
