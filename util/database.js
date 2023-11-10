const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-first',
    password:"Bhuvi112233@"
})

module.exports = pool.promise();