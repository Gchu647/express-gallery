const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const isAuthenticated = require('../middleware/isAuthenticated');

// smoke test
router.get('/', (req, res) => {
  res.send('profile test!');
})

// user profile with user's photos
router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;

  return new User()
    .where({ id })
    .fetch({
      withRelated: ['photos']
    })
    .then( user => {
      if(!user) {
        const noUseErr = new Error('user not found!');
        noUserErr.statuscode = 404;
        throw noUserErr;
      }
      
      user = JSON.parse(JSON.stringify(user));
      let userProfile = {
        username: user.username,
        photos: user.photos
      }

      console.log('userProfile: ', userProfile);
      return res.render('users/profile', userProfile);

    })
    .catch( err => {
      if (err.statuscode) {
        res.status(err.statuscode);
      }

      return res.json({ message: err.message });
    })
})

module.exports = router;