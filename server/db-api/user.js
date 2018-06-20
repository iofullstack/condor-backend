import Debug from 'debug'
import { User } from '../models'

const debug = new Debug('condor-cafe:db-api:user')

export default {
  findAll: () => {
    debug('Finding all users')
    return User.find().populate('permissions')
  },

  findById: (_id) => {
    debug(`Find user with id ${_id}`)
    return User
      .findOne({ _id })
      .populate('permissions')
  }
}
