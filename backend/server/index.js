
const express  = require('express');
const dbConn = require('../database')
const app = express()

const PORT = 3000

// app.use('/', express.static(__dirname + '/../../frontend/dist'));
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

// app.post('/api/groceries', (req, res) => {

//   const {name, quantity, best_before, purchased} = req.body
//   dbConn.query('INSERT INTO groceries (name, quantity, best_before, purchased) VALUES(?,?,?,?)',
//   [name, quantity, best_before, purchased], (err, data) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//       return;
//     } else {
//       //res.sendStatus(201);
//       res.send(data);
//     }

//   });
// });

// app.delete('/api/groceries/:id', (req, res) => {
//   dbConn.query('DELETE FROM groceries where id=?', [req.params.id], (err, data) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});