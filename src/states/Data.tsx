import React, { useEffect } from "react";
import type { NEODescriptor } from "../types";

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
  asteroid
}: {
  asteroid: NEODescriptor;
}) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [xPercent, setXPercent] = React.useState<number>(0);
  const [yPercent, setyPercent] = React.useState<number>(0);

  // TODO: calculate percents from lat/long

  useEffect(() => {
    console.log(ref);
    console.log(asteroid);
    console.log(`width: ${ref.current?.width}, height ${ref.current?.height}`);
  }, []);

  return (
    <div id="gameData">
      <OverlayOnImage src="./photos/worldMap.jpg" x={xPercent} y={yPercent} ref={ref}>
        <p style={{ font: "caption", fontSize: "1.5rem", color: "red" }}>x</p>
      </OverlayOnImage>
    </div>
  );
}
