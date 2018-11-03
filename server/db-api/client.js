import Debug from 'debug'
import { Client } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:client')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all clients')
    return Client.find({ status: true }).sort(sort)
  },

  findById: (_id) => {
    debug(`Find client with id ${_id}`)
    return Client
      .findOne({ _id, status: true })
  },

  create: (c) => {
    c.createdAt = time()
    debug(`Creating new client ${c}`)
    const client = new Client(c)
    return client.save()
  }
}
