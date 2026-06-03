import express from "express";
import multer from "multer";
import classifyImage from "../controllers/classifyController.js";
import optionalAuthMiddleware from "../middlewares/optionalAuthMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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

router.post(
  "/",
  optionalAuthMiddleware,
  upload.single("image"),
  classifyImage
);

export default router;