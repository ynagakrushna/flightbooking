const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const db = require('./db')();
const auth = require('./middleware/auth');

router.get('/me', auth, (req, res) => {
  let sql = "select * from users where user_id=?";
  db.query(sql,[req.user.user_id], function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.post('/', (req, res) => {
  var data = req.body;
  const salt = bcrypt.genSaltSync(10);

  var info = { 
    name: data.name,
    email: data.email,
    password: bcrypt.hashSync(data.password, salt)
  };
 
  db.query('select * from users where email=?',[data.email],function(error, results, fields) {
    if (results.length >= 1) {
        console.log(results);
        return res.status(400).send('User already registered');
    } else {
      
      let sql = 'insert into users set ?';
      db.query(sql, info, function(error, results, fields) {
        if(!error) {
          
          var ins_id = results.insertId;
          db.query('select * from users where user_id=?',[ins_id],function(error, results, fields) {

            const token = jwt.sign({ user_id: results[0].user_id, is_admin: results[0].is_admin }, config.get('jwtPrivateKey'));

            return res.header('airways-auth-token', token).status(200).send('New user: '+data.email+' Registered sucessfully');

          });

          // const token = jwt.sign({ user_id: results.insertId }, config.get('jwtPrivateKey'));
          // return res.header('airways-auth-token', token).status(200).send('New user: '+data.email+' Registered sucessfully');
         }
      });
    }
  });
});


// router.put('/', auth, (req, res) => {
//   let sql = "update users setuser_id=?";
//   db.query(sql,[req.user.user_id], function(error, results, fields) {
//     res.status(200).send(results);
//   });
// });


router.delete('/', auth, (req, res) => {
  let sql = 'delete from users where user_id=?';
  db.query(sql,[req.user.user_id], function(error, results, fields) {
    if(!error) {
      res.status(200).send('Account Deletion Successful.');
    }
  });
});

module.exports = router;