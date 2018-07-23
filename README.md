## 🌱 Seedpress Express API

[![Build Status](https://travis-ci.com/ezy/seedpress-cms.svg?branch=master)](https://travis-ci.com/ezy/seedpress-cms)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Seedpress is a headless Node JS API server built with Express, for PostgreSQL using Sequelize ORM. It generally follows the logic and conventions of the Wordpress Page, Post and Media schema eg. Post schema - title, slug, image, category, date, expiry, frequency, status, text. Seedpress authenticates users using JSON web tokens managed by Passport. It's production ready, (although there are still a number of tests to write) and should work as a great starter for any content based Progressive Web Application.

* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [Sequelize-CLI](https://github.com/sequelize/cli)
* [JSON Web Token](https://jwt.io/)

**Hosting**

* [Heroku](https://www.heroku.com/)

**Testing**

* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Supertest](https://github.com/visionmedia/supertest)


### Features

* [X] Authentication with JSON Web Token
* [X] Email, Password validations
* [X] User login and registration
* [X] Full API and Unit test coverage
* [X] Page and Term models with belongsToMany two way relationship
* [X] Easily deployable to Heroku (Procfile)

### Schema

* Post
  * id
  * postTitle
  * postSlug   
  * postType     
  * postDate
  * postContent  
  * postAuthor     
  * postImage      
  * postMedia
  * postStatus
  * postExpiry
  * postFrequency
  * postTerms
  * createdAt
  * updatedAt

* Terms
  * id
  * termType
  * termName
  * createdAt
  * updatedAt

* PostTerms
  * termId
  * postId
  * createdAt
  * updatedAt

### To run locally

Make sure to install and run PostgreSQL first. There are a list of package.json
scripts that include core sequelize migrations and seeds.

```
brew update
brew install postgres
```
Then you'll need to adjust the config file `config/config.js` to suit your setup.

Then run `yarn reset` and your db will create from scratch and seed data under
the db name `seedpress_dev`.

Running `yarn dev` will start your dev server where needed.

### Testing

You'll need to setup the test server using `yarn resettest`. To trigger the mocha/chai tests enter:
```
yarn test
```

#### Postman

There is a postman collection file for API testing and development in
`test/seedpress-api.postman_collection.json`. It contains scripts and
basic CRUD for:

* /auth
  * [POST] Register (/register)
  * [POST] Login (/login)

* /posts
  * [POST] Single post (/ - with auth)
  * [PATCH] Single post (/:slug - with auth)
  * [DEL] Single post (/:slug - with auth)
  * [GET] All posts (/)
  * [GET] Single post (/:slug)

### To deploy on Heroku
```
heroku login
heroku create
git push heroku master
```

#### Sequelize ORM

Seedpress uses Sequelise ORM to interact with Postgres. Install globally
on your dev machine using `yarn global sequelize-cli` then run commands with
`sequelize` or alternately run commands locally in your dev folder with the
built in dev package `./node_modules/.bin/sequelize init`.
