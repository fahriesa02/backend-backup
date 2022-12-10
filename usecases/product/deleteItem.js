import Product from "../../models/Product.js";

export default async (params) => {
  const payload = params.body
  const item = await Product.destroy({
    where: payload.id,
  });

  if(!item) return [null, 'FAILED_TO_DELETE_PRODUCT'];

  return [{ item }, null];
}