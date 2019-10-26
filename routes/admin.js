const express = require('express');
const router = express.Router();

const PATH = require('../util/path');
const adminController = require('../controllers/admin');

router.get(`/${PATH.ADD_PRODUCT}`, adminController.getAddProduct);
router.get(`/${PATH.EDIT_PRODUCT}`, adminController.getEditProduct);
router.get(`/${PATH.PRODUCTS}`, adminController.getAdminProducts);

router.post(`/${PATH.ADD_PRODUCT}`, adminController.postAddProduct);

module.exports = router;