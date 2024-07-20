const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },

    rating: {
      type: Number,
      require: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      require: true,
    },
    placeId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
