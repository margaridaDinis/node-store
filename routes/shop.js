const express = require('express');
const router = express.Router();

const PATH = require('../util/path');
const shopController = require('../controllers/shop');

router.get(`/`, shopController.getIndex);
router.get(`/${PATH.CART}`, shopController.getCart);
router.get(`/${PATH.ORDERS}`, shopController.getOrders);
router.get(`/${PATH.CHECKOUT}`, shopController.getCheckout);
router.get(`/${PATH.PRODUCT_LIST}`, shopController.getProducts);
router.get(`/${PATH.PRODUCT_DETAIL}`, shopController.getProductDetail);

module.exports = router;