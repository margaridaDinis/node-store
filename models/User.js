const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

const COLLECTION = 'users';

class User {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
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