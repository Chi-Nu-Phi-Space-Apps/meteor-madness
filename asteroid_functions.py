import math
import numpy as np
import pandas as pd

# Constants used for math
RAD_EARTH = 6371.0  # km
VEL_ESCAPE = 11.186  # km/s
RHO_AST = 3000000000000.0   # kg/km³ 

# Calculate asteroid entry speed
def entry_speed(v_kps):
    return math.sqrt(math.pow(v_kps, 2) + math.pow(VEL_ESCAPE, 2))


# Simulate asteroid impact
def simulate_impact(row):

    # Randomized entry parameters
    entry_angle = np.random.uniform(15, 60)
    azimuth = np.random.uniform(0, 360)      
    entry_lat = np.random.uniform(-90, 90)
    entry_lon = np.random.uniform(-180, 180)
    
    # Known asteroid properties
    diameter = np.random.uniform(row['estimated_diameter_min'], row['estimated_diameter_max'])
    vel_entry = entry_speed(row['relative_velocity_kps'])
    radius = diameter / 2
    volume = np.random.uniform(2/3, 4/3) * math.pi * math.power(radius, 3)
    mass = RHO_AST * volume
    
    # Simple energy model (kinetic)
    energy_mt = 0.5 * mass * (v_entry*1000)**2 / 4.184e15
    
    # Simple travel distance (downrange in km)
    # Assume flatter entry (shallow) means longer travel
    downrange_km = 100 * math.tan(math.radians(entry_angle))  # very rough
    
    # Compute impact coordinates (using spherical Earth)
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

    return pd.Series({
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
    })