import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  console.log("가게 추가 요청이 들어왔습니다!");
  console.log("body:", req.body);

  try {
    const storeData = bodyToStore(req.body); // 요청 body → DTO 변환
    const store = await addStore(storeData); // 서비스 호출
    res.status(StatusCodes.OK).json({ result: store });
  } catch (err) {
    console.error("가게 추가 중 오류:", err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json(reviews);
};