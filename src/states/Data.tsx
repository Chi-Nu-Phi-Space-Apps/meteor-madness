import React, { useEffect } from "react";
import type { PrunedAsteroid, StateSetter } from "../types";
import { GameState } from "../Game";

function OverlayOnImage({
  src,
  x,
  y,
  children,
  ref,
}: {
  src: string;
  x: number;
  y: number;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLImageElement | null>
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "inline-block",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        ref={ref || undefined}
      />
      <div
        style={{
          position: "absolute",
          top: `${y}%`,
          left: `${x}%`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", // let clicks go through
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function DataViewer({
  asteroid,
  setGameState
}: {
  asteroid: PrunedAsteroid;
  setGameState: StateSetter<GameState>
}) {
  const ref = React.useRef<HTMLImageElement>(null);

  const xPercent = ((asteroid.impact_lon + 180) / 360) * 100; // (-180 to 180) -> 0–100%
  const yPercent = ((90 - asteroid.impact_lat) / 180) * 100; // (90 to -90) -> 0–100%

  return (
    <div>
      <div id="gameData">
        <OverlayOnImage src="./photos/worldMap.jpg" x={xPercent} y={yPercent} ref={ref}>
        <img 
          src="./photos/crater.jpg" 
          alt="marker" 
          style={{ width: "32px", height: "32px" }} 
          />
        </OverlayOnImage>
      </div>
      {/* center the button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => setGameState(GameState.PICK)}>Back</button>
      </div>
      {/* TODO: data box here */}
    </div>
  );
}
