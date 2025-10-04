import React from "react";
import Dropdown from "./Dropdown";

export default function Game({ data }) {
  return (
    <div className="center-div" id="game">
      <p>Pick an asteroid to guess!</p>
      <Dropdown data={data} />
    </div>
  );
}
