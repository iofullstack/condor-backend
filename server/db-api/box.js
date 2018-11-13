import Debug from 'debug'
import { Box } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:box')

export default {
  findAll: () => {
    debug('Finding all boxs')
    return Box.find()
  },

  findById: (_id) => {
    debug(`Find box with id ${_id}`)
    return Box
      .findOne({ _id })
  },

  findByDay: (day) => {
    debug(`Find box with day ${day}`)
    return Box
        .findOne({ day })
  },

  createBox: (amount) => {
    const b = {
      day: time().toISOString().slice(0,10),
      period: []
    }
    debug(`Creating new box ${b}`)
    const period = {
      amount,
      opening: time().toISOString().slice(11,16),
      closing: ''
    }
    b.period.push(period)
    const box = new Box(b)
    return box.save()
  },

  createOpeningPeriod: (box, amount) => {
    debug(`Creating new opening period on box`)
    const period = {
      amount,
      opening: time().toISOString().slice(11,16),
      closing: ''
    }
    box.period.push(period)
    return box.save()
  },

  createClosingPeriod: (box) => {
    debug(`Update closing box`)
    box.period[box.period.length - 1].closing = time().toISOString().slice(11,16)
    return box.save()
  }
}
