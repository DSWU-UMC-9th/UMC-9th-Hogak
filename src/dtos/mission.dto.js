export const bodyToMission = (body) => {
  return {
    storeId: body.storeId,
    title: body.title,
    missionSpec: body.missionSpec,
    reward: body.reward,
    deadline: body.deadline,
  };
};

export const responseFromMission = ({ mission }) => {
  const m = Array.isArray(mission) ? mission[0] : mission;
  return {
    id: m.id,
    storeId: m.store_id,
    title: m.title,
    missionSpec: m.mission_spec,
    reward: m.reward,
    deadline: m.deadline,
    createdAt: m.created_at,
  };
};

export const bodyToChallenge = (body) => {
  // challenge API에서는 userId만 body로 받는다고 가정
  return {
    userId: body.userId,
  };
};

export const responseFromUserMission = ({ userMission }) => {
  const um = Array.isArray(userMission) ? userMission[0] : userMission;
  if (!um) return null;
  return {
    id: um.id,
    userId: um.user_id,
    missionId: um.mission_id,
    status: um.status,
    progress: um.progress,
    createdAt: um.created_at,
  };
};