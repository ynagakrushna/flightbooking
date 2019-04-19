var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const db = require('./db')();

const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

// List of flights
router.get('/',[auth, admin], (req, res) => {
  let sql = "select * from flights";
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});

// {
// 	"number": 123,
// 	"departure": "2019-04-22 10:00:00",
// 	"arrival": "2019-04-21 10:00:00",
// 	"duration": 30,
// 	"miles": 300
// }

router.post('/',[auth, admin], (req, res) => {
  let data = req.body;
  let info = { 
    flight_number: data.number, 
    departure_date_time: data.departure, 
    arrival_date_time: data.arrival,
    duration_in_minutes: data.duration,
    distance_in_miles: data.miles,
    airline_id: data.air_id
  }
  let sql = 'insert into flights set ?';
  db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.send('Inserted sucessfully');
    }
  });
});

router.delete('/:id', [auth, admin], (req, res) => {
  let sql = 'delete from flights where flight_id=?';
  db.query(sql,[req.params.id], function(error, results, fields) {
    if(!error) {
      res.status(200).send('Flight has been removed from list');
    }
  });
});



module.exports = router;
