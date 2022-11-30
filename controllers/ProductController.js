import itemAlmostOut from "../usecases/itemAlmostOut.js";
import itemAvailable from "../usecases/itemAvailable.js";
import itemExpired from "../usecases/itemExpired.js";
import itemSoldOut from "../usecases/itemSoldOut.js";
import priceList from "../usecases/priceList.js";

class productController {
  async productAvailable(req, res, next) {
    try {
      const payload = req.jwt.storeId;
      let [records, errorMsg] = await itemAvailable(payload);
      if(errorMsg) return next({
        code: errorMsg,
      });

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

  async priceList(req, res, next) {
    try {
      const payload = req.jwt.storeId;

      let [records, errorMsg] = await priceList(payload);
      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        item: records.item,
        supply: records.supply,
      });
    } catch (error) {
      return res.status(400).json({
        code: 'NO_PRODUCT_FOUND',
        details: error.message
      });
    }
  }

  async inputPriceList(req, res, next) {
    try {
      const reqBody = req.body;
      const storeId = req.jwt.storeId;
    } catch (error) {
      
    }
  }
}

export default new productController();