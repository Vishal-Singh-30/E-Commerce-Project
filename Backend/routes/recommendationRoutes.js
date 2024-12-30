const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationsController");

// Get
router.get("/", recommendationController.getRecommendations);

// post
router.post("/", recommendationController.addRecommendation);

module.exports = router;
