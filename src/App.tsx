import React from "react";
import Game from "./Game";
import Instructions from "./Instructions";
import type { Data } from "./types";

export default function App() {
  const [data, setData] = React.useState<Data | null>(null);
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    let mounted = true;

    fetch("/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        setData(json);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (data == null) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error.toString()}</p>;

  return (
    <div>
      <h1>Chi Nu Phi Meteor Madness!</h1>
      <Game data={data} />
      <Instructions />
    </div>
  );
}
