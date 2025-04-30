const express = require("express");
const reviewController = require("../controllers/reviewControllers");
const router = express.Router();

// Submit a new review
router.post("/", reviewController.submitReview);

// Get pending reviews
router.get("/pending", reviewController.getPendingReviews);

// Approve a review
router.patch("/approve/:id", reviewController.approveReview);
router.get("/approved", reviewController.getaproveReviews);

// Reject a review
router.patch("/reject/:id", reviewController.rejectReview);

module.exports = router;
