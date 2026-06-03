import { getHistoriesByUserId } from "../repositories/historyRepository.js";

export const getHistories = async (req, res) => {
  try {
    const histories = await getHistoriesByUserId(req.user.id);

    return res.json({
      success: true,
      histories,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};