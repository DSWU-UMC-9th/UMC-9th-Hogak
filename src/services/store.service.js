import { addStore as addStoreRepo, getStoreById } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const addStore = async (data) => {
  // 기본 유효성 검사
  if (!data.regionId) throw new Error("regionId는 필수입니다.");
  if (!data.name) throw new Error("가게 이름은 필수입니다.");

  // 저장
  const storeId = await addStoreRepo(data);

  // 저장한 가게 다시 조회
  const store = await getStoreById(storeId);

  return responseFromStore({ store });
};