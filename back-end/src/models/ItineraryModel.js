const mongoose = require("mongoose");
const Review = require("./ReviewsModel");
const User = require("./UserModel");
require("dotenv").config();


const PlaceHoursSchema = mongoose.Schema({
    placeId: {
        type: String,
        require: true
    },
    hours: {
        type: String,
        require: true
    },
});

const ItinerarySchema = mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    User: {
        type: User.schema,
        require: true
    },
    places : {
        type: [PlaceHoursSchema],
        require: true
    }
}, {timestamps: true});

const Itinerary = mongoose.model("Itinerary", ItinerarySchema);

module.exports = Itinerary;