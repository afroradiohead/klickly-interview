<p align="center">
  <h3>Klickly App is powered by</h3>
  <a href="http://nestjs.com/" target="blank"><img src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>
</p>

 <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications. </p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/cqrs.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#2" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework **TypeScript** starter repository.

[Klickly App](https://christopher-e-clarke-klickly.herokuapp.com/) app for the interview
  
## Installation
#### 1. Install all node modules
```bash
$ npm install
```

#### 2. Environment Configuration
Create an .env in your root directory and add the following information
```bash
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET=
SHOPIFY_REDIRECT_URI=
MONGODB_URI=
```

#### 3.(optional) Use Docker for MongoDB Database
If you have docker installed, call the following in your root folder to build your mongo database
```bash
docker-compose up --build
```

## Start

```
$ npm run start:watch
```

App will run on http://localhost:3000 by default