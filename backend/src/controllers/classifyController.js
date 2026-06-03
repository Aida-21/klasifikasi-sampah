import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { createHistory } from "../repositories/historyRepository.js";

const formatLabel = (label) => {
  if (!label) return "";

  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
};

const classifyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib diunggah",
      });
    }

    const formData = new FormData();

    // Sesuaikan dengan API tim AI.
    // Dari kode tim AI, field yang diminta adalah "image".
    formData.append("file", fs.createReadStream(req.file.path));

    const aiResponse = await axios.post(
      `${process.env.AI_API_URL}/predict`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    console.log("=== RESPONSE ASLI DARI AI ===");
    console.dir(aiResponse.data, { depth: null });

    const aiPrediction =
      aiResponse.data.prediction ||
      aiResponse.data.result ||
      aiResponse.data;

    const rawPrediction =
      typeof aiPrediction === "object"
        ? aiPrediction.label ||
          aiPrediction.class ||
          aiPrediction.prediction
        : aiPrediction;

    const prediction = formatLabel(rawPrediction);

    let confidence =
      typeof aiPrediction === "object"
        ? aiPrediction.confidence ||
          aiPrediction.score ||
          0
        : aiResponse.data.confidence ||
          aiResponse.data.score ||
          0;

    confidence = Number(confidence);

    if (confidence <= 1) {
      confidence = confidence * 100;
    }

    confidence = Number(confidence.toFixed(2));

    const education = aiResponse.data.education || null;
    const top3 = aiResponse.data.top_3 || [];
    const disclaimer = aiResponse.data.disclaimer || "";

    let history = null;

    if (req.user) {
      history = await createHistory({
        userId: req.user.id,
        imageUrl: req.file.filename,
        prediction,
        confidence,
      });
    }

    console.log("=== HASIL YANG DIKIRIM KE FRONTEND ===");
    console.log("Prediction:", prediction);
    console.log("Confidence:", confidence);
    console.log("Education:", education);
    console.log("Top 3:", top3);

    return res.json({
      success: true,
      message: "Klasifikasi berhasil",
      prediction,
      confidence,
      filename: req.file.filename,
      education,
      top3,
      disclaimer,
      history,
    });
  } catch (error) {
    console.log("=== ERROR AI ===");
    console.dir(error.response?.data, { depth: null });
    console.log(error.response?.status);
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Gagal melakukan klasifikasi dari model AI",
    });
  }
};

export default classifyImage;