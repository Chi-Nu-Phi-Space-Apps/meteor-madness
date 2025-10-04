import pandas as pd
import requests
import json

url = "https://api.nasa.gov/neo/rest/v1/feed"
params = {
    "start_date": "2025-9-27",
    "end_date": "2025-10-3", 
    "api_key": "X88I4yhUbfhmxBvBbNCamEmx4g2IxsHaqly0JPKJ"
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()

    with open("asteroid_data.json", "w") as f:
        json.dump(data, f, indent=2)

    print("Successfully read from api and created json with data.")
    
else:
    print(f"Error {response.status_code}: {response.text}")