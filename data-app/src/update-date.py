import json
from datetime import datetime, timedelta

with open("properties.json") as f:
    data = json.load(f)
    d = datetime.now()
    for p in data:
        d = d - timedelta(days=1)
        p["date_listed"] = str(d)
        p["square_feet"] = int(round(float(p["square_feet"])))
        print(p["date_listed"])

with open('properties_new.json', 'w') as outfile:
    json.dump(data, outfile)
