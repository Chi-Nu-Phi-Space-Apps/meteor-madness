import type React from "react";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface PrunedAsteroid {
  id: number;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  asteroid_mass: number;
  impact_velocity_kps: number;
  impact_energy_mt: number;
  impact_lat: number;
  impact_lon: number;
  diameter: number;
};
