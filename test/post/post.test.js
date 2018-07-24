const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const faker = require('faker');
const changeCase = require('change-case');

describe('[POST] /api/posts Testing', () => {

  let postSlug = '',
      token = '',
      title = faker.lorem.sentence(5),
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
      ],
      postRequest = {
        postTitle: title,
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
      };

  it('should be able to set login token', (done) => {
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
        expect(res.body).to.be.an('object');
        token = res.body.token;
        done();
      });
  });

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

  it('should error with wrong post slug', (done) => {
    request(app)
      .get('/api/posts/no-post-here')
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'No post found');
        done();
      });
  });

  it('should be able to create a post if logged in', (done) => {
    request(app)
      .post('/api/posts')
      .send(postRequest)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body.post).to.be.an('object');
        expect(res.body.post).to.have.all.keys(postKeys);
        done();
      });
  });

  it('should be able to delete a post if logged in', (done) => {
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

  it('should error with wrong delete post slug', (done) => {
    request(app)
      .get(`/api/posts/${postSlug}`)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'No post found');
        done();
      });
  });

  it('it should reject post with no title', (done) => {
    request(app)
      .post('/api/posts')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'A postTitle is required.');
        done();
      });
  });

  it('it should reject post with no term name', (done) => {
    let noTermName = postRequest;
    noTermName.postTerms = [{
      termType: 'tag',
      termName: 'fws'
    }, {
      termType: 'tag'
    }, {
      termType: 'category',
      termName: 'Ho'
    }];
    request(app)
      .post('/api/posts')
      .send(noTermName)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'All terms require a termType and termName.');
        done();
      });
  });
});
