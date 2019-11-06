const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorsController = require('./controllers/errors');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views')

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

User.hasMany(Product);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Cart.belongsTo(User);
Product.belongsTo(User, { 
  constrains: true,
  onDelete: 'CASCADE' // if we delete the user, it deletes his products
});


sequelize.sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Margarida', email: 'md@md.nl' });
    }
    return user;
  })
  // .then(user => {
    // user.createCart();
  // })
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
