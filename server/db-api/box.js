import Debug from 'debug'
import { Box } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:box')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all boxs')
    return Box.find().sort(sort)
  },

  findById: (_id) => {
    debug(`Find box with id ${_id}`)
    return Box
      .findOne({ _id })
  },

  create: (b) => {
    b.day = time().toISOString().slice(0,10)
    debug(`Creating new box ${b}`)
    const box = new Box(b)
    return box.save()
  }
}
