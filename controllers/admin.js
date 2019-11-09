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
  const newProductData = req.body;
  const product = new Product(newProductData);

  product
    .save()
    .then(() => {
      res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId;

  Product.fetchById(productId)
  .then(product => {
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
  const updatedValues = req.body;
  const product = new Product(updatedValues);
  
  return product
    .edit()
    .then(() => {
      res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
    })
    .catch(err => {
      console.log(err);
      res.redirect('/404');
    });
}; 

exports.getAdminProducts = (req, res) => {
  Product
    .fetchAll()
    .then((products) => {
      res.render(`admin/${PATH.ADMIN_PRODUCTS}`, { 
        products,
        pageTitle: 'Products',
        path: PATH.ADMIN_PRODUCTS
      });
    }).catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;

  Product.deleteById(productId)
  .then(() => {
    res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
  })
  .catch(err => {
    console.log(err);
    res.redirect('/404');
  });
}; 