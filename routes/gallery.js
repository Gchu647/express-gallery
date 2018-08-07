const express = require('express');
const router = express.Router();
const Photo = require('../db/models/Photo');

router.route('/')
  .post((req, res) => {
    let { author, link, description } = req.body;
    author = author.trim();
    link = link.trim();
    description = description.trim();

    return new Photo({ author, link, description })
      .save()
      .then( photo => {
        return res.json(photo);
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })

  .get((req, res) => {
    return Photo.fetchAll()
      .then( photos => {
        console.log('photos: ', photos);
        res.json(photos);
      })
      .catch(err => {
        return res.json({ message: err.message });
      })
  });

module.exports = router;