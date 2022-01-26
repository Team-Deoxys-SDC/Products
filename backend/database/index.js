
const mysqlAdaptor = require("mysql");

const connection = mysqlAdaptor.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: '',
  password: '',
  database: ''
  // debus: false
})

// connection.connect(() => {
//   console.log('Connected to database');
// })

module.exports = connection;