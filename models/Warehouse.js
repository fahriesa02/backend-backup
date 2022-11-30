import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Stores from "./Store.js";

const Warehouses = db.define('warehouses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  storeId: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Stores,
    //   key: 'id',
    // },
  },
  supplyId: {
    type: DataTypes.INTEGER, 
  },
  name: {
    type: DataTypes.STRING
  },
}, {
  freezeTableName: true,
});

export default Warehouses;