const PATH = require('../util/path');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render(`shop`, { 
      pageTitle: 'My Shop',
      path: PATH.SHOP_INDEX
    });
  });
};

exports.getCart = (req, res) => {
  res.render(`shop/${PATH.SHOP_CART}`, { 
    pageTitle: 'Cart',
    path: PATH.SHOP_CART
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;

  Product.fetchProductById(productId, (product) => {
    if (!product) return alert('Could not add this product to the cart!');

    Cart.addProduct(productId, product.price);
  });

  res.redirect(`/${PATH.SHOP_CART}`)
};

exports.getOrders = (req, res) => {
  res.render(`shop/${PATH.SHOP_ORDERS}`, { 
    pageTitle: 'Orders',
    path: PATH.SHOP_ORDERS
  });
};

exports.getCheckout = (req, res) => {
  res.render(`shop/${PATH.SHOP_CHECKOUT}`, { 
    pageTitle: 'Checkout',
    path: PATH.SHOP_CHECKOUT
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render(`shop/${PATH.SHOP_PRODUCTS}`, { 
      products: products,
      pageTitle: 'All Products',
      path: PATH.SHOP_PRODUCTS
    });
  });
};

exports.getProductDetail = (req, res) => {
  const productId = req.params.productId;

  Product.fetchProductById(productId, (product) => {
    if (!product) return res.redirect('/404');

    res.render(`shop/${PATH.SHOP_PRODUCT}`, {
      product,
      pageTitle: product.title,
      path: PATH.SHOP_PRODUCTS
    });
  });
};
