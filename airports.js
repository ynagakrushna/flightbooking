var mysql = require('mysql');
const express = require('express');
const router = express.Router();

const db = require('./db')();

// List of Airports
router.get('/', (req, res) => {
  let sql = "select * from airports";
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});

// {
// 	"iata": "BOM",
// 	"name": "Mumbai Chattrapathi Shivaji International Airport",
// 	"city": "Mumbai",
// 	"state": "Maharastra"
// }

router.post('/', (req, res) => {
  let data = req.body;
  let info = { 
    iata_code: data.iata,
    name: data.name,
    city: data.city,
    state: data.state
  }
  let sql = 'insert into airports set ?';
  db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.send('Inserted sucessfully, ID: ' + results.insertId);
    }
  });
});


// flight asscoiated airports

router.get('/flights', (req, res) => {
  let sql = "select f.flight_number, a.name from flights_has_airports fa join airports a on fa.airport_id = a.airport_id join flights f on fa.flight_id = f.flight_id";
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});

// {
// 	"flight_id": 8,
// 	"airport_id": 3
// }
router.post('/flights', (req, res) => {
  let data = req.body;
  let info = { 
    flight_id: data.flight_id,
    airport_id: data.airport_id
  }
  let sql = 'insert into flights_has_airports set ?';
  db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.send('Inserted sucessfully');
    }
  });
});



module.exports = router;