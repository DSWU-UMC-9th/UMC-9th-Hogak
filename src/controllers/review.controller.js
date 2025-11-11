import { addReview } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handleAddReview = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const { userId, content, rating } = req.body;

    if (!userId || !content || rating === undefined) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "userId, content, rating은 필수 입력 항목입니다." });
    }

    const result = await addReview({
      storeId,
      userId,
      body: content,
      score: rating,
    });

    res.status(StatusCodes.CREATED).success({ result });
  } catch (err) {
    console.error("리뷰 추가 오류:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};