import { Flex } from "@chakra-ui/react";
import { ControllerOptions } from "@deck.gl/core/controllers/controller";
import DeckGL from "@deck.gl/react";
import { useTagLayer, useTileLayer } from "@hooks";
import { vignette } from "@luma.gl/shadertools";
import { storage } from "@utils";
import { OrthographicView, PostProcessEffect } from "deck.gl";
import { useCallback, useEffect, useState } from "react";
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
export const MapLayout = (properties: MapProperties) => {
  const { id, tag: tagJSON, tileMeta } = properties;
  const [interruptViewState, setInterruptViewState] = useState(() => initialViewState);

  const [viewState, setViewState] = useState(() => interruptViewState);
  useEffect(() => {
    void (async () => {
      storage.setConfig({ name: "map", storeName: id });
      await storage.setItem("viewID", id);
      const viewState = await storage.getItem("viewState");
      setInterruptViewState(viewState as InitialViewState);
    })();
  }, [id]);

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
      void (async () => {
        await storage.setItem("viewState", {
          target: viewState.target,
          zoom: viewState.zoom,
          maxZoom: viewState.maxZoom,
          minZoom: viewState.minZoom
        });
      })();
    },
    []
  );
  return (
    <Flex w="100%">
      <DeckGL
        views={[view]}
        layers={[tileLayer, tagLayer]}
        initialViewState={interruptViewState}
        controller={isMobile ? true : controller}
        effects={[postProcessEffect]}
        onViewStateChange={onViewStateChange}
        useDevicePixels={true}
      />
    </Flex>
  );
};

export { MapLayout as default };
