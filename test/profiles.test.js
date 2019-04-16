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

  it('gets a list of profiles', () => {
    return request(app)
      .get('/profile')
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('returns profile by id', () => {
    return request(app)
      .post('/profile')
      .send({ name: 'name', favoriteCharacter: 'Bender' })
      .then(createdProfile => {
        return request(app)
          .get(`/profile/${createdProfile.body._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'name',
          favoriteCharacter: 'Bender',
          _id: expect.any(String),
          tagline: 'sup'
        });
      });

  });

  it('patches an existing profile', () => {
    return request(app)
      .post('/profile')
      .send({ name: 'name', favoriteCharacter: 'Bender' })
      .then(createdProfile => {
        return request(app)
          .patch(`/profile/${createdProfile.body._id}`)
          .send({ favoriteCharacter: 'Fry' });
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'name',
          favoriteCharacter: 'Fry',
          _id: expect.any(String),
          tagline: 'supp'
        });
      });
  });

  it('delete by id', () => {
    return request(app)
      .post('/profile')
      .send({ name: 'name', favoriteCharacter: 'Bender' })
      .then(createdProfile => {
        return request(app)
          .delete(`/profile/${createdProfile.body._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({
          deleted: 1
        });
      });
  });
});
