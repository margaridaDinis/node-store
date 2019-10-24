const fs = require('fs');
const path = require('path');

const FILE = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProducstFromFile = (cb) => {
    fs.readFile(FILE, (error,  fileContent) => cb(error ? [] : JSON.parse(fileContent)))
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProducstFromFile((products) => {
      products.push(this);

      fs.writeFile(FILE, JSON.stringify(products), err => { console.log(err) })
    })
  }

  static fetchAll(cb) {
    getProducstFromFile(cb)
  }
};