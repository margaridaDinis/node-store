const fs = require('fs');
const path = require('path');
const Cart = require('./Cart');

const FILE = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProducstFromFile = (cb) => {
    fs.readFile(FILE, (err,  fileContent) => cb(err ? [] : JSON.parse(fileContent)))
}

class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  edit() {
    getProducstFromFile((products) => {
      const existentProductIndex = products.findIndex(prod => prod.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existentProductIndex] = this;

      fs.writeFile(FILE, JSON.stringify(updatedProducts), err => { if (err) console.error(err); });
    })
  }

  save() {
    getProducstFromFile((products) => {
      this.id = (products.length + 1).toString();
      products.push(this);

      fs.writeFile(FILE, JSON.stringify(products), err => { if (err) console.error(err); });
    })
  }

  static deleteById(id) {
    getProducstFromFile((products) => {
      if (!products) return;
      const existentProductIndex = products.findIndex(prod => prod.id === id);
      const updatedProducts = [...products];
      updatedProducts.splice(existentProductIndex, 1);

      fs.writeFile(FILE, JSON.stringify(updatedProducts), err => { 
        if (err) console.error(err);
        Cart.removeProduct(id);
      });
    })
  }

  static fetchAll(cb) {
    getProducstFromFile(cb)
  }

  static fetchProductById(id, cb) {
    getProducstFromFile((products) => {
      const product = products.find(product => product.id === id)

      cb(product);
    })
  }
};

module.exports = Product;
