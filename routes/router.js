import express from 'express';
import Auth from '../controllers/UsersController.js';
import Product from '../controllers/ProductController.js';
import Store from '../controllers/ProfileController.js';
import Setting from '../controllers/SettingController.js';
import Price from '../controllers/PriceController.js';
import jwtAuth from '../middlewares/jwtAuth.js';

const router = express.Router();

router.get('/', jwtAuth(), (req, res) => {
  res.status(200).json({
    message: 'Selamat Datang di API Logitory!!!'
  });
});

// AUTH endpoint
router.post('/auth/register', Auth.Register);
router.post('/auth/login', Auth.Login);
router.post('/auth/refresh-token', Auth.refreshToken);
router.post('/auth/forget-password', Auth.forgetPassword);

// PROFILE endpoint
router.get('/profile', jwtAuth(), Store.getProfile);
router.put('/profile/edit_profile', jwtAuth(), Store.updateProfile);

// SETTING endpoint
router.get('/setting', jwtAuth(), Setting.getStoreSetting);

// ITEM MANAGEMENT endpoint
router.get('/product/product_available', jwtAuth(), Product.productAvailable);
router.get('/product/product_almost_out', jwtAuth(), Product.productAlmostOut);
router.get('/product/product_expired', jwtAuth(), Product.productExpired);
router.get('/product/product_sold_out', jwtAuth(), Product.productSoldOut);

// CREATE, UPDATE, DELETE product endpoint
router.post('/product/input_product', jwtAuth(), Product.addProduct);
router.put('/product/update_product', jwtAuth(), Product.updateProduct);
router.delete('/product/delete_product', jwtAuth(), Product.deleteProduct);

// CREATE, VIEW price list endpoint
router.post('/product/input_price_list', jwtAuth(), Price.inputPriceList);
router.get('/product/price_list', jwtAuth(), Price.priceList);

export default router;