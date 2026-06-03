import { randomUUID } from "crypto";
import pool from "../config/db.js";

export const createPasswordResetToken = async ({ email, token }) => {
  const id = randomUUID();

  await pool.query(
    `UPDATE password_resets
     SET used = true
     WHERE email = $1`,
    [email]
  );

  const expiredAt = new Date(Date.now() + 15 * 60 * 1000);

  const result = await pool.query(
    `INSERT INTO password_resets (id, email, token, expired_at, used)
     VALUES ($1, $2, $3, $4, false)
     RETURNING *`,
    [id, email, token, expiredAt]
  );

  return result.rows[0];
};

export const findPasswordResetToken = async (token) => {
  const result = await pool.query(
    `SELECT * FROM password_resets
     WHERE token = $1
     AND used = false
     LIMIT 1`,
    [token]
  );

  return result.rows[0];
};

export const markPasswordResetTokenUsed = async (token) => {
  await pool.query(
    `UPDATE password_resets
     SET used = true
     WHERE token = $1`,
    [token]
  );
};