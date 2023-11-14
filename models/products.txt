// const products = [];
const fs = require("fs");
const path = require("path");

const pathDir = require("../util/path");

const p = path.join(pathDir, "data", "paroducts.json");

const getProductsFile = (callback) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

module.exports = class Products {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFile(callback);
  }
};
