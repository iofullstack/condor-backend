# Condor Café Backend

This project is for restaurant as "Café Condor"

## Install dependencies
```sh
  npm install
```

## Development server

Run `npm run start:server` for a dev sever. Navigate to `http://localhost:3500/`.
The app will automatically reload if you change any of the source files.

## Tools
  - install mongodb [download](https://www.mongodb.com/download-center#community)
  - install nodemon
  ```sh
    npm i -g nodemon
  ```
## RUN in linux enviroment

1. run mongo db
```sh
  mongod
```
2. run mongo shell
```sh
  mongo
```
3. run server
```sh
  npm run start:server
```

## RUN in windows enviroment

1. run mongo db
```sh
  mongod
```
2. run mongo shell
```sh
  mongo
```
3. run server
```sh
  nodemon server/index.js --exec babel-node
  or
  npm run start:win
```