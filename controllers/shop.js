const PATH = require('../util/path');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(`shop`, { 
      pageTitle: 'My Shop',
      path: PATH.SHOP_INDEX
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render(`shop/${PATH.SHOP_CART}`, { 
    pageTitle: 'Cart',
    path: PATH.SHOP_CART
  });
};

exports.getOrders = (req, res, next) => {
  res.render(`shop/${PATH.SHOP_ORDERS}`, { 
    pageTitle: 'Orders',
    path: PATH.SHOP_ORDERS
  });
};

exports.getCheckout = (req, res, next) => {
  res.render(`shop/${PATH.SHOP_CHECKOUT}`, { 
    pageTitle: 'Checkout',
    path: PATH.SHOP_CHECKOUT
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render(`shop/${PATH.SHOP_PRODUCTS}`, { 
      products: products,
      pageTitle: 'All Products',
      path: PATH.SHOP_PRODUCTS
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const productID = req.params.productId;

  Product.fetchProductById(productID, (product) => {
    if (!product) return res.redirect('/404');

    res.render(`shop/${PATH.SHOP_PRODUCT}`, {
      product,
      pageTitle: product.title,
      path: PATH.SHOP_PRODUCTS
    });
  })
};

