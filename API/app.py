from flask import Flask, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app) 

@app.route('/profiles')
def get_profiles():
    user_count = 15
    response = requests.get(f"https://randomuser.me/api/?results={user_count}")
    users_data = response.json()['results']
    
    profiles = []
    for user in users_data:
        profile = {
            'name': f"{user['name']['first']} {user['name']['last']}",
            'age': user['dob']['age'],
            'city': user['location']['city'],
            'img': user['picture']['large'],
            'description': generate_description(user['name']['first'], user['dob']['age'], user['location']['city'])
        }
        profiles.append(profile)
    
    return jsonify(profiles)

def generate_description(name, age, city):
    templates = [
        f"{name}, {age} years old, living in {city}. Loves outdoor activities and traveling.",
        f"{name} here from {city}, {age} years young and excited about making new friends!",
        f"Meet {name}, a {age}-year-old from {city} who enjoys reading and movies."
    ]
    return random.choice(templates)

if __name__ == "__main__":
    app.run(debug=True)