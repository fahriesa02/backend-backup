import Product from "../../models/Product.js";

export default async (params) => {
  const payload = params.body;
  const item = Product.update(payload, {
    where: payload.name,
  });

  if(!item) return [null, 'FAILED_TO_UPDATE_PRODUCT'];

  return [{ item }, null];
}