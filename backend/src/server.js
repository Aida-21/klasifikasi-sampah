import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import classifyRoutes from "./routes/classifyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

// Pastikan folder uploads ada
const uploadDir = path.join("src", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Folder uploads berhasil dibuat");
}

const app = express();

app.use(cors());
app.use(express.json());

// Akses file upload
app.use("/uploads", express.static(uploadDir));

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
    message: error.message || "Terjadi kesalahan pada server",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
// Tambahkan header CORS khusus untuk folder uploads
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Baru serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));