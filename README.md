### Seedpress Express API

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

Make sure to install and run PostgreSQL first.
```
brew update
brew install postgres
createdb seedpress_dev
```

### To run test

```
yarn test
```

and in another tab
```
yarn test:only
```

### To deploy on Heroku
```
heroku login
heroku create
git push heroku master
```

#### Side Note

With `sequelize-cli`
```
./node_modules/.bin/sequelize init
```
will create model setup and edit `./config/config.json` for your database.
