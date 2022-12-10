import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Store from "./Store.js";
import User from "./User.js";

const StoreUser = db.define('store_user', {
  // id: {
  //     type: DataTypes.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true,
  //     allowNull: false,
  // },
  storeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('owner', 'staff'),
    defaultValue: 'staff',
  },
}, {
  freezeTableName: true,
});

export default StoreUser;