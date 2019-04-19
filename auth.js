const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
var mysql = require('mysql');
const express = require('express');
const router = express.Router();
const db = require('./db')();


router.post('/', (req, res) => {
  var data = req.body;
 
  db.query('select * from users where email=?',[data.email],function(error, results, fields) {

    if (results.length == 0) {
        return res.status(400).send('User Not found');
    } else {
      var user = results[0];
      const validPassword = bcrypt.compareSync(data.password, user.password);

      if(!validPassword) {
        return res.status(400).send('Invalid Password!');
      }
    }

    const token = jwt.sign({ user_id: user.user_id, is_admin: user.is_admin }, config.get('jwtPrivateKey'));

    res.header('airways-auth-token', token).status(200).send('Login Successful');
  });
});


module.exports = router;