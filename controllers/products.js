const PATH = require('../util/path');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(PATH.SHOP, { 
      products: products,
      hasProducts: products.length > 0,
      pageTitle: 'My Shop',
      path: PATH.SHOP
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render(PATH.APP_PRODUCT, {
    pageTitle: 'Add Product',
    path: PATH.APP_PRODUCT
  });
};

exports.postAddProduct = (req, res, next) => {
  const product =  new Product(req.body.title);

  product.save();
  res.redirect('/');
}; 