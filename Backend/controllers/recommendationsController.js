const express = require("express");
const router = express.Router();
const Recommendation = require("../models/recommendation");

exports.getRecommendations = async (_req, res) => {
  try {
    const recommendations = await Recommendation.find({ rating: { $gte: 4 } });
    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};

exports.addRecommendation = async (req, res) => {
  try {
    const newRecommendation = new Recommendation(req.body);
    await newRecommendation.save();
    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ message: "Failed to add recommendation", error });
  }
};
