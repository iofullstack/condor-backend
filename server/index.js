import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'

const PORT = 3500
// const PORT = 80
const debug = Debug('condor-backend:root')

async function start() {
  await mongoose.connect( mongoUrl )

  app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
  })
}

start()
