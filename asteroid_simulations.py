"""
Asteroid Impact Simulation

This script reads NASA asteroid data (from asteroid_data.csv),
simulates random Earth entry and impact points for 
asteroids based on provided dataset. Creates a 
plot in data folder.

"""

import pandas as pd
import numpy as np
import math
import random
import matplotlib.pyplot as plt
from data_query import read_csv_to_df

# CSV file path
file_path = r"data/asteroid_data.csv"

# Read in csv data
df = read_csv_to_df(file_path)

# Key Columns
v_kps = df['relative_velocity_kps']
d_max = df['estimated_diameter_max']

# Physical constants
R_EARTH = 6371.0      # km
V_ESCAPE = 11.186     # km/s (Earth escape velocity)
RHO_AST = 3000.0      # kg/m³ (average stony asteroid density)

# HELPER FUNCTIONS
def entry_speed(v_inf_km_s):
    """Compute entry speed from hyperbolic excess velocity"""
    return math.sqrt(v_inf_km_s**2 + V_ESCAPE**2)

def simulate_impact(row):
    """Simulate one asteroid's atmospheric entry and impact"""
    # Randomized entry parameters
    entry_angle = random.uniform(15, 60)   # degrees down from horizontal
    azimuth = random.uniform(0, 360)       # direction across the globe
    entry_lat = random.uniform(-90, 90)
    entry_lon = random.uniform(-180, 180)

    # Physical properties
    d = row['diameter_m']
    v_entry = entry_speed(row['velocity_km_s'])
    r = d / 2
    volume = (4/3)*math.pi*r**3
    mass = RHO_AST * volume

    # Energy in megatons TNT
    energy_mt = 0.5 * mass * (v_entry*1000)**2 / 4.184e15

    # Simple "downrange" travel distance (very rough)
    downrange_km = 100 * math.tan(math.radians(entry_angle))

    # Spherical-Earth impact location calculation
    lat_rad = math.radians(entry_lat)
    lon_rad = math.radians(entry_lon)
    az_rad = math.radians(azimuth)
    d_r = downrange_km / R_EARTH

    lat2 = math.asin(math.sin(lat_rad)*math.cos(d_r) +
                     math.cos(lat_rad)*math.sin(d_r)*math.cos(az_rad))
    lon2 = lon_rad + math.atan2(math.sin(az_rad)*math.sin(d_r)*math.cos(lat_rad),
                                math.cos(d_r) - math.sin(lat_rad)*math.sin(lat2))

    impact_lat = math.degrees(lat2)
    impact_lon = math.degrees(lon2)

    return {
        'name': row['name'],
        'velocity_km_s': row['velocity_km_s'],
        'diameter_m': row['diameter_m'],
        'entry_angle_deg': round(entry_angle, 2),
        'impact_speed_km_s': round(v_entry, 3),
        'energy_Mt_TNT': round(energy_mt, 3),
        'entry_lat': round(entry_lat, 3),
        'entry_lon': round(entry_lon, 3),
        'impact_lat': round(impact_lat, 3),
        'impact_lon': round(impact_lon, 3)
    }


# MAIN
def main():
    # Run simulation for first 50
    print("🚀 Simulating impacts...")
    results = [simulate_impact(row) for _, row in df.head(50).iterrows()]

    sim_df = pd.DataFrame(results)

    # Optional visualization
    plt.figure(figsize=(10, 5))
    plt.scatter(sim_df['impact_lon'], sim_df['impact_lat'], s=25, color='red', alpha=0.7)
    plt.title("Simulated Asteroid Impact Locations")
    plt.xlabel("Longitude")
    plt.ylabel("Latitude")
    plt.grid(True)
    plt.show()

# RUN SCRIPT
if __name__ == "__main__":
    main()
