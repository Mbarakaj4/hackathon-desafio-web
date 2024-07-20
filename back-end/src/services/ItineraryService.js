const ItineraryModel = require("../models/ItineraryModel");
const UserService = require("./UserService");
require("dotenv").config();

class ItineraryService {
  static async createItinerary(itinerary) {
    const { date, User, places } = itinerary;
    const userDB = await UserService.getUserById(User.id);

    if (!userDB) {
      return { success: false, message: "El usuario no existe" };
    }

    if (!date) {
      return { success: false, message: "La fecha es requerida" };
    }
    if (!places) {
      return { success: false, message: "Las horas de viaje es requerida" };
    }

    const newItinerary = new ItineraryModel({
      date,
      User,
      places,
    });

    await newItinerary.save();

    return {
      success: true,
      message: "El itinerario ha sido registrada exitosamente",
    };
  }

  static async getItinerariesByUserId(userId) {
    const itineraries = await ItineraryModel.find({ User: userId });
    return itineraries;
  }
}

module.exports = ItineraryService;
