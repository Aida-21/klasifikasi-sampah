import express from "express";
import classifyImage from "../controllers/classifyController.js";
import optionalAuthMiddleware from "../middlewares/optionalAuthMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post(
  "/",
  optionalAuthMiddleware,
  upload.single("image"),
  classifyImage
);

export default router;