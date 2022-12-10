import Product from "../../models/Product.js";

export default async (params) => {
  const itemParams = params.item;

  const item = await Product.create(itemParams);

  if(!item) return [null, 'FAILED_TO_INPUT_PRODUCT'];

  return [{ item }, null];
}