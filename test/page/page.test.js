/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('assert');
const faker = require('faker');

describe('[PAGE] /api/pages Testing', () => {
  let pageID = '';
  it('should be able to get a list of all seeded pages', (done) => {
    request(app)
      .get('/api/pages')
      .expect(200)
      .end((err, res) => {
        expect(res.body.pages).to.be.an('array');
        expect(res.body.pages[0]).to.have.all.keys('id','title','image','slide','createdAt','status','text','updatedAt');
        assert.equal((res.body.pages).length, 6);
        // set page id for next test
        pageID = res.body.pages[0].id;
        done();
      });
  });

  it('should be able to get a single page', (done) => {
    request(app)
      .get(`/api/pages/${pageID}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.page).to.be.an('object');
        expect(res.body.page).to.have.all.keys('id','title','image','slide','createdAt','status','text','updatedAt');
        done();
      });
  });

  it('should be able to create page if logged in', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'user@email.com',
        password: 'passwrod'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        let token = res.body.token;
        request(app)
          .post(`/api/pages`)
          .send({
            title: faker.lorem.sentence(5),
            image: faker.image.imageUrl(),
            status: faker.random.arrayElement(['published','draft']),
            slide: faker.random.arrayElement(['0','1']),
            text: faker.lorem.text()
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            console.log(res.body);
            expect(res.body.page).to.be.an('object');
            expect(res.body.page).to.have.all.keys('id','title','image','slide','createdAt','status','text','updatedAt');
            done();
          });
      });
  });
});
