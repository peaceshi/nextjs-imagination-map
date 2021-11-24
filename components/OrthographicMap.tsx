import { ControllerOptions } from "@deck.gl/core/controllers/controller";
import DeckGL from "@deck.gl/react";
import { useTagLayer, useTileLayer } from "@hooks/hooks";
import { vignette } from "@luma.gl/shadertools";
import { FeatureCollection } from "@nebula.gl/edit-modes";
import { OrthographicView, PostProcessEffect } from "deck.gl";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
type UnknownObject = Record<string, unknown>;

const INITIAL_VIEW_STATE = {
  target: [6144, 6144, 0],
  bearing: 0,
  zoom: -3, // full zoom level
  maxZoom: 10,
  minZoom: -3.5
};
const controller: ControllerOptions = {
  scrollZoom: { smooth: true },
  touchZoom: true,
  doubleClickZoom: false,
  inertia: true
};
const postProcessEffect = new PostProcessEffect(vignette, {
  radius: 0.1,
  amount: 0.6
});
interface OrthographicMapProperties {
  id: string;
  initialViewState?: typeof INITIAL_VIEW_STATE;
  data: FeatureCollection;
}
export default function OrthographicMap(properties: OrthographicMapProperties): ReactElement {
  const [viewState, setViewState] = useState<UnknownObject>(properties.initialViewState ?? INITIAL_VIEW_STATE);

  const [geojson, setGeojson] = useState<FeatureCollection>(() => properties.data);
  useEffect(() => {
    setGeojson(properties.data);
  }, [properties.data]);

  const view = new OrthographicView({ id: properties.id });
  const tileLayer = useTileLayer(properties.id);
  const tagLayer = useTagLayer(viewState.zoom as number, geojson);

  const onViewStateChange = useCallback(
    ({ viewState, interactionState }: { viewState: UnknownObject; interactionState: UnknownObject }) => {
      if (interactionState.isZooming as boolean) {
        viewState.transitionDuration = 300;
        setViewState(viewState);
      }
    },
    []
  );

  return (
    <DeckGL
      views={[view]}
      layers={[tileLayer, tagLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={isMobile ? true : controller}
      effects={[postProcessEffect]}
      onViewStateChange={onViewStateChange}
      useDevicePixels={true}
    />
  );
}
