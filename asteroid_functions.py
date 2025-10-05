import math
import numpy as np
import pandas as pd

# Earth constants
RAD_EARTH = 6371.0          # km
V_ESCAPE_EARTH = 11.186     # km/s
RHO_AST = 3E12              # kg/km³ 


#
def calculate_asteroid_mass(row):
    shape_correction_factor = np.random.uniform(0.6, 1.0)
    porosity_factor = np.random.uniform(0.0, 0.5)

    diameter = np.random.uniform(row['estimated_diameter_min'], row['estimated_diameter_max'])
    volume =  (4/3 * math.pi * math.power(diameter / 2, 3)) * shape_correction_factor

    



# Calculate asteroid impact speed
def calculate_impact_velocity(rel_v_asteroid):
    return math.sqrt(math.pow(rel_v_asteroid, 2) + math.pow(V_ESCAPE_EARTH, 2))


# Simulate asteroid impact
def simulate_impact(row):

    # Randomized asteroid entry parameters
    entry_angle = np.random.uniform(15, 60)
    azimuth = np.random.uniform(0, 360)      
    entry_lat = np.random.uniform(-90, 90)
    entry_lon = np.random.uniform(-180, 180)
    
    # Known asteroid properties
    
    volume = 0.8 * math.pi * math.power(diameter / 2, 3)
    velocity = calculate_impact_velocity(row['relative_velocity_kps'])
    mass = RHO_AST * volume
    
    # Simple energy model (kinetic)
    energy_mt = 0.5 * mass * (velocity*1000)**2 / 4.184e15
    
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