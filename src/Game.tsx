import React from "react";
import Picker from "./states/Pick";
import DataViewer from "./states/Data";
import type { Data } from "./types";

export const enum GameState {
  PICK,
  DATA,
}

export default function Game({ data }: { data: Data | null }) {
  if (!data) return <p>Loading...</p>;

  const [gameState, setGameState] = React.useState<GameState>(GameState.PICK);
  const [selectedAsteroid, setSelectedAsteroid] = React.useState<string>(""); // TODO

  switch (gameState) {
    case GameState.PICK:
      return <Picker data={data} setGameState={setGameState} selectedAsteroid={selectedAsteroid} setSelectedAsteroid={setSelectedAsteroid} />;
    case GameState.DATA:
      return <DataViewer data={data} selectedAsteroid={selectedAsteroid} />;
    default:
      throw new Error("Unhandled gamestate value");
  }
}
