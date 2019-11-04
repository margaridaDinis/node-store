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
  const newProduct = req.body;

  req.user
  .createProduct(newProduct)
  .then(() => res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`))
  .catch(err => console.log(err));
}; 

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId;

  req.user.getProducts({ where: { id: productId }})
  .then(([product]) => {
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
  const updatedValues = {...req.body};
  const productId = req.body.id;
  delete updatedValues.id;

  Product.findByPk(productId)
    .then(product => {
      Object.keys(updatedValues).forEach(key => {
        product[key] = updatedValues[key];
      });
      return product.save();
    })
    .then(() => {
      res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
    })
    .catch(err => {
      console.log(err);
      res.redirect('/404');
    });
}; 

exports.getAdminProducts = (req, res) => {
  req.user
    .getProducts()
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

  Product.findByPk(productId)
  .then(product => {
    product.destroy();
  })
  .then(() => {
    res.redirect(`/admin/${PATH.ADMIN_PRODUCTS}`);
  })
  .catch(err => {
    console.log(err);
    res.redirect('/404');
  });
}; 