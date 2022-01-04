import { Flex } from "@chakra-ui/react";
import { ControllerOptions } from "@deck.gl/core/controllers/controller";
import DeckGL from "@deck.gl/react";
import { useTagLayer, useTileLayer } from "@hooks";
import { vignette } from "@luma.gl/shadertools";
import { OrthographicView, PostProcessEffect } from "deck.gl";
import { ReactElement, useCallback, useState } from "react";
import { isMobile } from "react-device-detect";

type UnknownObject = Record<string, unknown>;

const initialViewState: InitialViewState = {
  target: [6144, 6144, 0],
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
interface MapProperties {
  id: string;
  initialViewState?: InitialViewState;
  tag: TagJSON;
  tileMeta: TileJSON;
}
export const MapLayout = (properties: MapProperties): ReactElement => {
  const { id, tag: tagJSON, tileMeta } = properties;
  const [viewState, setViewState] = useState(() => initialViewState);

  const view = new OrthographicView({ id: id });

  const tileLayer = useTileLayer(tileMeta);
  const tagLayer = useTagLayer(viewState.zoom, tagJSON);

  const onViewStateChange = useCallback(
    ({
      viewState,
      interactionState
    }: {
      viewState: UnknownObject & InitialViewState;
      interactionState: UnknownObject;
    }) => {
      if (interactionState.isZooming as boolean) {
        viewState.transitionDuration = 300;
        setViewState(viewState);
      }
    },
    []
  );
  return (
    <Flex w="100%">
      <DeckGL
        views={[view]}
        layers={[tileLayer, tagLayer]}
        initialViewState={initialViewState}
        controller={isMobile ? true : controller}
        effects={[postProcessEffect]}
        onViewStateChange={onViewStateChange}
        useDevicePixels={true}
      />
    </Flex>
  );
};

export { MapLayout as default };
