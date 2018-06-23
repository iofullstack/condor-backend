# Condor Café Backend

This project is for restaurant as "Café Condor"

## Install dependencies
`npm install`

## Development server

Run `npm run start:server` for a dev sever. Navigate to `http://localhost:3500/`.
The app will automatically reload if you change any of the source files.

## RUN in windows enviroment
0. Install tools
  - mongodb (download)
  - nodemon (npm i -g nodemon)

1. run mongo db
```sh
  mongod
```
2. run mongo
```sh
  mongo
```
3. run server
```sh
  nodemon server/index.js --exec babel-node
```