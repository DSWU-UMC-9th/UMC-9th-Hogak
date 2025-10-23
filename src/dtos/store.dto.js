// 요청 body → store 객체 변환
export const bodyToStore = (body) => {
  return {
    regionId: body.regionId, // 필수
    name: body.name, // 필수
    address: body.address || "", // 선택
    score: body.score || 0 // 선택
  };
};

// DB에서 가져온 store → 응답 형태로 변환
export const responseFromStore = ({ store }) => {
  const s = Array.isArray(store) ? store[0] : store;

  return {
    id: s.id,
    regionId: s.region_id,
    name: s.name,
    address: s.address,
    score: s.score
  };
};
