import originalData from "./data/asteroid_data.json" with { type: "json" };
import simData from "./data/simulated_asteroid_data.json" with { type: "json" };
import { writeFileSync } from "node:fs";

const asteroids = [];

for (const neo of Object.values(originalData.near_earth_objects).flat()) {
  const simNeoId = Object.keys(simData.name).find(key => simData.name[key] === neo.name);

  if (simNeoId === undefined) throw new Error(`Couldn't find simulatiuon for ${neo.name}`)

  asteroids.push({
    id: neo.id,
    name: neo.name,
    nasa_jpl_url: neo.nasa_jpl_url,
    absolute_magnitude_h: neo.absolute_magnitude_h,
    is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
    asteroid_mass: simData.asteroid_mass[simNeoId],
    impact_velocity_kps: simData.impact_velocity_kps[simNeoId],
    impact_energy_mt: simData.impact_energy_mt[simNeoId],
    impact_lat: simData.impact_lat[simNeoId],
    impact_lon: simData.impact_lon[simNeoId],
    diameter_km: simData.diameter[simNeoId],
  });
}

writeFileSync("./data/pruned_asteroid_data.json", JSON.stringify(asteroids));
