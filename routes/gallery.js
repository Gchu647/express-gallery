const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  res.send('gallery testing!!');
});

module.exports = router;