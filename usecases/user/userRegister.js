import { User, Store, StoreUser } from "../../models/index.js";

export default async (params) => {
  const userParams = params.user;
  const storeParams = params.store;

  const user = await User.create(userParams);
  if(!user) return [null, 'FAILED_TO_CREATE_USER'];

  const store = await Store.create(storeParams);
  if(!store) return [null, 'FAILED_TO_CREATE_STORE'];

  await StoreUser.create({
    storeId: store.id,
    userId: user.id,
  });

  return [{ user, store }, null];
}