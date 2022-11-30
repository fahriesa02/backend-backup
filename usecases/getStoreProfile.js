import Store from "../models/Store.js";

export default async (params) => {
  const storeProfile = await Store.findOne({
    where: {
      id: params.jwt.storeId
    }
  });

  if(!storeProfile) return [null, 'STORE_INFORMATION_IS_NOT_FOUND'];

  return [{ storeProfile }, null];
}