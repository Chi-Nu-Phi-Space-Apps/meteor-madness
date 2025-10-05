import React from "react";

export default function Instructions() {
  return (
    <div>
      <p>
        Have you wondered what asteroid impacts could actually result in?<br />
        Try your hand at a GeoGuessr-style game complete with official NASA data!
      </p>
      <h3>About Our Project</h3>
      <p>We used mathplotlib as well as a variety of complex math equations to find an approximation of where the asteroids will impact using the data from the Nasa NEO API. We took the coordinates from our algorithm and mapped it to a map of the world in order to mark down where the meteor will impact.</p>
    </div>
  );
}
