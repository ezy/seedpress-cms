### Mustard API

This is the express server that will ultimately be hosted on the EC2 instance for
the production version of Mustard.

* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [Sequelize-CLI](https://github.com/sequelize/cli)
* [JSON Web Token](https://jwt.io/)

**Hosting**

* AWS EC2
<!-- * [Heroku](https://www.heroku.com/) -->

**Testing**

* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Supertest](https://github.com/visionmedia/supertest)


### Features

* [X] Authentication with JSON Web Token
* [X] Email, Password validations
* [X] User signup, signin
* [X] API and Unit testing
* [X] Easily deployable to Heroku (Procfile)

### To run locally

Make sure to install and run PostgreSQL first.
```
brew update
brew install postgres
createdb mustard-dev
```

### To run test

```
npm run test
```

and in another tab
```
npm run test:only
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
