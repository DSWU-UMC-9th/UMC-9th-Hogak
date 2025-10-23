import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const missionId = req.params.missionId;
    const { userId } = bodyToChallenge(req.body);

    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "userId는 필수입니다." });
    }

    const userMission = await challengeMission({ userId, storeId, missionId });

    return res.status(StatusCodes.CREATED).json({ result: userMission });
  } catch (err) {
    console.error("mission.controller error:", err);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};