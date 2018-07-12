import Debug from 'debug'
import { Client } from '../models'

const debug = new Debug('condor-cafe:db-api:client')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all clients')
    return Client.find().sort(sort)
  },

  findById: (_id) => {
    debug(`Find client with id ${_id}`)
    return Client
      .findOne({ _id })
  },

  create: (c) => {
    debug(`Creating new client ${c}`)
    const client = new Client(c)
    return client.save()
  }
}