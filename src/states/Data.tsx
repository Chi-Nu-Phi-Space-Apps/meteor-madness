import React, { useEffect } from "react";
import type { PrunedAsteroid, StateSetter } from "../types";
import { GameState } from "../Game";
import { nameCleaningRegex } from "./Pick";

function OverlayOnImage({
  src,
  x,
  y,
  children,
  ref,
}: {
  src: string;
  x: number;
  y: number;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLImageElement | null>;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "inline-block",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        ref={ref || undefined}
      />
      <div
        style={{
          position: "absolute",
          top: `${y}%`,
          left: `${x}%`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", // let clicks go through
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Unused, AI generated
function getImpactSeverity(energyMT: number): {
  level: string;
  description: string;
} {
  if (energyMT < 0.1)
    return {
      level: "Negligible",
      description:
        "Would burn up in the atmosphere before reaching the ground.",
    };
  if (energyMT < 10)
    return {
      level: "Minor",
      description:
        "Localized damage, roughly equivalent to a small nuclear device.",
    };
  if (energyMT < 1000)
    return {
      level: "Severe",
      description:
        "Regional devastation; capable of flattening cities or small countries.",
    };
  if (energyMT < 100000)
    return {
      level: "Catastrophic",
      description: "Global climate effects and mass casualties likely.",
    };
  return {
    level: "Extinction-Level",
    description: "Comparable to the Chicxulub event that ended the dinosaurs.",
  };
}

function DataBox({
  asteroid: {
    name: asteroidName,
    nasa_jpl_url,
    diameter,
    asteroid_mass,
    impact_lat,
    impact_lon,
    impact_velocity_kps,
    impact_energy_mt,
  },
}: {
  asteroid: PrunedAsteroid;
}) {
  return (
    <div>
      <h2>
        <a href={nasa_jpl_url}>{asteroidName.replace(nameCleaningRegex, "")}</a>
      </h2>
      <div className="dataContainer">
        <div id="dataOverview" className="dataBox">
          <h3>Overview</h3>
          <p>
            Estimated Diameter: {(diameter*1000).toFixed(2)} m
            <br />
            Mass: {asteroid_mass.toExponential(2)} kg
            {/* TODO ^^^ */}
          </p>
        </div>
        <div id="impactSim" className="dataBox">
          <h3>Impact</h3>
          <p>
            Impact Site: {impact_lat.toFixed(2)}°, {impact_lon.toFixed(2)}°
            <br />
            Impact Velocity: {impact_velocity_kps.toFixed(1)} km/s
            <br />
            Energy: {impact_energy_mt.toFixed(2)} megatons TNT
          </p>
        </div>
      </div>
      <h3>Impact Severity: {getImpactSeverity(impact_energy_mt).level}</h3>
      <p>{getImpactSeverity(impact_energy_mt).description}</p>
    </div>
  );
}

export default function DataViewer({
  asteroid,
  setGameState,
}: {
  asteroid: PrunedAsteroid;
  setGameState: StateSetter<GameState>;
}) {
  const ref = React.useRef<HTMLImageElement>(null);

  const xPercent = ((asteroid.impact_lon + 180) / 360) * 100; // (-180 to 180) -> 0–100%
  const yPercent = ((90 - asteroid.impact_lat) / 180) * 100; // (90 to -90) -> 0–100%

  return (
    <div>
      <div id="gameData">
        <OverlayOnImage
          src="./photos/worldMap.jpg"
          x={xPercent}
          y={yPercent}
          ref={ref}
        >
          <img
            src="./photos/crater.png"
            alt="marker"
            style={{ width: "32px", height: "32px" }}
          />
        </OverlayOnImage>
        <DataBox asteroid={asteroid} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => setGameState(GameState.PICK)}>Back</button>
      </div>
      {/* TODO: data box here */}
    </div>
  );
}
