/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('assert');

describe('[PAGE] /api/pages Testing', () => {
  let pageID = '';
  it('should be able to get a list of all seeded pages', (done) => {
    request(app)
      .get('/api/pages')
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.pages).to.be.an('array');
        expect(resp.body.pages[0]).to.have.all.keys('id','title','image','slide','createdAt','status','text','updatedAt');
        assert.equal((resp.body.pages).length, 6);
        // set page id for next test
        pageID = resp.body.pages[0].id;
        done();
      });
  });
  it('should be able to get a single page', (done) => {
    request(app)
      .get(`/api/pages/${pageID}`)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.page).to.be.an('object');
        expect(resp.body.page).to.have.all.keys('id','title','image','slide','createdAt','status','text','updatedAt');
        done();
      });
  });
});
