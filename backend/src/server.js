import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import classifyRoutes from "./routes/classifyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend EcoClassify berjalan",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/classify", classifyRoutes);
app.use("/api/histories", historyRoutes);

// Route tidak ditemukan
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route tidak ditemukan",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});