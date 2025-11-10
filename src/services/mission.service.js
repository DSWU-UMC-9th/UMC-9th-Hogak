import * as missionRepo from "../repositories/mission.repository.js";
import { responseFromUserMission } from "../dtos/mission.dto.js";
import { responseFromMissions } from "../dtos/mission.dto.js";
import { getUserOngoingMissions } from "../repositories/mission.repository.js";
import { responseFromUserMissionList } from "../dtos/mission.dto.js";
import { MissionChallengingError, MissionMissingError, StoreMismatchError, StoreNameMissingError } from "../errors.js";

export const challengeMission = async ({ userId, storeId, missionId }) => {
  // 1) 미션 존재 여부 확인
  const mission = await missionRepo.getMissionById(missionId);
  if (!mission) throw new MissionMissingError("존재하지 않는 미션입니다.", mission);

  // 2) 미션이 해당 가게의 것인지 확인
  if (String(mission.storeId) !== String(storeId)) {
    throw new StoreMismatchError("해당 미션은 요청한 가게의 미션이 아닙니다.", mission.storeId, storeId);
  }

  // 3) 이미 도전 중인지 확인
  const existing = await missionRepo.getUserMissionByUserAndMission(
    userId,
    missionId
  );
  if (existing && existing.status === "ongoing") {
    throw new MissionChallengingError("이미 도전 중인 미션입니다.", existing.status);
  }

  // 4) 새로운 도전 추가
  await missionRepo.insertUserMission({
    userId,
    missionId,
    status: "ongoing",
    progress: 0,
  });

  // 5) 생성된 도전 조회
  const created = await missionRepo.getUserMissionByUserAndMission(
    userId,
    missionId
  );
  return responseFromUserMission({ userMission: created });
};

export const listStoreMissions = async ({ storeId, cursor = 0, take = 20 }) => {
  // 간단 검증
  if (!storeId) throw new StoreNameMissingError("storeId는 필수입니다.");

  const missions = await missionRepo.getMissionsByStoreId({ storeId, cursor, take });
  return responseFromMissions(missions);
};

export const getOngoingMissionsByUser = async (userId) => {
  if (!userId) throw new StoreNameMissingError("userId는 필수입니다.");

  const userMissions = await getUserOngoingMissions(userId);

  return responseFromUserMissionList(userMissions);
};