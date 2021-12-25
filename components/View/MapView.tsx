import { Box } from "@chakra-ui/react";
import MapLayout from "@components/Layout/MapLayout";
import Panel from "@components/Panel";
import SplashScreen from "@components/SplashScreen";
import { useJSON } from "@hooks/hooks";
import { FirstLoadingContext } from "@pages/_app";
import { useContext } from "react";
const Layout = ({ id, tag, tileMeta }: { id: string; tag: TagJSON; tileMeta: TileJSON }) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      bg={
        "url('https://assets.yuanshen.site/images/bg/7a9386be46cf07426312725af350420086ece49f151d53fdb971008e08021345.png') repeat"
      }
    >
      <MapLayout id={id} tag={tag} tileMeta={tileMeta} />
      <Panel />
    </Box>
  );
};
const DataFallBackUI = () => {
  const isFirstLoading = useContext(FirstLoadingContext);
  return isFirstLoading ? (
    <FirstLoadingContext.Provider value={false}>
      <SplashScreen bg="green.600" value={100} />
    </FirstLoadingContext.Provider>
  ) : (
    <></>
  );
};
export const MapView = ({ id }: { id: string }) => {
  const { data: tag } = useJSON<TagJSON>(`/api/data/tags/${id}`);
  const { data: tileMeta } = useJSON<TileJSON>(`/api/data/tiles/${id}`);
  return !tag || !tileMeta ? <DataFallBackUI /> : <Layout id={id} tag={tag} tileMeta={tileMeta} />;
};

export { MapView as default };
