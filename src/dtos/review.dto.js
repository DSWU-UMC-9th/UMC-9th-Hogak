// src/dtos/review.dto.js

export const bodyToReview = (body) => {
  return {
    userId: body.userId,
    storeId: body.storeId,
    body: body.body || "",
    score: body.score,
  };
};

export const responseFromReview = ({ review }) => {
  const r = Array.isArray(review) ? review[0] : review;
  return {
    id: r.id,
    userId: r.user_id,
    storeId: r.store_id,
    body: r.body,
    score: r.score,
    createdAt: r.created_at,
  };
};