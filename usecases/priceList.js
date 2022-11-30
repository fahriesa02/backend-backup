import Product from "../models/Product.js";
import Supply from "../models/Supply.js";

export default async (params) => {
  const item = await Product.findAll({
    attributes: 'name',
    where: {
      storeId: params,
    },
  });

  const supply = await Supply.findAll({
    attributes: ['pricePerQuantity', 'pricePerPacks'],
    where: {
      storeId: params,
    }
  });

  if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];

  return [{ item, supply }, null];
}