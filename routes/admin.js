const express = require('express');

const router = express.Router();

const PATH = 'add-product';
const products = [];

router.get(`/${PATH}`, (req, res, next) => {
  res.render(PATH, {
    pageTitle: 'Add Product',
    path: PATH
  });
});

router.post(`/${PATH}`, (req, res, next) => {
  products.push({ title: req.body.title })
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
