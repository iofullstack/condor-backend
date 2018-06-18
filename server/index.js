// import http from 'http'
// import Debug from 'debug'
// import app from './app'

// const PORT = 3000
// const debug = Debug('condor-backend:root')

// app.listen(PORT, () => {
//     debug(`Server running at port ${PORT}`)
// })
import http from 'http'

const PORT = 3000

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hola desde Café Condor')
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

// "start:server": "NODE_ENV=development DEBUG=condor-backend* nodemon server/index.js --exec babel-node"