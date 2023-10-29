const mysql = require('mysql2')
const db = mysql.createConnection({
host: "localhost",
port:"8080",
user: "root",
password: "ayana",
database:"gorent" 
})

module.exports = db;