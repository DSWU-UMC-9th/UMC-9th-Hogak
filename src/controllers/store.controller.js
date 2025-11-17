import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  /*
  #swagger.tags = ['Store']
  #swagger.summary = '가게 등록 API'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "address", "phoneNumber"],
          properties: {
            regionId: { type: "number", example: 1 },
            name: { type: "string", example: "스타벅스"}
            address: { type: "string", example: "서울시 강남구" },
            score: { type: "number", example: 0 }
          }
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: "가게 등록 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                id: { type: "number", example: 1 },
                name: { type: "string", example: "스타벅스 강남점" }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: "잘못된 요청",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", example: "카테고리가 존재하지 않습니다" },
                data: { type: "object" }
              }
            },
            success: { nullable: true, example: null }
          }
        }
      }
    }
  }
*/
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
  /*
  #swagger.ignore = true
*/
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};