const fs = require('fs');
const path = require('path');

const FILE = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

class Cart {
  static addProduct(id, price) {
    fs.readFile(FILE, (err, fileContent) => {
      const cart = !err ? JSON.parse(fileContent) : { products: [], totalPrice: 0 };
      const existentProductIndex = cart.products.findIndex(product => product.id === id);
      const existentProduct = cart.products[existentProductIndex];
      
      if (existentProduct) {
        const updatedProduct = { ...existentProduct };
        updatedProduct.quantity = existentProduct.quantity + 1;
        cart.products[existentProductIndex] = updatedProduct;
        
      } else {
        const newProduct = { id, quantity: 1, price }
        cart.products = [...cart.products, newProduct];
      }

      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(FILE, JSON.stringify(cart), err => { if (err) console.error(err); });
    });
  }

  static removeProduct(id) {
    fs.readFile(FILE, (err, fileContent) => {
      if (err) return;

      const cart = JSON.parse(fileContent) || { products: [], totalPrice: 0 };
      const existentProduct = cart.products.find(product => product.id === id);

      if (!existentProduct) return;

      const remaningProducts = cart.products.filter(product => product.id !== id);
      
      const { quantity, price } = existentProduct;
      const totalPrice = cart.totalPrice - (price * quantity);

      fs.writeFile(FILE, JSON.stringify({
        products: remaningProducts,
        totalPrice
      }), err => { if (err) console.error(err); });
    });    
  }
};

module.exports = Cart;
