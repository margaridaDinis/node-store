const express = require('express');
const router = express.Router();

const PATH = require('../util/path');
const productsController = require('../controllers/products');

router.get(`/${PATH.APP_PRODUCT}`, productsController.getAddProduct);

router.post(`/${PATH.APP_PRODUCT}`, productsController.postAddProduct);

module.exports = router;