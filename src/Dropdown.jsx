import React from "react";

export default function Dropdown({ data }) {
  // If data hasn't arrived yet, show a small placeholder.
  if (!data || !data.near_earth_objects) return <p>Loading dropdown...</p>;

  const allObjects = Object.values(data.near_earth_objects).flat();

  // Remove parentheses from names and sort alphabetically
  const cleanedNames = allObjects
    .map((obj) => obj.name) // TODO: trim the name to e.x. "1991 GO"
    .sort((a, b) => a.localeCompare(b));

  // Initialize selected to the first object's name when data changes.
  const [selected, setSelected] = React.useState(
    () => cleanedNames[0] || ""
  );

  // TODO: set to a random asteroid every time
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
      <button onClick={() => alert(`Selected: ${selected.replace(/^\(|\)$/g, "")}`)}>Submit</button>
    </div>
  );
}
