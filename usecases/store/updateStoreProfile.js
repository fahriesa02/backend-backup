import { Store, User } from "../../models/index.js";

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

  // const updateUserEmail = await User.update(updateProfile.email, {
  //   where: {
  //     email: oldStoreProfile.dataValues.email
  //   }
  // });
  
  if(!storeProfile) return [null, 'STORE_PROFILE_NOT_FOUND'];

  const updateStoreProfile = await Store.findOne({
    where: {
      id: storeId,
    },
  });


  if(!updateStoreProfile) return [null, 'UPDATE_STORE_PROFILE_NOT_FOUND'];

  return [{
    previousStoreProfile: oldStoreProfile,
    updatedStoreProfile: updateStoreProfile,
  }, null];
};