const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetch the products from the file
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      //check if the product exist or analize the cart
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProducts;
      if (existingProduct) {
        updatedProducts = { ...existingProduct };
        updatedProducts.qty = updatedProducts.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProducts;
      } else {
        updatedProducts = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProducts];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      //add the product to the cart
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
