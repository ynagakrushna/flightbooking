var mysql = require('mysql');
const express = require('express');
const router = express.Router();

const db = require('./db')();


// List of airlines
router.get('/', (req, res) => {
  let sql = "select * from airlines";
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});

// {
// 	"name": "Air India"
// }
router.post('/', (req, res) => {
  let data = req.body;
  let info = { 
    name: data.name
  }
  let sql = 'insert into airlines set ?';
  db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.send('Inserted sucessfully');
    }
  });
});

module.exports = router;