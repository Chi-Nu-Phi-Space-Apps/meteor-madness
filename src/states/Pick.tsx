import React from "react";
import type { Data, StateSetter } from "../types";
import { GameState } from "../Game";
import { preload } from "react-dom";

// This is a digusting regex but it matches the parentheses and leading digits
export const nameCleaningRegex = /(\d+\ )(?=\()|(\(|\))/g;

export default function Picker({
  data,
  setGameState,
  selectedAsteroid,
  setSelectedAsteroid,
}: {
  data: Data;
  setGameState: StateSetter<GameState>;
  selectedAsteroid: string;
  setSelectedAsteroid: StateSetter<string>;
}) {
  const allObjects = Object.values(data.near_earth_objects).flat();
  preload("./photos/worldMap.jpg", { as: "image" }); // Reduce waiting time by preloading the map

  // Remove parentheses from names and sort alphabetically
  const cleanedNames = allObjects
    .map((obj) => obj.name.replace(nameCleaningRegex, ""))
    .sort((a, b) => a.localeCompare(b));

  // TODO: set to a random asteroid every time?
  React.useEffect(() => {
    setSelectedAsteroid(cleanedNames[0] || "");
  }, []);

  return (
    <div className="center-div" id="game">
      <p style={{ fontSize: 30, marginBottom: '20px' }}>
        Pick an asteroid to guess!
      </p>

      <select
        value={selectedAsteroid}
        onChange={(e) => setSelectedAsteroid(e.target.value)}
      >
        {cleanedNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      
      <button onClick={() => setGameState(GameState.DATA)}>
        Submit
      </button>
    </div>
  );
}
