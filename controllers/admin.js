
const PATH = require('../util/path');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render(`admin/${PATH.ADMIN_ADD_PRODUCT}`, {
    pageTitle: 'Add Product',
    path: PATH.ADMIN_ADD_PRODUCT
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render(`admin/${PATH.ADMIN_EDIT_PRODUCT}`, {
    pageTitle: 'Edit Product',
    path: PATH.ADMIN_EDIT_PRODUCT
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(`admin/${PATH.ADMIN_PRODUCTS}`, { 
      products,
      pageTitle: 'Products',
      path: PATH.ADMIN_PRODUCTS
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product =  new Product(req.body);

  product.save();
  res.redirect(`/${PATH.ADMIN_PRODUCTS}`);
}; 
