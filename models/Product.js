import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Store from "./Store.js";

const Product = db.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
  },
  sku: {
    type: DataTypes.STRING,
  },
  pricePerQuantity: {
    type: DataTypes.INTEGER,
  },
  pricePerPacks: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.ENUM('makanan', 'barang'),
    defaultValue: 'makanan',
  },
}, {
  freezeTableName: true,
});

export default Product;