const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

const COLLECTION = 'users';

class User {
  constructor({ _id, name, email, cart }) {
    this._id =  new mongoDb.ObjectId(_id);
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();

    return db
      .collection(COLLECTION)
      .insertOne(this)
      .catch(err => {
        console.log({ err });
      });
  }

  addToCart(product) {
    const db = getDb();
    const id = new mongoDb.ObjectId(product._id);
    const cartItems = [...this.cart.items];
    const cartProductIdx = cartItems.findIndex(({ productId }) => productId.toString() === id.toString());
    const updatedCart = {};

    if (cartProductIdx >= 0) {
      cartItems[cartProductIdx].quantity = cartItems[cartProductIdx].quantity + 1;

      updatedCart.items = cartItems;
    } else {
      updatedCart.items = [...cartItems, { productId: id, quantity: 1 }]
    }

    return db
    .collection(COLLECTION)
    .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  static findById(id) {
    const db = getDb();
    const objectId = new mongoDb.ObjectId(id);

    return db
      .collection(COLLECTION)
      .findOne({ _id: objectId })
      .catch(err => {
        console.log({ err });
      });
  }
}

module.exports = User;