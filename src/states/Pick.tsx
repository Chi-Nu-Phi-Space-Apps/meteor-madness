import React from "react";
import type { Data } from "../data";

function Dropdown({ data }: { data: Data }) {
  const allObjects = Object.values(data.near_earth_objects).flat();

  // Remove parentheses from names and sort alphabetically
  const cleanedNames = allObjects
    // This is a digusting regex but it matches the parentheses and leading digits
    .map((obj) => obj.name.replace(/(\d+\ )(?=\()|(\(|\))/g, ""))
    .sort((a, b) => a.localeCompare(b));

  // Initialize selected to the first object's name when data changes.
  const [selected, setSelected] = React.useState(() => cleanedNames[0] || "");

  // TODO: set to a random asteroid every time?
  React.useEffect(() => {
    setSelected(cleanedNames[0] || "");
  }, [data]);

  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {cleanedNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button
        onClick={() => alert(`Selected: ${selected.replace(/^\(|\)$/g, "")}`)}
      >
        Submit
      </button>
    </div>
  );
}

export default function Picker({ data }: { data: Data }) {
  return (
    <div className="center-div" id="game">
      <p>Pick an asteroid to guess!</p>

      <Dropdown data={data} />
    </div>
  );
}
