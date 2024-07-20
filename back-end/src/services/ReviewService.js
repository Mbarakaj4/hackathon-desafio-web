const ReviewModel = require("../models/ReviewsModel");
const Category = require("../models/CategoriesModel");
const UserService = require("./UserService");
require("dotenv").config();

class ReviewService {
  static async createReview(review) {
    const { user, rating, comment, placeId } = review;

    const userDB = await UserService.getUserById(user);

    if (!userDB) {
      return { success: false, message: "El usuario no existe" };
    }

    if (!user) {
      return { success: false, message: "El usuario es requerido" };
    }
    if (!rating) {
      return { success: false, message: "La calificación es requerida" };
    }
    if (!comment) {
      return { success: false, message: "El comentario es requerido" };
    }
    if (!placeId) {
      return { success: false, message: "El ID del lugar es requerido" };
    }

    const reviewDB = await ReviewModel.findOne({ placeId, userId: user });

    if (reviewDB) {
      return {
        success: false,
        message: "La calificación ya ha sido registrada por el usuario",
      };
    }

    const newReview = new ReviewModel({
      userId: user,
      username: userDB.username,
      rating,
      comment,
      placeId,
    });

    await newReview.save();

    return {
      success: true,
      message: "La calificación ha sido registrada exitosamente",
    };
  }

  static async getReviewsByPlaceId(placeId) {
    const reviews = await ReviewModel.find({ placeId }).sort({ createdAt: -1 });
    const reviewsCount = reviews.length;

    const reviewsOne = reviews.filter((review) => review.rating === 1);
    const reviewsTwo = reviews.filter((review) => review.rating === 2);
    const reviewsThree = reviews.filter((review) => review.rating === 3);
    const reviewsFour = reviews.filter((review) => review.rating === 4);
    const reviewsFive = reviews.filter((review) => review.rating === 5);

    const percentageOne = (reviewsOne.length / reviewsCount) * 100;
    const percentageTwo = (reviewsTwo.length / reviewsCount) * 100;
    const percentageThree = (reviewsThree.length / reviewsCount) * 100;
    const percentageFour = (reviewsFour.length / reviewsCount) * 100;
    const percentageFive = (reviewsFive.length / reviewsCount) * 100;

    let averageRating =
      reviews.reduce((acc, review) => {
        return acc + (review.rating || 0);
      }, 0) / reviews.length || 0;

    averageRating = averageRating.toFixed(2);
    return {
      reviews,
      averageRating,
      percentageOne,
      percentageTwo,
      percentageThree,
      percentageFour,
      percentageFive,
    };
  }
}

module.exports = ReviewService;
