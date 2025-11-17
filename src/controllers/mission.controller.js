import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";
import { listStoreMissions } from "../services/mission.service.js";
import { getOngoingMissionsByUser } from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  // #swagger.ignore = true
  try {
    const storeId = req.params.storeId;
    const missionId = req.params.missionId;
    const { userId } = bodyToChallenge(req.body);

    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "userId는 필수입니다." });
    }

    const userMission = await challengeMission({
      userId,
      storeId,
      missionId,
    });

    return res.status(StatusCodes.CREATED).json({ result: userMission });
  } catch (err) {
    console.error("mission.controller error:", err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "미션 도전 중 오류 발생" });
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  // #swagger.ignore = true
  try {
    const storeId = Number(req.params.storeId);
    if (Number.isNaN(storeId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "storeId must be a number." });
    }

    const cursor = typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0;
    const take = typeof req.query.take === "string" ? Number(req.query.take) : 20;

    const result = await listStoreMissions({ storeId, cursor, take });

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error("mission.controller error:", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || "미션 목록 조회 중 오류가 발생했습니다." });
  }
};

export const handleGetUserOngoingMissions = async (req, res) => {
  // #swagger.ignore = true
  console.log("진행 중인 미션 목록 요청:", req.params);

  try {
    const { userId } = req.params;
    const result = await getOngoingMissionsByUser(userId);

    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error("진행 중인 미션 목록 조회 중 오류:", err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "진행 중인 미션 조회 실패" });
  }
};