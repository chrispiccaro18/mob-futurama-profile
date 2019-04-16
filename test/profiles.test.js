const app = require('../lib/app');
const request = require('supertest');
const Profile = require('../lib/models/Profile');

jest.mock('../lib/services/futuramaAPI.js');

describe('profile routes', () => {
  afterAll(() => {
    return Profile.drop();
  });
  
  it('creates a new profile', () => {
    return request(app)
      .post('/profile')
      .send({ name: 'Anna', favoriteCharacter: 'Bender' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Anna',
          favoriteCharacter: 'Bender',
          _id: expect.any(String),
          tagline: 'sup'
        });
      });
  });
});
