import React, { useEffect } from "react";
import type { Data } from "../types";

export default function DataViewer({ data, selectedAsteroid }: { data: Data, selectedAsteroid: string }) {
  const ref = React.useRef(null);
  
  useEffect(() => {
    
  }, []);

  return (
    <div id="gameData">
      <img src="./worldMap.jpg" alt="a world map" ref={ref} />
    </div>
  );
}
