/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;

describe('[USER] /api/users Testing', () => {
  it('should be able to get user credentials', (done) => {
    request(app)
      .post('/api/users')
      .expect(201)
      .end((err, resp) => {
        expect(resp.body).to.be.an('object');
        done();
      });
  });

});
