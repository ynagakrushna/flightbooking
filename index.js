var mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');
const shortid = require('shortid');

const user = require('./users');
const ticket = require('./tickets');
const flight = require('./flights');
const airline = require('./airlines');
const airport = require('./airports');

const db = require('./db')();

var app = express(); 

app.use(bodyParser.json());
app.use('/api/users', user);
app.use('/api/booktickets', ticket);
app.use('/api/flights', flight);
app.use('/api/airlines', airline);
app.use('/api/airports', airport);





var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}`));


module.exports.db = db;
module.exports.mysql = mysql;
module.exports.shortid = shortid;