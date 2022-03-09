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
export const NEW_STYLE = {
  version: 8,
  transition: {
    duration: 300,
    delay: 0
  },
  // glyphs: "https://fonts.openmaptiles.org/{fontstack}/{start}-{end}.pbf",
  glyphs: "https://assets.yuanshen.site/fonts/pbf/{fontstack}/{range}.pbf",
  sources: {
    "raster-tiles": {
      type: "raster",
      // tiles: [
      //   "http://ddns.minemc.top:10010/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=yuanshen:yuanshenMap&transparent=true"
      // ],
      // tiles: ["http://ddns.minemc.top:10101/{z}/{x}/{y}.png"],
      tiles: ["https://assets.yuanshen.site/tiles/geo/{z}/{x}/{y}.png"],
      scheme: "tms",
      tileSize: 256,
      attribution: `Imagination Map`
    }
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "black" }
    },
    {
      id: "tiles_dq",
      type: "raster",
      source: "raster-tiles",
      transition: {
        duration: 300,
        delay: 0
      }
    }
  ]
};
export const S_STYLE = {
  version: 8,
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  sources: {
    places: {
      type: "geojson",
      // tiles: [
      //   "http://ddns.minemc.top:10010/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=yuanshen:yuanshenMap&transparent=true"
      // ],
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              description: "Ford's Theater"
            },
            geometry: {
              type: "Point",
              coordinates: [0, 0]
            }
          }
        ]
      }
    }
  },
  layers: [
    {
      id: "labels",
      type: "symbol",
      source: "places",
      layout: {
        "text-field": ["get", "description"],
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": 0.5,
        "text-justify": "auto",
        "text-font": ["Klokantech Noto Sans Bold"]
      }
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
