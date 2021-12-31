import MainLayout from "@components/Layout/MainLayout";
import MapEditorLayout from "@components/Layout/MapEditorLayout";
import MapLayout from "@components/Layout/MapLayout";
import SplashScreen from "@components/Screen/SplashScreen";
import { useJSON } from "@hooks/hooks";
import { FirstLoadingContext } from "@pages/_app";
import { ReactNode, useContext } from "react";

const MainViewSplashScreen = () => {
  const isFirstLoading = useContext(FirstLoadingContext);
  return isFirstLoading ? (
    <FirstLoadingContext.Provider value={false}>
      <SplashScreen bg="green.600" value={100} />
    </FirstLoadingContext.Provider>
  ) : (
    <></>
  );
};
const MainViewContainer = ({
  tag,
  tileMeta,
  children
}: {
  tag?: TagJSON;
  tileMeta?: TileJSON;
  children: ReactNode;
}) => {
  return !tag || !tileMeta ? <MainViewSplashScreen /> : <>{children}</>;
};
export const MainView = ({ id }: { id: string }) => {
  const { data: tag } = useJSON<TagJSON>(`/api/data/tags/${id}`);
  const { data: tileMeta } = useJSON<TileJSON>(`/api/data/tiles/${id}`);
  return (
    <MainViewContainer tag={tag} tileMeta={tileMeta}>
      <MainLayout>
        {id === "editor" ? ( // @ts-expect-error: The props must not be undefined.
          <MapEditorLayout id={id} tag={tag} tileMeta={tileMeta} />
        ) : (
          // @ts-expect-error: The props must not be undefined.
          <MapLayout id={id} tag={tag} tileMeta={tileMeta} />
        )}
      </MainLayout>
    </MainViewContainer>
  );
};

export { MainView as default };
