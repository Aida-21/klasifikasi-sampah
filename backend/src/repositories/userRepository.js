import { randomUUID } from "crypto";
import pool from "../config/db.js";

export const createUser = async ({ name, email, password }) => {
  const id = randomUUID();

  const result = await pool.query(
    `INSERT INTO users (id, name, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, photo, is_verified, created_at`,
    [id, name, email, password]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, photo, created_at FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const updateUserById = async ({ id, name, email }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2
     WHERE id = $3
     RETURNING id, name, email, photo, created_at`,
    [name, email, id]
  );

  return result.rows[0];
};

export const updateUserPhotoById = async ({ id, photo }) => {
  const result = await pool.query(
    `UPDATE users
     SET photo = $1
     WHERE id = $2
     RETURNING id, name, email, photo, created_at`,
    [photo, id]
  );

  return result.rows[0];
};
export const updatePasswordById = async ({ id, password }) => {
  const result = await pool.query(
    `UPDATE users
     SET password = $1
     WHERE id = $2
     RETURNING id, name, email, photo, created_at`,
    [password, id]
  );

  return result.rows[0];
};
export const deleteUserPhotoById = async (id) => {
  const result = await pool.query(
    `UPDATE users
     SET photo = NULL
     WHERE id = $1
     RETURNING id, name, email, photo, created_at`,
    [id]
  );

  return result.rows[0];
};
export const verifyUserByEmail = async (email) => {
  const result = await pool.query(
    `UPDATE users
     SET is_verified = true
     WHERE email = $1
     RETURNING id, name, email, photo, is_verified, created_at`,
    [email]
  );

  return result.rows[0];
};

export const updatePasswordByEmail = async ({ email, password }) => {
  const result = await pool.query(
    `UPDATE users
     SET password = $1
     WHERE email = $2
     RETURNING id, name, email, photo, is_verified, created_at`,
    [password, email]
  );

  return result.rows[0];
};
export const deleteUserById = async (id) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id, name, email`,
    [id]
  );

  return result.rows[0];
};