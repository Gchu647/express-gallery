const express = require('express');
const router = express.Router();
const Photo = require('../db/models/Photo');
const isAuthenticated = require('../middleware/isAuthenticated');

router.route('/')
  // post a new photo up
  .post(isAuthenticated, (req, res) => {
    let { author, link, description } = req.body;
    author = author.trim();
    link = link.trim();
    description = description.trim();

    return new Photo({ author, link, description })
      .save()
      .then( photo => {
        // to do: add a photo posted message
        return res.redirect('/gallery');
      })
      .catch(err => {
        return res.json({ message: err.message });
      });
  })
  // return all the photos in our gallery
  .get(isAuthenticated, (req, res) => {
    console.log('usser GET: ', req.session.passport.user);

    return Photo.fetchAll()
      .then( photos => {
        // converts the weird object from db to and usable object
        const collection = JSON.parse(JSON.stringify(photos));
        res.render('gallery/index', { collection });
      })
      .catch(err => {
        return res.json({ message: err.message });
      })
  });

  // gets form to post pictures
  router.get('/new', isAuthenticated, (req, res) => {
    res.render('gallery/new');
  })

  // gets form to edit pictures
  router.get('/:id/edit', isAuthenticated, (req, res) => {
    const id = req.params.id;
    res.render('gallery/edit', req.body);
  })

  router.route('/:id')
    // get a photo based on id
    .get(isAuthenticated, (req, res) => {
      const id = req.params.id;
      return new Photo()
        .where({ id })
        .fetch()
        .then( photo=> {
          if (!photo) {
            let noPhotoErr = new Error('photo not found');
            noPhotoErr.statuscode = 404;
            throw noPhotoErr;
          }

          let photoObj = JSON.parse(JSON.stringify(photo));
          photoObj.id = id;
          return res.render('gallery/photo', photoObj);
        })
        .catch( err => {
          if (err.statuscode) {
            res.status(err.statuscode);
          }

          return res.json({ message: err.message });
        })
    })
    // edits a photo by id
    .put(isAuthenticated, (req, res) => {
      const id = req.params.id;
      return new Photo()
        .where({ id })
        .save({
          'author': req.body.author, 
          'link': req.body.link,
          'description': req.body.description,
        }, {'patch': true}) // patch turns insert into an update
        .then( photo => {
          return res.redirect(`/gallery/${id}`);
        })
        .catch(err => {
          return res.json({ message: err.message });
        });
    })
    //deletes a photo by id
    .delete(isAuthenticated, (req, res) => {
      const id = req.params.id;
      return new Photo()
        .where({ id })
        .destroy()
        .then( photo => {
          return res.json(photo);
        })
        .catch(err => {
          return res.json({ message: err.message });
        });
  })



module.exports = router;