/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const changeCase = require('change-case');

describe('[POST] /api/media Testing', () => {

  let mediumSlug = '',
      token = '',
      mediumKeys = ['id', 'title', 'author', 'link', 'slug', 'category', 'image', 'date', 'mediaTags', 'createdAt', 'status', 'text', 'updatedAt'];

  it('should be able to get a list of all seeded media', (done) => {
    request(app)
      .get('/api/media')
      .expect(200)
      .end((err, res) => {
        expect(res.body.media).to.be.an('array');
        expect(res.body.media[0]).to.have.all.keys(mediumKeys);
        // set medium id for next test
        mediumSlug = res.body.media[0].slug;
        done();
      });
  });

  it('should be able to get a single medium', (done) => {
    request(app)
      .get(`/api/media/${mediumSlug}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.medium).to.be.an('object');
        expect(res.body.medium).to.have.all.keys(mediumKeys);
        done();
      });
  });

  it('should be able to create and delete medium if logged in', (done) => {
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
          .post(`/api/media`)
          .send({
            id: faker.random.uuid(),
            title: title,
            slug: `${changeCase.paramCase(title)}-${Date.now()}`,
            image: faker.image.imageUrl(),
            author: faker.name.findName(),
            category: 'sermon',
            date: new Date(),
            status: faker.random.arrayElement(['published','draft']),
            text: faker.lorem.text(),
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            mediumSlug = res.body.medium.slug;
            expect(res.body.medium).to.be.an('object');
            expect(res.body.medium).to.have.all.keys(mediumKeys);
            request(app)
              .delete(`/api/media/${mediumSlug}`)
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
