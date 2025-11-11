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
  return {
    id: store.id,
    regionId: store.regionId,
    regionName: store.region?.name || null,
    name: store.name,
    address: store.address,
    score: store.score,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
