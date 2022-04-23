
import requests
import json
import os


def download_data():
    downloaded_data = None
    if not os.path.exists("data/downloaded_data.json"):
        print("Data file doesn't exist. Downloading...")
        response = requests.get(
            "https://www.remax.com/api/listings/?location=Boulder,%20CO&Count=50&pagenumber=1&SiteID=60610605&pageCount=10&tab=map&sh=true&maplistings=1&maplistcards=5&sv=true&sortorder=newest&view=forsale&&_=1574799872482")
        downloaded_data = response.json()
        with open('data/downloaded_data.json', 'w') as outfile:
            json.dump(downloaded_data, outfile, indent=4)
    else:
        print("Data exists. Loading...")
        with open('data/downloaded_data.json') as json_file:
            downloaded_data = json.load(json_file)

    return downloaded_data


def transform_and_save_data(downloaded_data):
    properties = downloaded_data[0]
    transformed_data = []

    for p in properties:
        if not p["SqFt"]:
            continue

        try:
            home_size = float(p["SqFt"])
            lot_size = int(home_size * 2.5)
            garage_size = int(home_size * .20)
            print(p)
            t = {
                "mls_num": p["MLSNumber"],
                "main_image_url": p["IDXPhotoRef"],
                "street_1": p["Address"],
                "street_2": None,
                "city": p["City"],
                "state": p["State"],
                "zipcode": p["Zip"],
                "neighborhood": p["City"],
                "sales_price": p["Price"],
                "date_listed": p["ListingDate"],
                "bedrooms": p["BedRooms"],
                "bathrooms": p["BathRooms"],
                "garage_size": garage_size,
                "square_feet": p["SqFt"],
                "lot_size": lot_size,
                "description": p["ShortDescription"],
                "user_id": 1
            }
            print(t)
            transformed_data.append(t)

        except:
            pass

    print("Saving transformed data...")
    with open('data/transformed_data.json', 'w') as outfile:
        json.dump(transformed_data, outfile, indent=4)


def main():
    print("Begin...")
    downloaded_data = download_data()
    transform_and_save_data(downloaded_data)
    print("Done...")


if __name__ == "__main__":
    main()
