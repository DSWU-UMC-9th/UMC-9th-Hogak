import { pool } from "../db.config.js";

export const insertMission = async (mission) => {
  const conn = await pool.getConnection();
  try {
    const sql = `INSERT INTO mission (store_id, title, mission_spec, reward, deadline) VALUES (?, ?, ?, ?, ?);`;
    const params = [mission.storeId, mission.title, mission.missionSpec || null, mission.reward || 0, mission.deadline || null];
    const [result] = await conn.query(sql, params);
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 생성 중 오류: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM mission WHERE id = ?;`, [missionId]);
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw new Error(`미션 조회 중 오류: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getMissionsByStoreId = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM mission WHERE store_id = ?;`, [storeId]);
    return rows;
  } catch (err) {
    throw new Error(`가게 미션 조회 중 오류: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const insertUserMission = async ({ userId, missionId, status = "ongoing", progress = 0 }) => {
  const conn = await pool.getConnection();
  try {
    const sql = `INSERT INTO user_mission (user_id, mission_id, status, progress, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW());`;
    const [result] = await conn.query(sql, [userId, missionId, status, progress]);
    return result.insertId;
  } catch (err) {
    throw new Error(`유저 미션 추가 중 오류: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getUserMissionByUserAndMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ? LIMIT 1;`,
      [userId, missionId]
    );
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw new Error(`유저-미션 조회 중 오류: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getUserMissionsByUserId = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT um.*, m.title FROM user_mission um JOIN mission m ON um.mission_id = m.id WHERE um.user_id = ?;`, [userId]);
    return rows;
  } catch (err) {
    throw new Error(`유저 미션 목록 조회 중 오류: ${err.message}`);
  } finally {
    conn.release();
  }
};