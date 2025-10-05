import React, { useEffect } from "react";
import type { Data } from "../types";

function OverlayOnImage({
  src,
  x,
  y,
  children,
}: {
  src: string;
  x: number;
  y: number;
  children?: React.ReactNode;
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
  data,
  selectedAsteroid,
}: {
  data: Data;
  selectedAsteroid: string;
}) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [xPercent, setXPercent] = React.useState<number>(0);
  const [yPercent, setyPercent] = React.useState<number>(0);

  // TODO: calculate percents from lat/long

  useEffect(() => {
    console.log(ref);
    console.log(`width: ${ref.current?.width}, height ${ref.current?.height}`);
  }, []);

  return (
    <div id="gameData">
      <OverlayOnImage src="./worldMap.jpg" x={xPercent} y={yPercent}>
        <p style={{ font: "caption", fontSize: "1.5rem", color: "red" }}>x</p>
      </OverlayOnImage>
    </div>
  );
}
