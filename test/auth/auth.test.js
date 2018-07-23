/* eslint-disable */

const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');

describe('[Authentication] /auth Testing', () => {
  it('should be able to sign in with correct credentials', (done) => {
    request(app)
      .post('/auth/register')
      .send({
        email: 'user@email.com',
        password: 'passwrod'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        request(app)
          .post('/auth/signin')
          .send({
            email: 'user@email.com',
            password: 'passwrod'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err2, res) => {
            expect(res.body).to.be.an('object');
            done();
          });
      });
  });

  it('should not be able to sign in if credentials are incorrect', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'user@email.com',
        password:'BadPass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'Incorrect email or password.');
        done();
      });
  });

  it('should be able to sign up a new user', (done) => {
    const email = faker.internet.email();
    request(app)
      .post('/auth/register/')
      .send({
        email: email,
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.deep.property('user.userEmail', email);
        done();
      });
  });

  it('should not be able to sign up if any inputs are empty', (done) => {
    request(app)
      .post('/auth/register/')
      .send({
        email: null,
        password: null
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'Email, and password are required.');
        done();
      });
  });

  it('should not be able to sign up a user with same email', (done) => {
    request(app)
      .post('/auth/register/')
      .send({
        email: 'user@email.com',
        password: 'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'The email is already registered.');
        done();
      });
  });
});
