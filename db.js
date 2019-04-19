var mysql = require('mysql');

function db_con() {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '14542614',
    database : 'airways',
    multipleStatements: true
  });
}

module.exports = db_con;