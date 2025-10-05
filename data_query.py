import requests
import json
import pandas as pd
import os

def query_data(file_name):
    # json file path
    json_path = f"data/{file_name}.json"

    # URL for asteroid data
    url = "https://api.nasa.gov/neo/rest/v1/feed"

    # Start/end dates and api key. Prompt user for info or use dummy data
    params = {
    "start_date": input("Enter start date (Default=2025-9-27): ") or "2025-9-27",
    "end_date": input("Enter end date (Default=2025-10-3): ") or "2025-10-3", 
    "api_key": input("Enter API key: ")
    }

    # Reach out to the api
    response = requests.get(url, params=params)

    # If api was successfully reached, retrieve the data as a .json and dump in data folder
    if response.status_code == 200:
        data = response.json()

        with open(json_path, "w") as f:
            json.dump(data, f, indent=2)

        print("Successfully read from api and created json with data.")
    
    # Print error message if the api was unsuccessfully reached
    else:
        print(f"Error {response.status_code}: {response.text}")


def json_to_csv(file_name):
    json_path = f"data/{file_name}.json"
    csv_path = f"data/{file_name}.csv"

    if not os.path.exists(json_path):
        print("JSON file does not exist.")
        return
    

    with open(json_path, "r") as f:
        data = json.load(f)

    # NASA's JSON is nested under "near_earth_objects"
    neos = []
    for date, objects in data["near_earth_objects"].items():
        for obj in objects:
            flat = {
                "id": obj.get("id"),
                "name": obj.get("name"),
                "nasa_jpl_url": obj.get("nasa_jpl_url"),
                "absolute_magnitude_h": obj.get("absolute_magnitude_h"),
                "estimated_diameter_min": obj["estimated_diameter"]["kilometers"]["estimated_diameter_min"],
                "estimated_diameter_max": obj["estimated_diameter"]["kilometers"]["estimated_diameter_max"],
                "is_potentially_hazardous": obj["is_potentially_hazardous_asteroid"],
                "close_approach_date": obj["close_approach_data"][0]["close_approach_date"],
                "relative_velocity_kps": obj["close_approach_data"][0]["relative_velocity"]["kilometers_per_second"],
                "miss_distance_km": obj["close_approach_data"][0]["miss_distance"]["kilometers"]
            }
            neos.append(flat)

    # Convert to DataFrame and save to CSV
    df = pd.DataFrame(neos)
    df.to_csv(csv_path, index=False)

    print(f"Converted JSON to CSV: data/{file_name}.csv")


def read_csv_to_df(file_path):
    # Read in csv data
    df = pd.read_csv(file_path)

    # Convert velocity and max diameter to numeric rows
    key_cols = ['relative_velocity_kps', 'estimated_diameter_max']
    for col in key_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    # Drop rows with velocity_kps == nan OR diameter_max == nan
    df = df.dropna(subset=key_cols)

    # Return updated df
    return df

