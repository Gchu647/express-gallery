// this file is suppose to direct you to register and login
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/models/User');
const bcrypt = require('bcrypt');
const saltedRounds = 12; // bcrypt salting

router.get('/', (req, res) => {
  res.redirect('/login');
});

// user login
router.route('/login')
  .get((req, res) => {
    res.render('system/login', regCheck);
    regCheck.show = false; // not show reg status
  })
  .post( passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/'
  }));

// user logout
router.get('/logout', (req, res) => {
  req.logout();
  // bad messaging
  regCheck.show = true;
  regCheck.message = 'Logged out!';
  regCheck.class_name = 'regSuccess';
  res.redirect('/login');
})

  // user registration
router.route('/register')
  .get((req, res) => {
    res.render('system/register');
  })
  .post((req, res) => {
    bcrypt.genSalt(saltedRounds, (err, salt) => {
      if (err) { res.status(500); }
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) { res.status(500); }
        
        return new User ({
          username: req.body.username,
          password: hashedPassword
        })
        .save()
        .then((user) => {
          regCheck.show = true;
          regCheck.message = 'User Registered';
          regCheck.class_name = 'regSuccess';

          res.redirect('/login');
        })
        .catch( err => {
          console.log(err);
          regCheck.show = true;
          regCheck.message = 'Username or Password Already Exist';

          return res.render('system/register', regCheck);
        })

      })
    })

  });

  // Tracks the registration status
  var regCheck = {
    'show':false,
    'message': '',
    'class_name': 'regFail'
  };

module.exports = router;