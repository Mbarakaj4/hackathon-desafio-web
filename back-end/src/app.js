const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mapsApi = require("./api/MapsApi");
const userApi = require("./api/UserApi");
const securityApi = require("./api/SecurityApi");
const reviewApi = require("./api/ReviewApi");
const itineraryApi = require("./api/ItineraryApi");
const cors = require("cors");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cors());

//database connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3002, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((e) => console.log("Connection failed!", e));

//routes
app.use("/api/maps/", mapsApi);
app.use("/api/user/", userApi);
app.use("/api/security/", securityApi);
app.use("/api/review/", reviewApi);
app.use("/api/itinerary/", itineraryApi);
