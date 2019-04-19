var mysql = require('mysql');

function db_con() {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : `${process.env.PASSWORD}`,
    database : 'airways',
    multipleStatements: true
  });
}

module.exports = db_con;