// this file is suppose to direct you to register and login
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/login', (req, res) => {
  res.render('users/login');
})

module.exports = router;