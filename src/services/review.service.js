import { insertReview } from "../repositories/review.repository.js";

export const addReview = async ({ storeId, userId, body, score }) => {
  const review = await insertReview({ storeId, userId, body, score });
  return review;
};