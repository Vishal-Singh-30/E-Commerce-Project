const mongoose = require("mongoose");

//  Recommendation schema
const recommendationSchema = new mongoose.Schema({
  // id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true },
});

//  Recommendation model
module.exports = mongoose.model("Recommendation", recommendationSchema);
