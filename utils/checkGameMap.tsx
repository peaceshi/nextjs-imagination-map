type GameMap = { [key: string]: string };

const gameMap: GameMap = {
  version: "2.2.0"
};

export const checkGameMap = (): string => {
  if (typeof window !== "undefined") {
    // Because of the way Next.js handles SSR,
    // make sure your function is being called in client side only.
    localStorage.getItem("version") ?? localStorage.setItem(`version`, gameMap.version);
  }
  return gameMap.version;
};

export default checkGameMap;
