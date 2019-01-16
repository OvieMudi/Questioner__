# Questioner

[![Build Status](https://travis-ci.com/OvieMudi/Questioner__.svg?branch=develop)](https://travis-ci.com/OvieMudi/Questioner__?branch=develop) [![Coverage Status](https://coveralls.io/repos/github/OvieMudi/Questioner__/badge.svg?branch=develop)](https://coveralls.io/github/OvieMudi/Questioner__?branch=develop) [![Code Climate](https://codeclimate.com/github/OvieMudi/Questioner__/badges/gpa.svg)](https://codeclimate.com/github/OvieMudi/Questioner__)

## About Questioner

Questioner is a crowd-source questions for a meetup. The app helps a meetup organizer to prioritize questions to be answered at the meetup. Other users can vote on asked questions and these questions bubble to the top or bottom of the log.

## Getting Started
### Prerequisite
Install [NodeJs](https://nodejs.org/en/download/)

### Installation
Run the folling commands on the command line

##### Clone repository

```git clone https://github.com/OvieMudi/Questioner__.git```

``` cd Questioner__ ```

``` git checkout develop ```

##### Install dependencies
``` npm install ```

### Tests
Questioner uses NodeJs Mocha framework and the Chai assertion library to test all API endpoints to ensure a functional, bug-free deployment.

##### Running the tests
``` npm test ```

## Deployment
### Api Deployment
Questioner API is deployed to [Heroku](https://calm-hamlet-71164.herokuapp.com/).

##### How to deploy
Using the command line:

``` git push heroku develop:master ```

However, it is recommended to deploy Questioner using automated web services like [GitHub](https://github.com) which automate deployment (and perform security checks, unit tests, etc).

Note that you must have an account [Heroku](https://heroku.com).


## Technology Stack
- Nodejs (Express framework)
- ES6 Javascript  (Airbnb style guide)
- Compiled with Babel

#### Testing tools
- Mocha (Test Framework)
- Chai (Assertion Library)
- Istanbul  (code instrumenter)
- NYC (Istanbul's command line interface)
- Postman (Testing API endpoints)


## Authors
Ovie Udih
