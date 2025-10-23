import { pool } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO store 
      (region_id, name, address, score)
      VALUES (?, ?, ?, ?);`,
      [
        data.regionId,
        data.name,
        data.address,
        data.score
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 가게 상세 조회
export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT s.*, r.name AS region_name 
       FROM store s
       JOIN region r ON s.region_id = r.id
       WHERE s.id = ?;`,
      [storeId]
    );

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};