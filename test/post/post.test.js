/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');

describe('[POST] /api/posts Testing', () => {

  let postID = '',
    token = '';

  it('should be able to get a list of all seeded posts', (done) => {
    request(app)
      .get('/api/posts')
      .expect(200)
      .end((err, res) => {
        expect(res.body.posts).to.be.an('array');
        expect(res.body.posts[0]).to.have.all.keys('id', 'title', 'category', 'date', 'expiry', 'image', 'frequency', 'createdAt', 'status', 'text', 'updatedAt');
        // set post id for next test
        postID = res.body.posts[0].id;
        done();
      });
  });

  it('should be able to get a single post', (done) => {
    request(app)
      .get(`/api/posts/${postID}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.post).to.be.an('object');
        expect(res.body.post).to.have.all.keys('id', 'title', 'category', 'date', 'expiry', 'image', 'frequency', 'createdAt', 'status', 'text', 'updatedAt');
        done();
      });
  });

  it('should be able to create and delete post if logged in', (done) => {
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
        token = res.body.token;
        request(app)
          .post(`/api/posts`)
          .send({
            title: faker.lorem.sentence(5),
            image: faker.image.imageUrl(),
            category: faker.random.arrayElement(['news', 'event', 'need']),
            date: new Date(),
            expiry: faker.date.future(),
            status: faker.random.arrayElement(['published', 'draft']),
            text: faker.lorem.text()
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            postID = res.body.post.id;
            expect(res.body.post).to.be.an('object');
            expect(res.body.post).to.have.all.keys('id', 'title', 'category', 'image', 'date', 'expiry', 'frequency', 'createdAt', 'status', 'text', 'updatedAt');
            request(app)
              .delete(`/api/posts/${postID}`)
              .set('Authorization', `Bearer ${token}`)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(202)
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                done();
              });
          });
      });
  });
});
