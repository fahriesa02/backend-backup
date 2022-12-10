import { Op } from "sequelize";
import { Product, Supply } from "../../models/index.js";
import currentDate from "../../libraries/currentDate.js";

export default async (params) => {
  // const item = await Product.findAll({
  //   subQuery: false,
  //   include: {
  //     model: Supply,
  //     where: {
  //       [Op.gte]: db.where(db.col('expirationDate'), ">=", await currentDate()),
  //       [Op.gte]: db.where(db.col('quantityProduct'), ">=", 20),
  //     },
  //   },
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
      warehouseId: params,
      expirationDate: {
        [Op.gte]: await currentDate(),
      },
      quantityProduct: {
        [Op.gte]: 20,
      },
    },
    attributes: ['unit', 'quantityProduct']
  });

  // if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];
  return [{ supply }, null];
}