import { prisma } from "../db.config.js";

// 미션 추가
export const insertMission = async (mission) => {
  try {
    const result = await prisma.mission.create({
      data: {
        storeId: Number(mission.storeId),
        title: mission.title,
        missionSpec: mission.missionSpec,
        reward: mission.reward ?? 0,
        deadline: mission.deadline ? new Date(mission.deadline) : null,
      },
    });
    return result.id;
  } catch (err) {
    throw new Error(`미션 생성 중 오류: ${err.message}`);
  }
};

// 미션 조회
export const getMissionById = async (missionId) => {
  try {
    return await prisma.mission.findUnique({
      where: { id: Number(missionId) },
    });
  } catch (err) {
    throw new Error(`미션 조회 중 오류: ${err.message}`);
  }
};

// 특정 가게의 미션 목록
export const getMissionsByStoreId = async ({ storeId, cursor = 0, take = 20 }) => {
  try {
    const where = {
      storeId: Number(storeId),
      ...(cursor ? { id: { gt: Number(cursor) } } : {}),
    };

    const missions = await prisma.mission.findMany({
      where,
      orderBy: { id: "asc" },
      take: Number(take),
      select: {
        id: true,
        storeId: true,
        title: true,
        missionSpec: true,
        reward: true,
        deadline: true,
        createdAt: true,
      },
    });

    return missions;
  } catch (err) {
    throw new Error(`가게 미션 조회 중 오류: ${err.message}`);
  }
};

// 유저-미션 추가
export const insertUserMission = async ({
  userId,
  missionId,
  status = "ongoing",
  progress = 0,
}) => {
  try {
    const result = await prisma.userMission.create({
      data: {
        userId: Number(userId),
        missionId: Number(missionId),
        status,
        progress,
      },
    });
    return result.id;
  } catch (err) {
    throw new Error(`유저 미션 추가 중 오류: ${err.message}`);
  }
};

// 유저 + 미션으로 특정 도전 조회
export const getUserMissionByUserAndMission = async (userId, missionId) => {
  try {
    return await prisma.userMission.findFirst({
      where: {
        userId: Number(userId),
        missionId: Number(missionId),
      },
    });
  } catch (err) {
    throw new Error(`유저-미션 조회 중 오류: ${err.message}`);
  }
};

// 특정 유저의 전체 도전 조회
export const getUserMissionsByUserId = async (userId) => {
  try {
    return await prisma.userMission.findMany({
      where: { userId: Number(userId) },
      include: { mission: true },
    });
  } catch (err) {
    throw new Error(`유저 미션 목록 조회 중 오류: ${err.message}`);
  }
};

export const getUserOngoingMissions = async (userId) => {
  try {
    const missions = await prisma.userMission.findMany({
      where: {
        userId: Number(userId),
        status: "ongoing"
      },
      include: {
        mission: {
          include: {
            store: true // 가게 정보까지 join
          }
        }
      }
    });

    return missions;
  } catch (err) {
    throw new Error(`유저의 진행 중인 미션 조회 중 오류가 발생했습니다. (${err.message})`);
  }
};