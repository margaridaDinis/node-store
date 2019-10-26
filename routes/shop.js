const express = require('express');
const router = express.Router();

const PATH = require('../util/path');
const shopController = require('../controllers/shop');

router.get(`/`, shopController.getIndex);

router.get(`/${PATH.SHOP_CART}`, shopController.getCart);
router.post(`/${PATH.SHOP_CART}`, shopController.postCart);
router.post(`/${PATH.SHOP_REMOVE_FROM_CART}`, shopController.postRemoveFromCart);

router.get(`/${PATH.SHOP_ORDERS}`, shopController.getOrders);

router.get(`/${PATH.SHOP_CHECKOUT}`, shopController.getCheckout);

router.get(`/${PATH.SHOP_PRODUCTS}`, shopController.getProducts);

router.get(`/${PATH.SHOP_PRODUCT}/:productId`, shopController.getProductDetail);


module.exports = router;