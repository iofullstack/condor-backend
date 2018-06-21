import Debug from 'debug'
import { Client } from '../models'

const debug = new Debug('condor-cafe:db-api:client')

export default {
  findAll: () => {
    debug('Finding all clients')
    return User.find()
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
