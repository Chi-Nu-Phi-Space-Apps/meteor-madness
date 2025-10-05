import React from "react";
import Game from "./Game";
import Instructions from "./Instructions";
import type { Data } from "./types";

export default function App() {
  const [data, setData] = React.useState<Data | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);

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
        setError(err);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error.toString()}</p>;

  return (
    <div>
      <h1>Chi Nu Phi Meteor Madness!</h1>
      <Game data={data} />
      <Instructions />
    </div>
  );
}
