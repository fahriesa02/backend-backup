import { Op } from "sequelize";
import db from "../config/db_config.js";
import currentDate from "../libraries/currentDate.js";
import { User, Warehouse, Product, Supply, Store, StoreUsers } from "../models/index.js"

export default async (params) => {
  const item = await Product.findAll({
    where: {
      storeId: params,
    },
    include : {
      model : Supply,
      where:{
        [Op.gte]: db.where(db.col('expirationDate'), ">=", await currentDate()),
        [Op.gte]: db.where(db.col('unit'), ">=", 20),
      }
    },
    attributes: ['name', 'skuProduct']
  });
  // const supply = await Supplies.findAll({
  //   include: {
  //     model: Products,
  //     attributes: ['name', 'skuProduct'],
  //   },
  //   where: {
  //     warehousesId: params,
  //   },
  //   attributes: ['unit', 'quantityProduct']
  // });

  if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  // if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];
  return [{ item }, null];
}