const Profile = require('../models/Profile');
const { Router } = require('express');
const { getTagline } = require('../services/futuramaAPI');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, favoriteCharacter } = req.body;
    getTagline(favoriteCharacter)
      .then(tagline => {
        return Profile
          .create({ name, favoriteCharacter, tagline })
          .then(createdProfile => {
            res.send(createdProfile);
          })
          .catch(err => {
            next(err);
          });
      });
  })

  .get('/', (req, res, next) => {
    Profile
      .find()
      .then(profileList => res.send(profileList))
      .catch(err => next(err));
  })

  .get('/:id', (req, res, next) => {
    Profile
      .findById(req.params.id)
      .then(profile => res.send(profile))
      .catch(err => next(err));
  })

  .patch('/:id', (req, res, next) => {
    const {
      favoriteCharacter
    } = req.body;

    Profile
      .findById(req.params.id)
      .then(oldProfile => {
        return Promise.all([
          getTagline(favoriteCharacter),
          Promise.resolve(oldProfile.name)
        ]);
      })
      .then(([tagline, name]) => {
        return Profile
          .findByIdAndUpdate(req.params.id, { name, favoriteCharacter, tagline })
          .then(updatedProfile => res.send(updatedProfile));
      })
      .catch(err => next(err));
  })

  .delete('/:id', (req, res, next) => {
    Profile
      .findByIdAndDelete(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(err => next(err));
  });
