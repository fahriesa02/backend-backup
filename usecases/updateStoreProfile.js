import Store from "../models/Store.js";

export default async (params) => {
  const updateProfile = params.body;
  const storeId = params.jwt.storeId;

  const oldStoreProfile = await Store.findOne({
    where: {
      id: storeId,
    },
  });

  const storeProfile = await Store.update(updateProfile, {
    where: {
      id: storeId,
    },
  });

  if(!storeProfile) return [null, 'STORE_PROFILE_NOT_FOUND'];

  const updateStoreProfile = await Store.findOne({
    where: {
      id: storeId,
    },
  });

  if(!updateStoreProfile) return [null, 'UPDATE_STORE_PROFILE'];

  return [{
    previousStoreProfile: oldStoreProfile,
    updatedStoreProfile: updateStoreProfile,
  }, null];
};