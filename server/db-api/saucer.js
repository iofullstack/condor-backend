import Debug from 'debug'
import { Saucer } from '../models'

const debug = new Debug('condor-cafe:db-api:Saucer')

export default {
  findAll: () => {
    debug('Find all Saucer')
    return Saucer.find()
  },

  findAllMenu: (_id) => {
    debug('Finding all Saucer of Menu')
    return Saucer.find({ menu: _id })
  },

  create: (s) => {
    debug(`Creating new Saucer ${s}`)
    const saucer = new Saucer(s)
    return saucer.save()
  }
}
