import Link from "next/link";
import React, { ReactElement } from "react";

export const TileLayerChangePanel = ({
  style,
  setTileLayerUrlIndex
}: {
  style: React.CSSProperties;
  setTileLayerUrlIndex: (argument0: number) => void;
}): ReactElement => {
  return (
    <div style={style}>
      <div>
        <Link href="/">
          <button onClick={() => setTileLayerUrlIndex(0)}>to Teyvat</button>
        </Link>
      </div>
      <div>
        <Link href="/qd">
          <button onClick={() => setTileLayerUrlIndex(1)}>to QD</button>
        </Link>
      </div>
      <div>
        <Link href="/qd1">
          <button onClick={() => setTileLayerUrlIndex(2)}>to QD1</button>
        </Link>
      </div>
      <div>
        <Link href="/layers/ImageTileLayer">
          <button onClick={() => setTileLayerUrlIndex(2)}>ImageTileLayer</button>
        </Link>
      </div>
    </div>
  );
};
