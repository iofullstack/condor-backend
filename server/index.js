import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'
// import express from 'express'
// import path from 'path'
import { createServer } from 'http'
import socketIO from 'socket.io'

const PORT =  process.env.port || 3500,
      debug = Debug('condor-backend:root'),
      server = createServer(app),
      io = socketIO(server)
      // publicDir = express.static( path.join(__dirname, '../../dist/proyect-app') )

app.set('io', io)

async function start() {
  await mongoose.connect( mongoUrl )

  // app.use( publicDir )

  server.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
  })

  io.on('connection', function (socket) {
    socket.broadcast.emit('msg', { msg: 'Welcome bro!' })
    console.log('cliente conectado')
    socket.on('msg', function (msg) {
      console.log(msg)
      socket.broadcast.emit('msg', { msg: "Tu Mensaje: " + msg })
    })
  })
}

start()
