import React from "react";
import Picker, { nameCleaningRegex } from "./states/Pick";
import DataViewer from "./states/Data";
import type { Data } from "./types";

export const enum GameState {
  PICK,
  DATA,
}

export default function Game({ data }: { data: Data }) {
  const [gameState, setGameState] = React.useState<GameState>(GameState.PICK);
  const [selectedAsteroid, setSelectedAsteroid] = React.useState<string>(""); // TODO

  switch (gameState) {
    case GameState.PICK:
      return <Picker data={data} setGameState={setGameState} selectedAsteroid={selectedAsteroid} setSelectedAsteroid={setSelectedAsteroid} />;
    case GameState.DATA: {
      const asteroid = Object.values(data.near_earth_objects).flat().find(
        (obj) => obj.name.replace(nameCleaningRegex, "") === selectedAsteroid
      );
      if (!asteroid) throw new Error("Asteroid not found");
      return <DataViewer asteroid={asteroid} />;
    }
    default:
      throw new Error("Unhandled gamestate value");
  }
}
