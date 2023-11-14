// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-first',
//     password:"Bhuvi112233@"
// })

// module.exports = pool.promise();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-first", "root", "Bhuvi112233@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
