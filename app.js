const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const errorController = require("./controllers/error");

const sequlize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");

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

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

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
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
