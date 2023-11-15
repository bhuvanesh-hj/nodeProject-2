const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const errorController = require("./controllers/error");

const sequlize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
// const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//  adding the middelware for all incoming request , Where this will add the user for all incoming requets with respect to the user we have to get products
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use("/user", userRoutes);

app.use(errorController.get404);

// Where the product belongd to the pariticluar user and user can many products
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
// Where the User can have only one Cart , where he can put all his products
User.hasOne(Cart);
// The Cart is always belongs to the user or particular user
Cart.belongsTo(User);
// The Cart can have many products where user can add the products to cart && and cart item have the quatity and have the cart id and product id fields init
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequlize
  // {force:ture} ==> This replace the existing tabel with new tabel , and this is not used in the production
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Bhuvanesh", email: "bhuvi@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user
      .getCart()
      .then((cart) => {
        if (!cart) {
          return user.createCart();
        }
        return cart;
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
