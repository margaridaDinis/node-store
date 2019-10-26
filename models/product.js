const fs = require('fs');
const path = require('path');

const FILE = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProducstFromFile = (cb) => {
    fs.readFile(FILE, (err,  fileContent) => cb(err ? [] : JSON.parse(fileContent)))
}

class Product {
  constructor({ title, imageUrl, description, price }) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProducstFromFile((products) => {
      this.id = (products.length + 1).toString();
      products.push(this);

      fs.writeFile(FILE, JSON.stringify(products), err => { console.log(err) })
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
