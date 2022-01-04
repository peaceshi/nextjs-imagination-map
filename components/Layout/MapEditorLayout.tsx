import { Flex } from "@chakra-ui/react";
import EditorLayout from "@components/EditorLayout";
import { ControllerOptions } from "@deck.gl/core/controllers/controller";
import DeckGL from "@deck.gl/react";
import { useEditableLayer, useTagLayer, useTileLayer } from "@hooks";
import { vignette } from "@luma.gl/shadertools";
import { ModifyMode } from "@nebula.gl/edit-modes";
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
  id?: string;
  initialViewState?: InitialViewState;
  tag: TagJSON;
  tileMeta: TileJSON;
}
export const MapEditorLayout = (properties: MapProperties): ReactElement => {
  const { id, tag, tileMeta } = properties;
  const [viewState, setViewState] = useState(() => initialViewState);
  const [tagJSON, setTagJSON] = useState<TagJSON>(() => tag);
  /**For editor */
  const [mode, setMode] = useState(() => ModifyMode);
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([0]);

  const view = new OrthographicView({ id: id });

  const tileLayer = useTileLayer(tileMeta);
  const tagLayer = useTagLayer(viewState.zoom, tagJSON);
  const editableLayer = useEditableLayer(tagJSON, mode, selectedFeatureIndexes, setTagJSON);

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
        layers={[tileLayer, tagLayer, editableLayer]}
        initialViewState={initialViewState}
        controller={isMobile ? true : controller}
        effects={[postProcessEffect]}
        onViewStateChange={onViewStateChange}
        useDevicePixels={true}
        getCursor={editableLayer.getCursor.bind(editableLayer)}
      />
      <EditorLayout
        mode={mode}
        setMode={setMode}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        data={tagJSON}
      />
    </Flex>
  );
};

export { MapEditorLayout as default };
