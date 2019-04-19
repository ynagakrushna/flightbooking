var mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');
const shortid = require('shortid');

var app = express(); 

app.use(bodyParser.json());

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '14542614',
  database : 'airways',
  multipleStatements: true
});

db.connect((err) => {
  if (!err) {
    console.log('Database connected!');
  } else {
    console.error('error connecting');
    return;
  }
});



// List of flights
app.get('/api/flights', (req, res) => {
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

app.post('/api/flights', (req, res) => {
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



// List of airlines
app.get('/api/airlines', (req, res) => {
  let sql = "select * from airlines";
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});

// {
// 	"name": "Air India"
// }
app.post('/api/airlines', (req, res) => {
  let data = req.body;
  let info = { 
    name: data.name
  }
  let sql = 'insert into airlines set ?';
  var query = db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.send('Inserted sucessfully');
    }
  });
  console.log(query.sql);
});


// List of Airports
app.get('/api/airports', (req, res) => {
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
app.post('/api/airports', (req, res) => {
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

app.get('/api/flightairport', (req, res) => {
  let sql = "select f.flight_number, a.name from flights_has_airports fa join airports a on fa.airport_id = a.airport_id join flights f on fa.flight_id = f.flight_id";
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});

// {
// 	"flight_id": 8,
// 	"airport_id": 3
// }
app.post('/api/flightairport', (req, res) => {
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

// Add passenger
// {
// 	"fn": "Sai",
// 	"ln": "Tej"
// }
app.post('/api/passengers', (req, res) => {
  let data = req.body;
  let info = { 
    first_name: data.fn,
    last_name: data.ln
  }
  let sql = 'insert into passengers set ?';
  db.query(sql, info, function(error, results, fields) {
    if(!error) {
      res.send('Inserted sucessfully');
    }
  });
});


// Passenger Tickets Info
app.get('/api/passengertickets/:id', (req, res) => {
  let sql = "select * from tickets where passenger_id="+ req.params.id;
  db.query(sql, function(error, results, fields) {
    res.send(results);
  }); 
});


// Tickets
app.get('/api/tickets', (req, res) => {
  let sql = "select * from tickets"
  db.query(sql,function(error, results, fields) {
    res.send(results);
  });
});

// {
// 	"pid": 1,
// 	"fcid": 1,
// 	"fid": 4
// }
app.post('/api/tickets', (req, res) => {
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
    passenger_id: data.pid,
    flightclass_id: data.fcid,
    flight_id: data.fid
  };

  var sql = "insert into tickets set ?";

  db.query(sql,details, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
  });
});



var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}`));

module.exports = { db, shortid };