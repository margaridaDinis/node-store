const PATH = require('../util/path');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(`shop`, { 
      pageTitle: 'My Shop',
      path: PATH.SHOP
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render(`shop/${PATH.CART}`, { 
    pageTitle: 'Cart',
    path: PATH.CART
  });
};

exports.getOrders = (req, res, next) => {
  res.render(`shop/${PATH.ORDERS}`, { 
    pageTitle: 'Orders',
    path: PATH.ORDERS
  });
};

exports.getCheckout = (req, res, next) => {
  res.render(`shop/${PATH.CHECKOUT}`, { 
    pageTitle: 'Checkout',
    path: PATH.CHECKOUT
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(`shop/${PATH.PRODUCT_LIST}`, { 
      products: products,
      pageTitle: 'All Products',
      path: PATH.PRODUCT_LIST
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  res.render(`shop/${PATH.PRODUCT_DETAIL}`, { 
    pageTitle: 'Product',
    path: PATH.PRODUCT_DETAIL
  });
};

