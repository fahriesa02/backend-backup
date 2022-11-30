import ProductManagement from "../models/ProductManagement.js";
import Product from "../models/Product.js";
import Supply from "../models/Supply.js";
import { Op } from "sequelize";
import db from "../config/db_config.js";
import currentDate from "../libraries/currentDate.js";

export default async (params) => {
  const item = await Product.findAll({
    where: {
      storeId: params,
    },
    attributes: ['name', 'skuProduct'],
  });
  const supply = await Supply.findAll({
    where: {
      warehousesId: params,
    },
    attributes: ['expirationDate', 'quantityProduct'], where: {
      [Op.lte]: db.where(db.col('expirationDate'), "<=", await currentDate()),
    },
  });

  if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];
  return [{ item, supply }, null];
}