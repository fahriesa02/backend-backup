import db from '../config/db_config.js';
import { DataTypes } from 'sequelize';
import Store from './Store.js';
import Product from './Product.js';
import Supply from './Supply.js';
import Warehouse from './Warehouse.js';

const ProductManagement = db.define('product_management', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  storeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: 'id',
    },
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Warehouse,
      key: 'id',
    },
  },
  suppliesId: {
    type: DataTypes.INTEGER,
    references: {
      model: Supply,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  statusProduct: {
    type: DataTypes.ENUM('tersedia', 'hampir-habis', 'expired', 'habis'),
    defaultValue: 'tersedia',
  }
});

export default ProductManagement;