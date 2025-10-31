import { insertReview } from "../repositories/review.repository.js";

export const addReview = async ({ storeId, userId, body, score }) => {
  if (!storeId || !userId || score === undefined)
    throw new Error("storeId, userId, score는 필수입니다.");

  const review = await insertReview({ storeId, userId, body, score });
  return review;
};