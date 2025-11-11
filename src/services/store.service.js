import { addStoreRepo, getStoreById } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";
import { RegionIdMissingError, StoreNameMissingError } from "../errors.js";

export const addStore = async (data) => {
  // 유효성 검사
  if (!data.regionId) throw new RegionIdMissingError("regionId는 필수입니다.");
  if (!data.name) throw new StoreNameMissingError("가게 이름은 필수입니다.");

  // 저장
  const storeId = await addStoreRepo(data);

  // 저장한 가게 다시 조회
  const store = await getStoreById(storeId);

  // DTO로 변환
  return responseFromStore({ store });
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};