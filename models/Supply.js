import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Product from "./Product.js";
import Warehouses from "./Warehouse.js";

const Supply = db.define('supply', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  expirationDate: {
    type: DataTypes.DATEONLY
  },
  unit: {
    type: DataTypes.ENUM('pcs', 'pieces'),
    defaultValue: 'pcs',
  },
  quantityProduct: {
    type: DataTypes.INTEGER,
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Warehouses,
      key: 'id',
    },
  },
}, {
  freezeTableName: true,
});

export default Supply;