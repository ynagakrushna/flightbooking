var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const db = require('./db')();


router.get('/:id', (req, res) => {
  let sql = `select * from tickets where user_id=${req.params.id}`;
  db.query(sql,function(error, results, fields) {
    res.send(results);
  });
});

// {
// 	"uid": 1,
// 	"fcid": 1,
// 	"fid": 4
// }
router.post('/', (req, res) => {
  var tno, cn, cost, data; 

  data = req.body;
  tno = shortid.generate();
  // console.log(tno);
  cn =  shortid.generate();
  // console.log(cn);

  if (data.fcid == 1) {
    cost = 100;
  } else if (data.fcid == 2) {
    cost = 200;
  } else {
    cost = 300;
  }

  let details = {
    ticket_number: tno,
    price: cost,
    confirmationNumber: cn,
    flightclass_id: data.fcid,
    flight_id: data.fid,
    user_id: data.uid
  };

  var sql = "insert into tickets set ?";

  db.query(sql,details, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
  });
});


module.exports = router;