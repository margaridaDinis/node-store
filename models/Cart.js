const fs = require('fs');
const path = require('path');

const FILE = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

class Cart {
  static addProduct(id, price) {
    fs.readFile(FILE, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existentProductIndex = cart.products.findIndex(product => product.id === id);
      const existentProduct = cart.products[existentProductIndex];
      
      if (existentProduct) {
        const updatedProduct = { ...existentProduct };
        updatedProduct.quantity = existentProduct.quantity + 1;
        cart.products[existentProductIndex] = updatedProduct;
        
      } else {
        const newProduct = { id, quantity: 1 }
        cart.products = [...cart.products, newProduct];
      }

      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(FILE, JSON.stringify(cart), err => {
        console.log(err);
      });
    })
  }

  static removeProduct(id) {
    
  }
};

module.exports = Cart;
