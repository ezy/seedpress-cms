const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;

describe('[USER] /api/users Testing', () => {

  it('should be able to sign up a new user', (done) => {
    request(app)
      .post('/api/users')
      .send({
        email: 'mazamba@cc.cc',
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        // console.log('====res.body========\n', res.body)
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.deep.property('user.email', 'mazamba@cc.cc');
        done();
      })
  });

  it('should not be able to sign up if any inputs are empty', (done) => {
    request(app)
      .post('/api/users')
      .send({
        email: 'olala@cc.cc',
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'Email, and password are required.');
        done();
      })
  });

  it('should not be able to sign up a user with same email', (done) => {
    request(app)
      .post('/api/users')
      .send({ 
        email: 'alice@cc.cc',
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
      })
  });
})
