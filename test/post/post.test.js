/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const changeCase = require('change-case');

describe('[POST] /api/posts Testing', () => {

  let postSlug = '',
      token = '',
      postKeys = ['id', 'title', 'slug', 'category', 'image', 'date', 'expiry', 'postTags', 'frequency', 'createdAt', 'status', 'text', 'updatedAt'];

  it('should be able to get a list of all seeded posts', (done) => {
    request(app)
      .get('/api/posts')
      .expect(200)
      .end((err, res) => {
        expect(res.body.posts).to.be.an('array');
        expect(res.body.posts[0]).to.have.all.keys(postKeys);
        // set post id for next test
        postSlug = res.body.posts[0].slug;
        done();
      });
  });

  it('should be able to get a single post', (done) => {
    request(app)
      .get(`/api/posts/${postSlug}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.post).to.be.an('object');
        expect(res.body.post).to.have.all.keys(postKeys);
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
        title = faker.lorem.sentence(5);
        request(app)
          .post(`/api/posts`)
          .send({
            title: title,
            slug: `${changeCase.paramCase(title)}-${Date.now()}`,
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
            postSlug = res.body.post.slug;
            expect(res.body.post).to.be.an('object');
            expect(res.body.post).to.have.all.keys(postKeys);
            request(app)
              .delete(`/api/posts/${postSlug}`)
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
