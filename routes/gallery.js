const express = require('express');
const router = express.Router();
const Photo = require('../db/models/Photo');

router.route('/')
  // post a new photo up
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

  // come back to work outputting multiple collections
  .get((req, res) => {
    return Photo.fetchAll()
      .then( photos => {
        // converts the weird object from db to and usable object
        const collection = JSON.parse(JSON.stringify(photos));
        console.log('Sending ', collection);

        res.render('gallery/index', { collection });
      })
      .catch(err => {
        return res.json({ message: err.message });
      })
  });

  router.route('/:id')
  // get a photo based on id
  .get((req, res) => {
    const id = req.params.id;
    return new Photo()
      .where({ id })
      .fetch()
      .then( photo=> {
        if (!photo) {
          const noPhotoErr = new Error('photo not found');
          noPhotoErr.statuscode = 404;
          throw noPhotoErr;
        }
        return res.json(photo);
      })
      .catch( err => {
        if (err.statuscode) {
          res.status(err.statuscode);
        }

        return res.json({ message: err.message });
      })
  })
  .put((req, res) => {
    const id = req.params.id;
    return new Photo()
      .where({ id })
      .save({
        'author': req.body.author, 
        'link': req.body.link,
        'description': req.body.description,
      }, {'patch': true}) // patch turns insert into an update
      .then( photo => {
        return res.json(photo);
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })



module.exports = router;