import React from "react";
import Picker from "./states/Pick";

/** @readonly */
const GameState = Object.freeze({
  PICK: 0,
  GUESS: 1,
  ANIMATE: 2, // TODO later
  DATA: 3,
});

export default function Game({ data }) {
  if (!data) return <p>Loading...</p>;

  const [gameState, setGameState] = React.useState(GameState.PICK);

  switch (gameState) {
    case GameState.PICK:
      return <Picker data={data} />;
    case GameState.GUESS:
      return <Guesser data={data} />;
    case GameState.DATA:
      return <DataViewer data={data} />;
    default:
      throw new Error("Unhandled gamestate value");
  }
}
