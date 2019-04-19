var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const db = require('./db')();

router.get('/', (req, res) => {
  let sql = "select * from users";
  db.query(sql, function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.post('/', (req, res) => {
  let data = req.body;
  let info = { 
    name: data.name,
    email: data.email,
    password: data.password
  };
  let sql = 'insert into users set ?';
  db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.status(200).send('Inserted sucessfully');
    }
  });
});


router.delete('/:id', (req, res) => {
  let sql = `delete from users where user_id=${req.params.id}`;
  db.query(sql, function(error, results, fields) {
    if(!error) {
      res.send('deleted ' + results.affectedRows + ' rows');
    }
  });
});

module.exports = router;