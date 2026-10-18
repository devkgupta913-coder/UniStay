const express = require("express");
const router = express.Router({ mergeParams: true });
const { addReview, deleteReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

router.post("/", protect, addReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
