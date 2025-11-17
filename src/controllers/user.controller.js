import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
  #swagger.tags = ['User']
  #swagger.summary = '회원 가입 API';
  #swagger.description = '사용자가 이메일, 기본 정보, 선호 카테고리를 기반으로 회원 가입을 진행합니다.'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "name", "phoneNumber"],
          properties: {
            email: { type: "string", example: "test@example.com" },
            name: { type: "string", example: "홍길동" },
            gender: { type: "string", example: "남성" },
            birth: { type: "string", format: "date", example: "1999-01-01" },
            address: { type: "string", example: "서울시 강남구" },
            detailAddress: { type: "string", example: "101동 202호" },
            phoneNumber: { type: "string", example: "010-1234-5678" },
            preferences: {
              type: "array",
              example: [1, 3],
              items: { type: "number" }
            }
          }
        }
      }
    }
  };

  #swagger.responses[200] = {
    description: "회원 가입 성공 응답",
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
                email: { type: "string", example: "test@example.com" },
                name: { type: "string", example: "홍길동" },
                gender: { type: "string", example: "남성" },
                birth: { type: "string", format: "date", example: "1999-01-01" },
                address: { type: "string", example: "서울시 강남구" },
                detailAddress: { type: "string", example: "101동 202호" },
                phoneNumber: { type: "string", example: "010-1234-5678" },
                preferences: {
                  type: "array",
                  example: [1, 3],
                  items: { type: "number" }
                }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "회원 가입 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                data: {
                  email: { type: "string", example: "test@example.com" },
                  name: { type: "string", example: "홍길동" },
                  gender: { type: "string", example: "남성" },
                  birth: { type: "string", format: "date", example: "1999-01-01" },
                  address: { type: "string", example: "서울시 강남구" },
                  detailAddress: { type: "string", example: "101동 202호" },
                  phoneNumber: { type: "string", example: "010-1234-5678" },
                  preferences: {
                    type: "array",
                    example: [1, 3],
                    items: { type: "number" }
                  }
                }
              }
            },
            success: { nullable: true, example: null }
          }
        }
      }
    }
  };
*/

  
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};
