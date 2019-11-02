const PATH = require('../util/path');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getIndex = (req, res) => {
  res.render('shop', {
    pageTitle: 'My Shop',
    path: PATH.SHOP_INDEX
  });
};

exports.getCart = (req, res) => {
  Cart.getProducts(cart => {
    Product.fetchAll()
      .then(([products]) => {
        const cartProducts = cart.products.map(({ id, quantity }) => {
          const productData = products.find(product => product.id === id);
          return { ...productData, quantity };
        });

        res.render(`shop/${PATH.SHOP_CART}`, { 
          pageTitle: 'Cart',
          products: cartProducts,
          totalPrice: cart.totalPrice,
          path: PATH.SHOP_CART
        });
      }).catch(err => console.log(err));
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

exports.postRemoveFromCart = (req, res) => {
  const productId = req.body.productId;
  
  Cart.removeProduct(productId);

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
  Product.fetchAll()
    .then(([products]) => {
      res.render(`shop/${PATH.SHOP_PRODUCTS}`, { 
        products,
        pageTitle: 'All Products',
        path: PATH.SHOP_PRODUCTS
      });
    }).catch(err => console.log(err));
};

exports.getProductDetail = (req, res) => {
  const productId = req.params.productId;

  Product.fetchProductById(productId)
  .then(([product]) => {
    if (!product) return res.redirect('/404');

    res.render(`shop/${PATH.SHOP_PRODUCT}`, {
      product: product[0],
      pageTitle: product.title,
      path: PATH.SHOP_PRODUCTS
    });
  }).catch(err => console.log(err));
};
