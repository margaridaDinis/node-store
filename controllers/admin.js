
const PATH = require('../util/path');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render(`admin/${PATH.ADD_PRODUCT}`, {
    pageTitle: 'Add Product',
    path: PATH.ADD_PRODUCT
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render(`admin/${PATH.EDIT_PRODUCT}`, {
    pageTitle: 'Edit Product',
    path: PATH.EDIT_PRODUCT
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(`admin/${PATH.PRODUCTS}`, { 
      products,
      pageTitle: 'Products',
      path: PATH.PRODUCTS
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product =  new Product(req.body);

  product.save();
  res.redirect(`/${PATH.PRODUCT_LIST}`);
}; 
