const express = require('express');
const router = express.Router();

const PATH = require('../util/path');
const adminController = require('../controllers/admin');

router.get(`/${PATH.ADMIN_ADD_PRODUCT}`, adminController.getAddProduct);
router.post(`/${PATH.ADMIN_ADD_PRODUCT}`, adminController.postAddProduct);

router.get(`/${PATH.ADMIN_EDIT_PRODUCT}/:productId`, adminController.getEditProduct);
router.post(`/${PATH.ADMIN_EDIT_PRODUCT}`, adminController.postEditProduct);

router.get(`/${PATH.ADMIN_PRODUCTS}`, adminController.getAdminProducts);

router.post(`/${PATH.ADMIN_DELETE_PRODUCT}`, adminController.postDeleteProduct);

module.exports = router;