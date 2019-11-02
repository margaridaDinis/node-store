const Cart = require('./Cart');
const db = require('../util/database');

class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  edit() {
   
  }

  save() {
   return db.execute(
     'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
    [this.title, this.price, this.imageUrl, this.description]
   );
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static fetchProductById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};

module.exports = Product;
