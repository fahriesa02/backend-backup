import User from "./User.js";
import Warehouse from "./Warehouse.js";
import Store from "./Store.js";
import Supply from "./Supply.js";
import Product from "./Product.js";
import StoreUser from "./StoreUser.js";
import ProductManagement from "./ProductManagement.js";

await Store.sync();
await User.sync();
await StoreUser.sync();
await Product.sync();
await Warehouse.sync();
await Supply.sync();
await ProductManagement.sync();

// association between store and warehouse
Store.hasMany(Warehouse, { foreignKey: 'storeId' });

// association between store and storeUser
Store.belongsToMany(User, { through: StoreUser });
User.belongsToMany(Store, { through: StoreUser });

// association between warehouse and supply
Warehouse.hasMany(Supply, { foreignKey: 'warehouseId' });

// association between supply and product
Supply.hasMany(Product, { foreignKey: 'supplyId' });
Product.belongsTo(Supply);

Product.hasMany(ProductManagement, { foreignKey: 'productId' });
Supply.hasMany(ProductManagement, { foreignKey: 'supplyId' });
Store.hasMany(ProductManagement, { foreignKey: 'storeId' });

export { User, Warehouse, Product, Supply, Store, StoreUser };