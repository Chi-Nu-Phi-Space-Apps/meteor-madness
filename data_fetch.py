from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

@app.route('/api/data')
def get_data():
    # Load the JSON file from the data folder
    json_path = os.path.join(app.root_path, 'data', 'asteroid_data.json')
    
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    # Send JSON to the frontend
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
