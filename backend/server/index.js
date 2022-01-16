
const express  = require('express');
const dbConn = require('../database')
const app = express()

const PORT = 3000

// app.use(express.json());

app.get('/products', (req, res) => {
  dbConn.query('SELECT * FROM product limit 5', (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    } else {
      console.log(data)
      res.send(data);
    }

  })
})

app.get('/products/:product_id', (req, res) => {
  dbConn.query('select *, (select JSON_ARRAYAGG(JSON_OBJECT("feature",feature,"value",value)) from features where product_id=?) as features from product where id=?', [req.params.product_id, req.params.product_id], (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    } else {
      data[0].features = JSON.parse(data[0].features)
      res.send(data);
    }

  })
})

app.get('/products/:product_id/styles', (req, res) => {
  dbConn.query('SELECT * FROM product where id=?', [req.params.product_id], (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    } else {
      dbConn.query('SELECT * FROM styles where product_id=?', [req.params.product_id], (err, data2) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
          return;
        } else {
          data[0].result = data2;
          res.send(data);
        }

      })
    }

  })
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});