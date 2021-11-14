import { DataFilterExtension } from "@deck.gl/extensions";
import { ScatterplotLayer, ScatterplotLayerProps } from "@deck.gl/layers";
import { RGBAColor } from "deck.gl";
import { useCallback, useEffect, useRef, useState } from "react";

const data = ((pointCount: number) => {
  const points = [];
  for (let index = 0, a = 0, r = 1; index < pointCount; index++) {
    points.push({
      position: [10 * Math.cos(a) * r, 10 * Math.sin(a) * r],
      color: [((Math.cos(a) + 1) / 2) * 255, ((Math.sin(a) + 1) / 2) * 255, 128],
      time: index
    });
    a += Math.PI / r;
    r += 2 / r;
  }
  return points;
})(100000);

type Data = typeof data[number];
type Layer = ScatterplotLayer<Data, ScatterplotLayerProps<Data>>;

const initialLayer: Array<Layer> = [
  new ScatterplotLayer({
    id: "all",
    data: data,
    getPosition: (d: Data) => [d.position[0] + 6144, d.position[1] + 6144],
    getRadius: 0.5,
    getFillColor: [0, 0, 0, 0],
    radiusMaxPixels: 1
  })
];
const intervalMS = 10;
const filterSpan = 5000;
const maxTime = data[data.length - 1].time;
export const useAnimation = (): Array<Layer> => {
  const [filterMin, setFilterMin] = useState(-filterSpan);
  const [layer, setLayer] = useState<Array<Layer>>(() => initialLayer);
  const animationFrameID = useRef<number>(0);
  const animate = useCallback(() => {
    if (filterMin < maxTime) {
      setFilterMin(filterMin + 10);
    } else {
      setFilterMin(-filterSpan);
    }
    setLayer([
      new ScatterplotLayer({
        id: "filtered",
        data,
        getPosition: (d: Data) => [d.position[0] + 6144, d.position[1] + 6144],
        getRadius: 20,
        getFillColor: (d: Data) => d.color as RGBAColor,

        // props added by DataFilterExtension
        getFilterValue: (d: Data) => d.time,
        filterRange: [filterMin, filterMin + filterSpan],
        filterSoftRange: [filterMin + filterSpan * 0.8, filterMin + filterSpan],
        filterTransformSize: true,
        filterTransformColor: true,
        filterEnabled: true,

        extensions: [new DataFilterExtension({ filterSize: 1 })]
      })
    ]);
  }, [filterMin]);
  useEffect(() => {
    if (animationFrameID) {
      const interval = setInterval(() => {
        animationFrameID.current = window.requestAnimationFrame(animate); // start animation
      }, intervalMS);

      return () => {
        clearInterval(interval);
        window.cancelAnimationFrame(animationFrameID.current);
      };
    }
  }, [animate]);

  return layer;
};
export default useAnimation;
