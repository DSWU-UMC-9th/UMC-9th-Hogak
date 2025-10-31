export const bodyToReview = (body) => {
  return {
    userId: Number(body.userId),
    storeId: Number(body.storeId),
    body: body.body || "",
    score: Number(body.score),
  };
};

export const responseFromReview = ({ review }) => {
  return {
    id: review.id,
    userId: review.userId,
    storeId: review.storeId,
    body: review.body,
    score: review.score,
    createdAt: review.createdAt,
  };
};