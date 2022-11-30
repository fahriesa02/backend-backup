import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Store from "./Store.js";
import Supply from "./Supply.js";

const Product = db.define('products', {
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
  skuProduct: {
    type: DataTypes.STRING,
  },
  supplyId: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Supply,
    //   key: 'id'
    // }
  },
  storeId: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Store,
    //   key: 'id',
    // }
  },
}, {
  freezeTableName: true,
});

export default Product;