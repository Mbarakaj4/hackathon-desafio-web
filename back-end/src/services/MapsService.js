const axios = require("axios");
const Category = require("../models/CategoriesModel");
const { text } = require("express");
require("dotenv").config();

class MapsService {
  static async searchPlaces(textQuery) {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: `${textQuery}, Encarnacion, Paraguay`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.priceLevel,places.id,places.photos",
        },
      }
    );
    const places = response.data.places;
    for (let i = 0; i < places.length; i++) {
      const photoReference = places[i].photos[0].name;
      const photoUrl = await MapsService.getPhoto(photoReference);
      places[i].photoUrl = photoUrl;
      const { photos, ...responseData } = places[i];
      places[i] = responseData;
    }
    return places;
  }

  static async getDetails(placeId) {
    const response = await axios.get(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "id,displayName,photos,formattedAddress,googleMapsUri",
        },
      }
    );
    const responseData = response.data;
    for (let i = 0; i < responseData.photos.length; i++) {
      const photoReference = responseData.photos[i].name;
      const photoUrl = await MapsService.getPhoto(photoReference);
      responseData.photos[i] = photoUrl;
    }
    return responseData;
  }

  static async getPhoto(name) {
    const photoUrl = `https://places.googleapis.com/v1/${name}/media?&key=${process.env.GOOGLE_MAPS_API_KEY}&maxWidthPx=4000&maxHeightPx=4000`;
    return photoUrl;
  }

  static async getCategories() {
    const response = await Category.find({});
    return response;
  }
}

module.exports = MapsService;
