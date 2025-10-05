import React from "react";
import type { Data } from "../types";

export default function DataViewer({ data, selectedAsteroid }: { data: Data, selectedAsteroid: string }) {
  return (
    <div id="game">
      <img src="./worldMap.jpg" alt="a world map" />
    </div>
  );
}
