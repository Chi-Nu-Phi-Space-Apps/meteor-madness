import React from "react";
import Game from "./Game";
import Instructions from "./Instructions";

export default function App() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch("/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Chi Nu Phi Meteor Madness!</h1>
      <p>
        Have you wondered what asteroid impacts could actually result in?
        Try your hand at a GeoGuessr-style game complete with real data!
      </p>
      <Game data={data} />
      <Instructions />
    </div>
  );
}
