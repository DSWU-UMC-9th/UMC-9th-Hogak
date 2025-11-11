import { prisma } from "../db.config.js";

// 리뷰 추가
export const insertReview = async ({ storeId, userId, body, score }) => {
  try {
    const review = await prisma.review.create({
      data: {
        storeId: Number(storeId),
        userId: Number(userId),
        body,
        score,
      },
    });

    return review;
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류: ${err.message}`);
  }
};