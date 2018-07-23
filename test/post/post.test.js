/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const changeCase = require('change-case');

describe('[POST] /api/posts Testing', () => {

  let postSlug = '',
      token = '',
      postKeys = [
        'id',
        'postTitle',
        'postSlug',
        'postType',
        'postDate',
        'postContent',
        'postAuthor',
        'postImage',
        'postMedia',
        'postStatus',
        'postExpiry',
        'postFrequency',
        'postTerms',
        'createdAt',
        'updatedAt'
      ];

  it('should be able to get a list of all seeded posts', (done) => {
    request(app)
      .get('/api/posts')
      .expect(200)
      .end((err, res) => {
        expect(res.body.posts).to.be.an('array');
        expect(res.body.posts[0]).to.have.all.keys(postKeys);
        // set post id for next test
        postSlug = res.body.posts[0].postSlug;
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
        let postRequest = {
          postTitle: title,
          postSlug: `${changeCase.paramCase(title)}-${Date.now()}`,
          postType: faker.random.arrayElement(['post','page']),
          postDate: new Date(),
          postContent: faker.lorem.sentences(3,3),
          postAuthor: faker.name.findName(),
          postImage: faker.image.imageUrl(),
          postMedia: faker.image.imageUrl(),
          postStatus: faker.random.arrayElement(['published','draft']),
          postExpiry: faker.date.future(),
          postFrequency: faker.random.arrayElement([null,'day','week','fortnight','month']),
          postTerms: [{
            termType: 'tag',
            termName: 'fws'
          }, {
            termType: 'tag',
            termName: 'Ho'
          }, {
            termType: 'category',
            termName: 'Ho'
          }]
        }
        request(app)
          .post(`/api/posts`)
          .send(postRequest)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            postSlug = res.body.post.postSlug;
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
