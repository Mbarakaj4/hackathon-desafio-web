const express = require("express");
const router = express.Router();
const reviewService = require("../services/ReviewService");
const jwtUtils = require("../utils/JwtUtil");

router.use(jwtUtils.authenticateToken);

router.post("/create", async (request, response) => {
  try {
    const review = request.body;
    const status = await reviewService.createReview(review);
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

router.get("/reviews/:placeId", async (request, response) => {
  try {
    const placeId = request.params.placeId;
    const reviews = await reviewService.getReviewsByPlaceId(placeId);
    response.status(200).json(reviews);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Error al realizar la solicitud a la API de Google Maps",
    });
  }
});

module.exports = router;
