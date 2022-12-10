import createPriceList from "../usecases/product/createPriceList.js";
import getPriceList from "../usecases/product/getPriceList.js";


class priceController {
  async inputPriceList(req, res, next) {
    try {
      let [records, errorMsg] = await createPriceList({
        item: {
          type: req.body.type,
          name: req.body.name,
          sku: req.body.sku,
        },
        supply: {
          unit: req.body.unit,
          pricePerQuantity: req.body.price,
        },
      });

      if(errorMsg) return next({ code: errorMsg });
      return res.status(200).json({
        status: true,
        message: 'PRICE_HAS_RECORDED',
        records
      })
    } catch (error) {
      return res.status(400).json({
        code: 'NO_PRICE_RECORDED',
        message: error.message
      });
    }
  }

  async priceList(req, res, next) {
    try {
      const payload = req.jwt.storeId;

      let [records, errorMsg] = await getPriceList(payload);
      if(errorMsg) return next({ code: errorMsg });

      return res.status(200).json({
        status: true,
        message: 'PRICE_LIST_FOUND',
        records,
      });
    } catch (error) {
      return res.status(400).json({
        code: 'NO_PRICE_LIST_FOUND',
        message: error.message,
      });
    }
  }
}

export default new priceController();