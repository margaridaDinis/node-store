const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

const COLLECTION = require('../util/collections');

class Product {
  constructor({ id, title, price, description, imageUrl, userId }) {
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    const db = getDb();

    return db
      .collection(COLLECTION.PRODUCTS)
      .insertOne(this)
      .catch(err => {
        console.log({ err });
      });
  }

 edit() {
    const db = getDb();

    return db
      .collection(COLLECTION.PRODUCTS)
      .updateOne({ _id: this._id }, { $set: this })
      .catch(err => {
        console.log({ err });
      });
  }
   
  static fetchAll() {
    const db = getDb();

    return db
      .collection(COLLECTION.PRODUCTS)
      .find()
      .toArray()
      .catch(err => {
        console.log({ err });
      });
  }

  static fetchById(id) {
    const db = getDb();
    const objectId = new mongoDb.ObjectId(id);

    return db
      .collection(COLLECTION.PRODUCTS)
      .find({ _id: objectId })
      .next()
      .catch(err => {
        console.log({ err });
      });
  }

  static deleteById(id) {
    const db = getDb();
    const objectId = new mongoDb.ObjectId(id);

    return db
      .collection(COLLECTION.PRODUCTS)
      .deleteOne({ _id: objectId })
      .catch(err => {
        console.log({ err });
      });
  }
}

module.exports = Product;
