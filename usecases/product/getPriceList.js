import { Product, Supply } from "../../models/index.js";

export default async (params) => {
  const item = Supply.findAll({
    include: {
      model: Product
    },
    where: {
      warehouseId: params.jwt.storeId,
    },
  });

  if(!item) return [null, 'ITEM_SUPPLY_NOT_FOUND'];

  return [{ item }, null];
}