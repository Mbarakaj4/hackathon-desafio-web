const express = require("express");
const router = express.Router();
const mapsService = require("../services/MapsService");
const reviewService = require("../services/ReviewService");
const jwtUtils = require("../utils/JwtUtil");

//router.use(jwtUtils.authenticateToken);

router.post("/search-places", async (request, response) => {
  try {
    const textQuery = request.body.textQuery;
    const places = await mapsService.searchPlaces(textQuery);
    response.status(200).json(places);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Error al realizar la solicitud a la API de Google Maps",
    });
  }
});

router.get("/categories", async (request, response) => {
  try {
    const categories = await mapsService.getCategories();
    response.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Error al realizar la solicitud a la API de Google Maps",
    });
  }
});

router.get("/details/:placeId", async (request, response) => {
  try {
    const placeId = request.params.placeId;
    const details = await mapsService.getDetails(placeId);
    const reviews = await reviewService.getReviewsByPlaceId(placeId);
    details.reviews = reviews.reviews;
    details.averageRating = reviews.averageRating;
    response.status(200).json(details);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Error al realizar la solicitud a la API de Google Maps",
    });
  }
});

module.exports = router;
