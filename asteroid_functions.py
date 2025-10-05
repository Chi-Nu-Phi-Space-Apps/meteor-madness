import math
import numpy as np
import pandas as pd
import matplotlib as plt
import data_query as dq

# Constants
RAD_EARTH = 6371            # km
V_ESCAPE_EARTH = 11.186     # km/s
DENS_AST = 3e12             # kg/km³ 
JOULES_PER_MT = 4.184e15    # joules/mt
ENTRY_ALT = 100          # km

# Calculate asteroid mass
def calculate_asteroid_mass(df):
    shape_correction_factor = np.random.uniform(0.6, 1, len(df))
    porosity_factor = np.random.uniform(0.0, 0.5, len(df))
    diameter = np.random.uniform(df['estimated_diameter_min'], df['estimated_diameter_max'])
    df['diameter'] = diameter

    volume = ((4 / 3) * math.pi * ((diameter / 2) ** 3)) * shape_correction_factor
    density = DENS_AST * (1 - porosity_factor)
    mass = density * volume
    df['asteroid_mass'] = mass
    return mass


# Calculate asteroid impact speed
def calculate_impact_velocity(df):
    v_impact = np.sqrt((df['relative_velocity_kps'] ** 2) + (V_ESCAPE_EARTH ** 2))
    df['impact_velocity_kps'] = v_impact
    return v_impact


# Kinetic energy on asteroid impact in joules
def calculate_kinetic_energy(mass_kg, vel_kps):
    vel_mps = np.array(vel_kps) * 1000
    return 0.5 * mass_kg * (vel_mps ** 2)


# Kinetic energy conversion to TNT
def convert_energy_to_tnt(kinetic_energy):
    return kinetic_energy / JOULES_PER_MT


# 
def estimate_impact_point():
    entry_angle = np.random.uniform(15, 60)
    azimuth = np.random.uniform(0, 360)      
    entry_lat = np.random.uniform(-90, 90)
    entry_lon = np.random.uniform(-180, 180)
    
    angle_rad = math.radians(max(0.1, min(89.9, entry_angle)))
    downrange_km = ENTRY_ALT / math.tan(angle_rad)

    az_rad = math.radians(azimuth)
    lat_rad = math.radians(entry_lat)
    lon_rad = math.radians(entry_lon)

    d_r = downrange_km / RAD_EARTH

    sin_lat2 = math.sin(lat_rad) * math.cos(d_r) + math.cos(lat_rad) * math.sin(d_r) * math.cos(az_rad)
    sin_lat2 = max(-1.0, min(1.0, sin_lat2))
    lat2 = math.asin(sin_lat2)

    lon2 = lon_rad + math.atan2(
        math.sin(az_rad) * math.sin(d_r) * math.cos(lat_rad),
        math.cos(d_r) - math.sin(lat_rad) * math.sin(lat2)
    )

    impact_lat = math.degrees(lat2)
    impact_lon = (math.degrees(lon2) + 180) % 360 - 180

    return {"impact_lat": impact_lat, "impact_lon": impact_lon}


# Simulate asteroid impact
def simulate_impact():
    csv_path = r"data/asteroid_data.csv"
    df = dq.read_csv_to_df(csv_path)

    mass = calculate_asteroid_mass(df)
    velocity = calculate_impact_velocity(df)
    kinetic_energy = calculate_kinetic_energy(mass, velocity)
    mt_tnt = convert_energy_to_tnt(kinetic_energy)

    coords = [estimate_impact_point() for _ in range(len(df))]

    df['impact_energy_mt'] = mt_tnt
    df['impact_lat'] = [c['impact_lat'] for c in coords]
    df['impact_lon'] = [c['impact_lon'] for c in coords]

    df.to_csv("data/simulated_asteroid_data.csv", index=False)
    df.to_json("data/simulated_asteroid_data.json", orient="records", indent=2)

    plot_impact_map(df)

    return df


#
def plot_impact_map(df, sample_size=50):
    impact_map_path = r"data/impact_map.png"  # fixed filename — add .png extension

    # Take a sample of impacts (optional, to keep map uncluttered)
    sim_df = df.head(sample_size).copy()

    # Plot
    plt.figure(figsize=(10, 5))
    plt.scatter(sim_df['impact_lon'], sim_df['impact_lat'], s=20, color='red', alpha=0.7)
    plt.title("Simulated Asteroid Impact Locations")
    plt.xlabel("Longitude")
    plt.ylabel("Latitude")
    plt.grid(True)

    # Save map image
    plt.savefig(impact_map_path, dpi=300)
    plt.close()