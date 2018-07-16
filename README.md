## 🌱 Seedpress Express API

[![Build Status](https://travis-ci.com/ezy/seedpress-cms.svg?branch=master)](https://travis-ci.com/ezy/seedpress-cms)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Seedpress is a headless Node JS API server based on Express, built specifically for PostgreSQL using Sequelize ORM. It generally follows the logic and conventions of the Wordpress Page, Post and Media schema eg. Post schema - title, slug, image, category, date, expiry, frequency, status, text. Seedpress authenticates users using JSON web tokens managed by Passport. It's production ready, (although there are still a number of tests to write) and should work as a great starter for any content based API.

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
* [X] API and Unit testing
* [X] Page, Post, Media and Tag models
* [X] Easily deployable to Heroku (Procfile)

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

### Testing

You'll need to setup the test server using `yarn resettest`. To trigger the mocha/chai tests enter:
```
yarn test
```

#### Postman

There is a postman collection file for API testing and development in
`config/newseed-api.postman_collection.json`. It contains scripts and
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

* /pages
  * [POST] Single page (/ - with auth)
  * [PATCH] Single page (/:slug - with auth)
  * [DEL] Single page (/:slug - with auth)
  * [GET] All pages (/)
  * [GET] Single page (/:slug)

### To deploy on Heroku
```
heroku login
heroku create
git push heroku master
```

#### Sequelize ORM

Seedpress uses Sequelise ORM to make interacting with Postgres. Install globally
on your dev machine using `yarn global sequelize-cli` then run commands with
`sequelize-cli` or alternately run commands locally in your dev folder with the
built in dev package `./node_modules/.bin/sequelize init`.
