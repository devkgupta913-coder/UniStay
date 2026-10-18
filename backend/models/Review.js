const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please add a rating between 1 and 5"],
    },
    comment: {
      type: String,
      required: [true, "Please add a review comment"],
      trim: true,
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
    foodQuality: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
    wifiSpeed: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
