# Lumi

A dating application where one can find the perfect match can date to each other by visiting to nearby events.

## Features Included in this Architecture

- Class based architecture
- Typescript implementation
- Swagger for API documentation
- JOI for API validations
- Associated with mongodb
- Cache and Session management with redis
- Linter to keep coding standards
- Prettier for code formating
- Pre-commit hooks for linting and prettier before commits to keep code clean on git
- JWT token for authentication

## NPM Scripts

## To install Redis on system

$ sudo apt update
$ sudo apt install redis-server

## Open this file with your preferred text editor:

$ sudo nano /etc/redis/redis.conf

## Inside the file, find the supervised directive. and change to supervised systemd

$ sudo systemctl restart redis.service

```sh
$ npm start
## To run app on production server
$ npm run local
## To run app on local server and restart it after detection of file change
$ npm run dev
## To run app on development server
$ npm run stag
## To run app on Staging server
$ npm run lint
## To run linting on app
```

## Tech Stack

- [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).
- [Typescript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Express.js](https://expressjs.com/) - A Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/).
- [MongoDB](https://www.mongodb.com/) - An open-source document based NoSQL database.
- [Joi](https://joi.dev/) - The most powerful schema description language
  and data validator for JavaScript.
---

## License