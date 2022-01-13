
const mysqlAdaptor = require("mysql");

const connection = mysqlAdaptor.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Hackreactor1!',
  database: 'products'
})

connection.connect(() => {
  console.log('Connected to database');
})

module.exports = connection;