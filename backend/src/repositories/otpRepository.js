import { randomUUID } from "crypto";
import pool from "../config/db.js";

export const createOtp = async ({ email, otp }) => {
  const id = randomUUID();

  await pool.query(
    `DELETE FROM email_otps WHERE email = $1`,
    [email]
  );

  const expiredAt = new Date(Date.now() + 5 * 60 * 1000);

  const result = await pool.query(
    `INSERT INTO email_otps (id, email, otp, expired_at)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [id, email, otp, expiredAt]
  );

  return result.rows[0];
};

export const findOtpByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM email_otps
     WHERE email = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [email]
  );

  return result.rows[0];
};

export const deleteOtpByEmail = async (email) => {
  await pool.query(
    `DELETE FROM email_otps WHERE email = $1`,
    [email]
  );
};