
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
      data[0].features = JSON.parse(data[0].features);
      res.send(data);
    }

  })
})

const defaultQuestionMark = "default?";
app.get('/products/:product_id/styles', (req, res) => {
  dbConn.query(`SELECT id as product_id, (SELECT JSON_ARRAYAGG(JSON_OBJECT("name",name,"original_price",original_price,"sale_price",sale_price,?,default_style,"photos",(select JSON_ARRAYAGG(JSON_OBJECT("url",url,"thumbnail_url",thumbnail_url)) from photos where photos.style_id=styles.id),"skus",(SELECT JSON_OBJECTAGG(skus.id, (JSON_OBJECT("quantity",quantity,"size",size))) FROM skus where skus.style_id=styles.id))) FROM styles WHERE styles.product_id=?) AS result FROM product WHERE id=?`, [defaultQuestionMark,req.params.product_id, req.params.product_id], (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    } else {
      data[0].result = JSON.parse(data[0].result)
      res.send(data);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});