import User from "./User.js";
import Warehouse from "./Warehouse.js";
import Store from "./Store.js";
import Supply from "./Supply.js";
import Product from "./Product.js";
import StoreUsers from "./StoreUsers.js";
import ProductManagement from "./ProductManagement.js";

await Store.sync();
await User.sync();
await StoreUsers.sync();
await Product.sync();
await Warehouse.sync();
await Supply.sync();
await ProductManagement.sync();

Store.hasMany(Warehouse, { foreignKey: 'storeId' });
Store.hasMany(Product, { foreignKey: 'storeId' });
Store.hasMany(ProductManagement, { foreignKey: 'storeId' });
Product.hasMany(ProductManagement, { foreignKey: 'productId' });
Warehouse.hasMany(Supply, { foreignKey: 'warehousesId' });
Supply.hasMany(Product, { foreignKey: 'suppliesId' });
Supply.hasMany(Warehouse, { foreignKey: 'warehousesId' });
Product.belongsTo(Supply);
Supply.hasMany(ProductManagement, { foreignKey: 'suppliesId' });

Store.belongsToMany(User, { through: StoreUsers });
User.belongsToMany(Store, { through: StoreUsers });

export { User, Warehouse, Product, Supply, Store, StoreUsers };