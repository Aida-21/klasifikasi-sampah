import express from "express";
import multer from "multer";
import path from "path";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  updateProfilePhoto,
  changePassword,
  deleteProfilePhoto,
  deleteAccount,
} from "../controllers/profileController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File harus berupa gambar"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.put(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  updateProfilePhoto
);
router.put("/password", authMiddleware, changePassword);
router.delete("/photo", authMiddleware, deleteProfilePhoto);
router.delete("/", authMiddleware, deleteAccount);

export default router;