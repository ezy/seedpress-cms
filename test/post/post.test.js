/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('assert');

describe('[POST] /api/posts Testing', () => {
  let postID = '';
  it('should be able to get a list of all seeded posts', (done) => {
    request(app)
      .get('/api/posts')
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('array');
        expect(resp.body[0]).to.have.all.keys('id','title','category','date','expiry','frequency','createdAt','status','text','updatedAt');
        assert.equal((resp.body).length, 6);
        // set post id for next test
        postID = resp.body[0].id;
        done();
      });
  });
  it('should be able to get a single post', (done) => {
    request(app)
      .get(`/api/posts/${postID}`)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('object');
        expect(resp.body).to.have.all.keys('id','title','category','date','expiry','frequency','createdAt','status','text','updatedAt');
        done();
      });
  });
});
