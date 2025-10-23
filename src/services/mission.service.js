import * as missionRepo from "../repositories/mission.repository.js";
import * as userMissionRepo from "../repositories/mission.repository.js";
import { responseFromUserMission } from "../dtos/mission.dto.js";

export const challengeMission = async ({ userId, storeId, missionId }) => {
  // 1) 미션 존재 여부 확인
  const mission = await missionRepo.getMissionById(missionId);
  if (!mission) throw new Error("존재하지 않는 미션입니다.");

  // 2) 미션이 해당 가게의 미션인지 확인 (보안 검증)
  if (String(mission.store_id) !== String(storeId)) {
    throw new Error("해당 미션은 요청한 가게의 미션이 아닙니다.");
  }

  // 3) 이미 도전중인지 확인 (status가 ongoing인 경우 또는 존재 여부)
  const existing = await userMissionRepo.getUserMissionByUserAndMission(userId, missionId);
  if (existing && existing.status === "ongoing") {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 4) 유저-미션 추가
  const userMissionId = await userMissionRepo.insertUserMission({ userId, missionId, status: "ongoing", progress: 0 });

  // 5) 조회 후 DTO 리턴
  const created = await userMissionRepo.getUserMissionByUserAndMission(userId, missionId);
  return responseFromUserMission({ userMission: created });
};