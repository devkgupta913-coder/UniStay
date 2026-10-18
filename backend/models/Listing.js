const mongoose = require("mongoose");
const Review = require("./Review");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title for the stay"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    accommodationType: {
      type: String,
      required: [true, "Please specify accommodation type"],
      enum: ["Boys PG", "Girls PG", "Co-ed PG", "Flat", "Shared Room", "Private Room"],
    },
    genderPreference: {
      type: String,
      enum: ["Boys", "Girls", "Co-ed", "Any"],
      default: "Any",
    },
    occupancy: {
      type: String,
      enum: ["Single", "Double", "Triple", "4+ Sharing", "1 BHK", "2 BHK", "3 BHK"],
      default: "Double",
    },
    rent: {
      type: Number,
      required: [true, "Please specify monthly rent in INR"],
      min: [500, "Rent must be at least ₹500"],
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
    maintenanceCharges: {
      type: Number,
      default: 0,
    },
    foodIncluded: {
      type: Boolean,
      default: false,
    },
    mealsAvailable: {
      type: [String],
      default: [],
    },
    distanceFromYMCA: {
      type: Number,
      required: [true, "Please specify distance from YMCA campus in km"],
    },
    walkingTimeToYMCA: {
      type: Number,
      default: 10,
    },
    nearestMetro: {
      type: String,
      default: "Escorts Mujesar",
    },
    sector: {
      type: String,
      required: [true, "Please specify sector (e.g., Sector 6, Sector 7, Sector 11)"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please provide the complete address or landmark"],
    },
    locationCoordinates: {
      lat: {
        type: Number,
        default: 28.3678,
      },
      lng: {
        type: Number,
        default: 77.3155,
      },
    },
    images: [
      {
        url: { type: String, required: true },
        filename: { type: String, default: "listing_img" },
      },
    ],
    amenities: {
      type: [String],
      default: ["WiFi", "RO Water"],
    },
    curfewTime: {
      type: String,
      default: "10:30 PM",
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a contact phone number"],
    },
    contactWhatsApp: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Cascade delete reviews when a listing is deleted
listingSchema.pre("findOneAndDelete", async function (next) {
  const listing = await this.model.findOne(this.getQuery());
  if (listing && listing.reviews && listing.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
  next();
});

module.exports = mongoose.model("Listing", listingSchema);
