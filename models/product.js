// // const fs = require("fs");
// // const path = require("path");

// const db = require("../util/database");

// // const p = path.join(
// //   path.dirname(process.mainModule.filename),
// //   "data",
// //   "products.json"
// // );

// // const getProductsFromFile = (cb) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // getProductsFromFile((products) => {
//     //   if (this.id) {
//     //     const existingProductIndex = products.findIndex(
//     //       (prd) => prd.id === this.id
//     //     );
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//     //       console.log(err);
//     //     });
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), (err) => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });
//     if (this.id) {
//       return db.execute(
//         `UPDATE products SET title='${this.title}',price=${this.price},description='${this.description}',imageUrl='${this.imageUrl}' WHERE id=${this.id}`
//       );
//     } else {
//       return db.execute(
//         "INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",
//         [this.title, this.price, this.description, this.imageUrl]
//       );
//     }
//   }

//   static fetchAll(cb) {
//     // getProductsFromFile(cb);
//     return db.execute("SELECT * FROM products");
//   }

//   static findProduct(id) {
//     // getProductsFromFile((products) => {
//     //   const product = products.find((p) => p.id === id);
//     //   cb(product);
//     // });
//     return db.execute(`SELECT * FROM products WHERE id=${id}`);
//   }

//   static deleteProduct(id) {
//     // getProductsFromFile(products=>{
//     //   products = products.filter(prd => prd.id != id);
//     //   fs.writeFile(p, JSON.stringify(products), (err) => {
//     //     console.log(err);
//     //   });
//     // })
//     return db.execute(`DELETE FROM products WHERE id=${id}`);
//   }
// };
const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
