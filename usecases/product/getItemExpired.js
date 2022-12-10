import { Product, Supply } from "../../models/index.js";
import { Op } from "sequelize";
import currentDate from "../../libraries/currentDate.js";

export default async (params) => {
  // const item = await Products.findAll({
  //   where: {
  //     storeId: params,
  //   },
  //   attributes: ['name', 'skuProduct'],
  // });
  const supply = await Supply.findAll({
    subQuery: false,
    include: {
      model: Product,
      attributes: ['name', 'sku'],
    },
    where: {
      warehousesId: params,
      expirationDate: {
        [Op.lt]: await currentDate(),
      },
    },
    attributes: ['expirationDate', 'quantityProduct']
  });

  // if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];
  return [{ supply }, null];
}