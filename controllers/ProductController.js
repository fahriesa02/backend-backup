import itemAlmostOut from "../usecases/product/getItemAlmostOut.js";
import itemAvailable from "../usecases/product/getItemAvailable.js";
import itemExpired from "../usecases/product/getItemExpired.js";
import itemSoldOut from "../usecases/product/getItemSoldOut.js";
import addItem from "../usecases/product/addItem.js";
import deleteItem from "../usecases/product/deleteItem.js";
import updateItem from "../usecases/product/updateItem.js";

class productController {
  async addProduct(req, res, next) {
    try {
      if(!req.body.name) return next({ code: 'PRODUCT_NAME_IS_REQUIRED' });

      if(!req.body.sku) return next({ code: 'PRODUCT_SKU_IS_REQUIRED' });

      if(!req.body.pricePerQuantity || !req.body.pricePerPacks) return next({ code: 'PRODUCT_PRICE_IS_REQUIRED' });

      let [records, errorMsg] = await addItem({
        item: {
          name: req.body.name,
          sku: req.body.sku,
          pricePerQuantity: req.body.pricePerQuantity,
          pricePerPacks: req.body.pricePerPacks,
        },
      })

      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        message: 'PRODUCT_INPUT_SUCCESS',
        item: records,
      });
    } catch (error) {
      return res.status(400).json({
        code: 'PRODUCT_INPUT_FAILURE',
        details: error.message,
      });
    }
  }

  async updateProduct(req, res, next) {
    try {
      if(!req.body) return next({ code: 'PRODUCT_FIELD_IS_EMPTY' });

      if(!req.body.name) return next({ code: 'PRODUCT_NAME_IS_REQUIRED' });

      let [records, errorMsg] = await updateItem(req);
      if(errorMsg) return next({
        code: errorMsg,
      });

      return res.status(200).json({
        status: true,
        message: 'PRODUCT_HAS_UPDATED',
        item: records
      })
    } catch (error) {
      return res.status(400).json({
        code: 'PRODUCT_UPDATE_FAILURE',
        details: error.message,
      });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      let [records, errorMsg] = await deleteItem(req);
      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        message: 'PRODUCT_HAS_DELETED',
      });
    } catch (error) {
      return res.status(400).json({
        code: 'PRODUCT_DELETE_FAILURE',
        details: error.message
      });
    }
  }

  async productAvailable(req, res, next) {
    try {
      const payload = req.jwt.storeId;
      let [records, errorMsg] = await itemAvailable(payload);
      if(errorMsg) return next({ code: errorMsg });

      const itemDetail = records.item;
      const supplyDetail = records.supply;

      return res.status(200).json({
        status: true,
        item: itemDetail,
        supply: supplyDetail
      });
    } catch(error) {
      return res.status(400).json({
        code: 'NO_PRODUCT_FOUND',
        details: error.message
      });
    }
  }

  async productAlmostOut(req, res, next) {
    try {
      const payload = req.jwt.storeId;

      let [records, errorMsg] = await itemAlmostOut(payload);
      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        item: records.item,
        supply: records.supply,
      });
    } catch(error) {
      return res.status(400).json({
        code: 'NO_PRODUCT_FOUND',
        details: error.message
      });
    }
  }

  async productExpired(req, res, next) {
    try {
      const payload = req.jwt.storeId;

      let [records, errorMsg] = await itemExpired(payload);
      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        item: records.item,
        supply: records.supply
      });
    } catch(error) {
      return res.status(400).json({
        code: 'NO_PRODUCT_FOUND',
        details: error.message
      });
    }
  }

  async productSoldOut(req, res, next) {
    try {
      const payload = req.jwt.storeId;

      let [records, errorMsg] = await itemSoldOut(payload);
      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        item: records.item,
        supply: records.supply
      });
    } catch(error) {
      return res.status(400).json({
        code: 'NO_PRODUCT_FOUND',
        details: error.message
      });
    }
  }
}

export default new productController();