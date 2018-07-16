/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const changeCase = require('change-case');

describe('[PAGE] /api/pages Testing', () => {
  let pageSlug = '',
      token = '',
      pageKeys = ['id','title','slug','image','slide','createdAt','status','text','updatedAt'];

  it('should be able to get a list of all seeded pages', (done) => {
    request(app)
      .get('/api/pages')
      .expect(200)
      .end((err, res) => {
        expect(res.body.pages).to.be.an('array');
        expect(res.body.pages[0]).to.have.all.keys(pageKeys);
        // set page id for next test
        pageSlug = res.body.pages[0].slug;
        done();
      });
  });

  it('should be able to get a single page', (done) => {
    request(app)
      .get(`/api/pages/${pageSlug}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.page).to.be.an('object');
        expect(res.body.page).to.have.all.keys(pageKeys);
        done();
      });
  });

  it('should be able to create and delete page if logged in', (done) => {
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
          .post(`/api/pages`)
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
            pageSlug = res.body.page.slug;
            expect(res.body.page).to.be.an('object');
            expect(res.body.page).to.have.all.keys(pageKeys);
            request(app)
              .delete(`/api/pages/${pageSlug}`)
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
