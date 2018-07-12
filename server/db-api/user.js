import Debug from 'debug'
import { User } from '../models'

const debug = new Debug('condor-cafe:db-api:user')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all users')
    return User.find().populate('s_profile').sort(sort)
  },

  findById: (_id) => {
    debug(`Find user with id ${_id}`)
    return User
      .findOne({ _id })
      .populate('role')
      .populate({
        path: 'permits',
        options: { sort: '-createdAt' }
      })
  },

  create: (u) => {
    debug(`Creating new user ${u}`)
    const user = new User(u)
    return user.save()
  }
}
