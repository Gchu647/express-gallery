// this file is suppose to direct you to register and login
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/models/User');

router.get('/', (req, res) => {
  res.redirect('/login');
});

// user logging
router.route('/login')
  .get((req, res) => {
    res.render('users/login');
  })
  .post( passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/'
  }));

  // user registration
router.route('/register')
  .get((req, res) => {
    res.render('users/register');
  })
  .post((req, res) => {
    return new User ({
      username: req.body.username,
      password: req.body.password
    })
    .save()
    .then((user) => {
      console.log(user);
      res.redirect('/');
    })
    .catch( err => {
      console.log(err);
      return res.send('could not register you!');
    })
  });

module.exports = router;