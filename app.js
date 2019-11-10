const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoConnect = require('./util/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');

const errorsController = require('./controllers/errors');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views')

app.use((req, res, next) => {
  User
    .findById('5dc707d38469149aedfff416')
    .then(user => {
      req.user = new User(user);

      next();
    })
    .catch(err => console.log({ err }));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

mongoConnect(() => {
  app.listen(3000);
});
