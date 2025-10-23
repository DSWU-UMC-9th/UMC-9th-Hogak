import { pool } from "../db.config.js";

export const insertReview = async ({ storeId, userId, body, score }) => {
  const [result] = await pool.query(
    "INSERT INTO review (store_id, user_id, body, score, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW());",
    [storeId, userId, body, score]
  );

  return { id: result.insertId, storeId, userId, body, score };
};