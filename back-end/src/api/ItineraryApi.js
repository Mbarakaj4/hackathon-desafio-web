const express = require("express");
const router = express.Router();
const itineraryService = require("../services/ItineraryService");
const jwtUtils = require("../utils/JwtUtil");

router.use(jwtUtils.authenticateToken);

router.post("/create", async (request, response) => {
  try {
    const itinerary = request.body;
    const status = await itineraryService.createItinerary(itinerary);
    if (!status.success) {
      return response.status(400).json({ message: status.message });
    }

    return response.status(200).json({ message: status.message });
  } catch (error) {
    console.log(error.message);
    response
      .status(500)
      .json({ message: "Error al intentar registrar la calificación" });
  }
});

router.get("/itineraries/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const itineraries = await itineraryService.getItinerariesByUserId(userId);
    response.status(200).json(itineraries);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Error al realizar la solicitud a la API de Google Maps",
    });
  }
});

module.exports = router;
