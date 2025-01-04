// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotEnv = require("dotenv");

// Connect to MongoDB
dotEnv.config();

//backup
const cron = require("node-cron");
const createBackup = require("./config/backup");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Manual Trigger for Backup via API
app.post("/backup", (req, res) => {
  try {
    createBackup(); // Call the backup function
    res.status(200).send("Backup process started successfully.");
  } catch (error) {
    console.error("Error starting backup:", error.message);
    res.status(500).send("Failed to start backup process.");
  }
});

// Schedule automatic backups (e.g., every 24 hours)
// const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

// setInterval(() => {
//   console.log("Starting automatic backup...");
//   createBackup();
// }, ONE_DAY_IN_MILLISECONDS);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
