
const PATH = require('../util/path');
const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render(`admin/${PATH.ADMIN_EDIT_PRODUCT}`, {
    pageTitle: 'Add Product',
    action: '/admin/add-product',
    path: PATH.ADMIN_ADD_PRODUCT,
    editing: false
  });
};

exports.postAddProduct = (req, res) => {
  const product =  new Product(req.body);

  product.save();
  res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
}; 

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId;

  Product.fetchProductById(productId, product => {
    if (!product) return res.redirect('/404');

    res.render(`admin/${PATH.ADMIN_EDIT_PRODUCT}`, {
      pageTitle: 'Edit Product',
      action: '/admin/edit-product',
      path: PATH.ADMIN_PRODUCTS,
      product,
      editing: true
    });
  });
};

exports.postEditProduct = (req, res) => {
  const product =  new Product(req.body);

  product.edit();
  res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
}; 


exports.getAdminProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render(`admin/${PATH.ADMIN_PRODUCTS}`, { 
      products,
      pageTitle: 'Products',
      path: PATH.ADMIN_PRODUCTS
    });
  });
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;

  Product.deleteById(productId);
  res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
}; 