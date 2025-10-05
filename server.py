from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_folder='public', static_url_path='')

@app.route('/api/data')
def get_data():
    # Load the JSON file from the data folder
    json_path = os.path.join(app.root_path, 'data', 'simulated_asteroid_data.json')
    
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    # Send JSON to the frontend
    return jsonify(data)

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

if __name__ == '__main__':
    app.run()
