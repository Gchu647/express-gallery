const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', (req, res) => {
  res.send('profile test!');
})

module.exports = router;