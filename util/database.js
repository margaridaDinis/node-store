const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const _url = 'mongodb+srv://margarida:flowerpower@nodecourse-umt4x.mongodb.net/shop?retryWrites=true&w=majority';

const mongoConnect = callback => {
  MongoClient.connect(_url, { useUnifiedTopology: true })
    .then(client => {
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

