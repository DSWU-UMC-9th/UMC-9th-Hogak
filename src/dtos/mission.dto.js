export const bodyToMission = (body) => ({
  storeId: Number(body.storeId),
  title: body.title,
  missionSpec: body.missionSpec,
  reward: Number(body.reward) || 0,
  deadline: body.deadline ? new Date(body.deadline) : null,
});

export const responseFromMission = ({ mission }) => ({
  id: mission.id,
  storeId: mission.storeId,
  title: mission.title,
  missionSpec: mission.missionSpec,
  reward: mission.reward,
  deadline: mission.deadline,
  createdAt: mission.createdAt,
});

export const bodyToChallenge = (body) => ({
  userId: Number(body.userId),
});

export const responseFromUserMission = ({ userMission }) => {
  if (!userMission) return null;
  return {
    id: userMission.id,
    userId: userMission.userId,
    missionId: userMission.missionId,
    status: userMission.status,
    progress: userMission.progress,
    createdAt: userMission.createdAt,
  };
};

export const responseFromMissions = (missions) => {
  // missions: 배열
  const data = (missions || []).map((m) => responseFromMission({ mission: m }));
  return {
    data,
    pagination: {
      cursor: data.length ? data[data.length - 1].id : null,
      count: data.length,
    },
  };
};

export const responseFromUserMissionList = (userMissions) => {
  return {
    missions: userMissions.map((um) => ({
      missionId: um.missionId,
      title: um.mission.title,
      missionSpec: um.mission.missionSpec,
      reward: um.mission.reward,
      deadline: um.mission.deadline,
      progress: um.progress,
      status: um.status,
      store: {
        id: um.mission.store.id,
        name: um.mission.store.name,
        address: um.mission.store.address
      }
    }))
  };
};