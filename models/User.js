const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

const COLLECTION = require('../util/collections');

class User {
  constructor({ _id, name, email, cart }) {
    this._id =  new mongoDb.ObjectId(_id);
    this.name = name;
    this.email = email;
    this.cart = cart || {};
  }

  save() {
    const db = getDb();

    return db
      .collection(COLLECTION.USERS)
      .insertOne(this)
      .catch(err => {
        console.log({ err });
      });
  }

  getCart() {
    const db = getDb();
    const cartItems = this.cart.items || [];
    const cartProductsIds = cartItems.map(({ productId }) => productId);

    return db
      .collection(COLLECTION.PRODUCTS)
      .find({ _id: { $in: cartProductsIds } })
      .toArray()
      .then(products => {
        return products.map(product => {
          const quantity = cartItems.find(({ productId }) => productId.toString() === product._id.toString()).quantity;
          return { ...product, quantity };
        })
      })
      .catch(err => {
        console.log({ err });
      });
  }

  addToCart(product) {
    const db = getDb();
    const id = new mongoDb.ObjectId(product._id);
    const cartItems = this.cart.items || [];
    const cartProductIdx = cartItems.findIndex(({ productId }) => productId.toString() === id.toString());
    const updatedCart = {};

    if (cartProductIdx >= 0) {
      cartItems[cartProductIdx].quantity = cartItems[cartProductIdx].quantity + 1;

      updatedCart.items = cartItems;
    } else {
      updatedCart.items = [...cartItems, { productId: id, quantity: 1 }]
    }

    return db
    .collection(COLLECTION.USERS)
    .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  removeFromCart(productId) {
    const db = getDb();
    const otherItems = this.cart.items.filter(({ productId }) => productId.toString() !== productId.toString());

    return db
    .collection(COLLECTION.USERS)
    .updateOne({ _id: this._id }, { $set: { cart: { items: otherItems } } });
  }

  static findById(id) {
    const db = getDb();
    const objectId = new mongoDb.ObjectId(id);

    return db
      .collection(COLLECTION.USERS)
      .findOne({ _id: objectId })
      .catch(err => {
        console.log({ err });
      });
  }
}

module.exports = User;