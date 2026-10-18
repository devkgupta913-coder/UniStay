const express = require("express");
const router = express.Router();
const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
} = require("../controllers/listingController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const reviewRouter = require("./reviewRoutes");

// Nested review route
router.use("/:listingId/reviews", reviewRouter);

// Specific routes before param routes
router.get("/my/listings", protect, getMyListings);

router
  .route("/")
  .get(getListings)
  .post(protect, upload.single("image"), createListing);

router
  .route("/:id")
  .get(getListingById)
  .put(protect, upload.single("image"), updateListing)
  .delete(protect, deleteListing);

module.exports = router;
