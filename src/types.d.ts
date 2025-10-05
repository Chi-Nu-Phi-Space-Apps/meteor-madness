import type React from "react";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type EstimatedDiameter = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

export type PrunedAsteroid = {
  id: `${number}`;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: EstimatedDiameter;
    meters: EstimatedDiameter;
    miles: EstimatedDiameter;
    feet: EstimatedDiameter;
  };
  is_potentially_hazardous_asteroid: boolean;
  asteroid_mass: number;
  impact_velocity_kps: number;
  impact_energy_mt: number;
  impact_lat: number;
  impact_lon: number;
};
