import { prisma } from "../db.config.js";

// 가게 추가
export const addStoreRepo = async (data) => {
  try {
    const store = await prisma.store.create({
      data: {
        regionId: data.regionId,
        name: data.name,
        address: data.address,
        score: data.score ?? 0,
      },
    });

    return store.id;
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다. (${err.message})`);
  }
};

// 가게 상세 조회
export const getStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        region: true, // ✅ region 테이블과 관계를 맺고 있다면 이렇게 join 가능
      },
    });

    if (!store) return null;
    return store;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err.message})`);
  }
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};