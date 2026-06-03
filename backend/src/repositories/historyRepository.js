import pool from "../config/db.js";

export const createHistory = async ({
  userId,
  imageUrl,
  prediction,
  confidence,
}) => {
  const result = await pool.query(
    `INSERT INTO histories (user_id, image_url, prediction, confidence)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, imageUrl, prediction, confidence]
  );

  return result.rows[0];
};

export const getHistoriesByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM histories
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};