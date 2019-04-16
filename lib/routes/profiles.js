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
