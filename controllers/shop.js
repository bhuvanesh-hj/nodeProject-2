const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([data, meta]) => {
      res.render("shop/product-list", {
        prods: data,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const podId = req.params.productId;
  Product.findProduct(podId)
    .then(([data, fieldset]) => {
      const [product] = data;
      res.render("shop/product-detail", {
        product: product,
        pageTitle: "Product Details Page",
        path: "/product-detail",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldset]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.AddToCart = (req, res, next) => {
  const podId = req.body.productId;
  Product.findProduct(podId)
    .then(([data, fieldset]) => {
      const [product] = data;
      Cart.addProduct(podId, product.price);
    })
    .catch((err) => console.log(err));

  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
