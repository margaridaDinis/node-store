const express = require('express');

const router = express.Router();

const adminData = require('./admin');

const PATH = 'shop';

router.get('/', (req, res, next) => {
  const products = adminData.products;

  res.render(PATH, { 
    products: products,
    hasProducts: products.length > 0,
    pageTitle: 'My Shop',
    path: PATH
  });
});

module.exports = router;