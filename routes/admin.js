const express = require('express');
const router = express.Router();

const PATH = require('../util/path');
const adminController = require('../controllers/admin');

router.get(`/${PATH.ADMIN_ADD_PRODUCT}`, adminController.getAddProduct);
router.get(`/${PATH.ADMIN_EDIT_PRODUCT}`, adminController.getEditProduct);
router.get(`/${PATH.ADMIN_PRODUCTS}`, adminController.getAdminProducts);

router.post(`/${PATH.ADMIN_ADD_PRODUCT}`, adminController.postAddProduct);

module.exports = router;