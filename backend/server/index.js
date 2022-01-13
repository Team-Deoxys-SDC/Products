
const express  = require('express');
const dbConn = require('../database')
const app = express()

const PORT = 3000

// app.use(express.json());

app.get('/products', (req, res) => {
  dbConn.query('SELECT * FROM product limit 5', (err, data) => {
    if (err) {
      console.log('ERROR');
      res.sendStatus(400);
      return;
    } else {
      res.send(data);
    }

  })
})

app.get('/products/:product_id', (req, res) => {
  dbConn.query('SELECT * FROM product where id=?', [req.params.product_id], (err, data) => {
    if (err) {
      console.log('ERROR');
      res.sendStatus(400);
      return;
    } else {
      res.send(data);
    }

  })
})

app.get('/products/:product_id/styles', (req, res) => {
  dbConn.query('SELECT * FROM styles where product_id=?', [req.params.product_id], (err, data) => {
    if (err) {
      console.log('ERROR');
      res.sendStatus(400);
      return;
    } else {
      res.send(data);
    }

  })
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});