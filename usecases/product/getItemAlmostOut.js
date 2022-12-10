import { Product, Supply } from "../../models/index.js";
import { Op } from "sequelize";
import db from "../../config/db_config.js";

export default async (params) => {
  // const item = await Products.findAll({
  //   where: {
  //     storeId: params,
  //   },
  //   attributes: ['name', 'skuProduct']
  // });
  const supply = await Supply.findAll({
    subQuery: false,
    include: {
      model: Product,
      attributes: ['name', 'sku'],
    },
    where: {
      warehousesId: params,
      quantityProduct: {
        [Op.lt]: 20,
      }
    },
    attributes: ['unit', 'quantityProduct']
  });

  // if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];
  return [{ supply }, null];
}