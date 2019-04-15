const request = require('superagent');

function getTagline(character) {
  return request
    .get(`http://futuramaapi.herokuapp.com/api/characters/${character}/1`)
    .then(res => {
      return res.body[0].quote;
    });
}

module.exports = { getTagline };
