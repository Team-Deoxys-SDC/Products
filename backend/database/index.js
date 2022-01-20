
const mysqlAdaptor = require("mysql");

const connection = mysqlAdaptor.createPool({
  connectionLimit: 100,
  host: '52.91.199.123',
  user: 'ezra',
  password: 'Hackreactor1!',
  database: 'products',
  debus: false
})

// connection.connect(() => {
//   console.log('Connected to database');
// })

module.exports = connection;