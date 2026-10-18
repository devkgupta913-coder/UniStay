const Review = require("../models/Review");
const Listing = require("../models/Listing");

// @desc    Add review to listing
// @route   POST /api/listings/:listingId/reviews
// @access  Private (Students)
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment, cleanliness, foodQuality, wifiSpeed } = req.body;
    const listingId = req.params.listingId;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    // Check if user has already reviewed
    const existingReview = await Review.findOne({
      listing: listingId,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review for this stay",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      listing: listingId,
      rating: Number(rating),
      comment,
      cleanliness: Number(cleanliness) || 4,
      foodQuality: Number(foodQuality) || 4,
      wifiSpeed: Number(wifiSpeed) || 4,
    });

    // Add review ID to listing
    listing.reviews.push(review._id);

    // Calculate new average rating
    const allReviews = await Review.find({ listing: listingId });
    const avgRating =
      allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;

    listing.rating = parseFloat(avgRating.toFixed(1));
    listing.numReviews = allReviews.length;
    await listing.save();

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name avatar college"
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: populatedReview,
      averageRating: listing.rating,
      numReviews: listing.numReviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/listings/:listingId/reviews/:id
// @access  Private (Author or Admin)
exports.deleteReview = async (req, res, next) => {
  try {
    const { listingId, id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    // Check ownership
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(id);

    // Update listing reviews and average rating
    const listing = await Listing.findById(listingId);
    if (listing) {
      listing.reviews = listing.reviews.filter((rId) => rId.toString() !== id);
      const remainingReviews = await Review.find({ listing: listingId });
      if (remainingReviews.length > 0) {
        const avgRating =
          remainingReviews.reduce((acc, item) => item.rating + acc, 0) /
          remainingReviews.length;
        listing.rating = parseFloat(avgRating.toFixed(1));
      } else {
        listing.rating = 0;
      }
      listing.numReviews = remainingReviews.length;
      await listing.save();
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
