import React from "react";

export default function Dropdown({ data }) {
  // If data hasn't arrived yet, show a small placeholder.
  if (!data || !data.near_earth_objects) return <p>Loading dropdown...</p>;

  const allObjects = Object.values(data.near_earth_objects).flat();

  // Initialize selected to the first object's name when data changes.
  const [selected, setSelected] = React.useState(
    () => allObjects[0]?.name || ""
  );

  React.useEffect(() => {
    setSelected(allObjects[0]?.name || "");
  }, [data]);

  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {allObjects.map((obj) => (
          <option key={obj.name} value={obj.name}>
            {obj.name}
          </option>
        ))}
      </select>
      <button onClick={() => alert(`Selected: ${selected}`)}>Submit</button>
    </div>
  );
}
