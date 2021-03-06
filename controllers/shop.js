const PATH = require('../util/path');
const Product = require('../models/product');
// const Orders = require('../models/orders');

exports.getIndex = (req, res) => {
  res.render('shop', {
    pageTitle: 'My Shop',
    path: PATH.SHOP_INDEX
  });
};

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then(products => {
      res.render(`shop/${PATH.SHOP_CART}`, {
        pageTitle: 'Cart',
        products,
        path: PATH.SHOP_CART
      });
    }).catch(err => console.log({ err }));
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  
  return Product.fetchById(productId)
    .then(product => req.user.addToCart(product))
    .then(() => res.redirect(`/${PATH.SHOP_CART}`))
    .catch(err => console.log({ err }));
};

exports.postRemoveFromCart = (req, res) => {
  const productId = req.body.productId;

  req.user
    .removeFromCart(productId)
    .then(() => res.redirect(`/${PATH.SHOP_CART}`))
    .catch(err => console.log({ err }));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders()
    .then(orders => 
      res.render(`shop/${PATH.SHOP_ORDERS}`, {
        pageTitle: 'Orders',
        orders,
        path: PATH.SHOP_ORDERS
      })
    ).catch(err => console.log({ err }));
};

exports.postCreateOrder = (req, res) => {
  let _cart;

  req.user
    .addOrder()
    .then(() => {
      res.redirect(`${PATH.SHOP_ORDERS}`);
    })
    .catch(err => console.log(err));  
};

// exports.getCheckout = (req, res) => {
//   res.render(`shop/${PATH.SHOP_CHECKOUT}`, {
//     pageTitle: 'Checkout',
//     path: PATH.SHOP_CHECKOUT
//   });
// };

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.render(`shop/${PATH.SHOP_PRODUCTS}`, {
        products,
        pageTitle: 'All Products',
        path: PATH.SHOP_PRODUCTS
      });
    }).catch(err => console.log(err));
};

exports.getProductDetail = (req, res) => {
  const productId = req.params.productId;

  Product.fetchById(productId)
    .then((product) => {
      if (!product) return res.redirect('/404');

      res.render(`shop/${PATH.SHOP_PRODUCT}`, {
        product: product,
        pageTitle: product.title,
        path: PATH.SHOP_PRODUCTS
      });
    }).catch(err => console.log({ err }));
};
