// this file is suppose to direct you to register and login
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login');
})

router.get('/login', (req, res) => {
  res.render('users/login');
})

router.get('/register', (req, res) => {
  res.render('users/register');
})

module.exports = router;