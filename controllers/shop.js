const PATH = require('../util/path');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res) => {
  res.render('shop', {
    pageTitle: 'My Shop',
    path: PATH.SHOP_INDEX
  });
};

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then(cart => cart.getProducts())
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
  let Cart;
  let quantity = 1;

  req.user
    .getCart()
    .then(cart => {
      Cart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(([productInCart]) => {
      if (productInCart) {
        const oldQuantity = productInCart.cartItem.quantity;
        quantity = oldQuantity + 1;

        return productInCart;
      }

      return Product.findByPk(productId);
    })
    .then(product => Cart.addProduct(product, { through: { quantity } }))
    .then(() => res.redirect(`/${PATH.SHOP_CART}`))
    .catch(err => console.log({ err }));
};

exports.postRemoveFromCart = (req, res) => {
  const productId = req.body.productId;

  req.user
    .getCart()
    .then(cart => cart.getProducts({ where: { id: productId }}))
    .then(([product]) => product.cartItem.destroy())
    .then(() => res.redirect(`/${PATH.SHOP_CART}`))
    .catch(err => console.log({ err }));
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
  Product.findAll()
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

  Product.findByPk(productId)
    .then(product => {
      if (!product) return res.redirect('/404');

      res.render(`shop/${PATH.SHOP_PRODUCT}`, {
        product: product,
        pageTitle: product.title,
        path: PATH.SHOP_PRODUCTS
      });
    }).catch(err => console.log({ err }));
};
