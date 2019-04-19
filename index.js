const config = require('config');
var mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');
const shortid = require('shortid');

const user = require('./users');
const ticket = require('./tickets');
const flight = require('./flights');
const airline = require('./airlines');
const airport = require('./airports');
const auth = require('./auth');

const db = require('./db')();

var app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1); // 0 - success, other than 0 - failure
}

app.use(bodyParser.json());
app.use('/api/users', user);
app.use('/api/tickets', ticket);
app.use('/api/flights', flight);
app.use('/api/airlines', airline);
app.use('/api/airports', airport);
app.use('/api/auth', auth);

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + db.threadId);
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}`));

