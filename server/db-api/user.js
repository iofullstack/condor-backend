import Debug from 'debug'
import { User } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:user')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all users')
    return User.find({ status: true }).populate('s_profile').sort(sort)
  },

  findById: (_id) => {
    debug(`Find user with id ${_id}`)
    return User
      .findOne({ _id, status: true })
      .populate({
        path: 's_profile',
        populate: { path: 'permits', options: { sort: 'action' } }
      })
  },

  findByCI: (ci) => {
    debug(`Find user with CI ${ci}`)
    return User
      .findOne({ ci, status: true })
  },

  create: (u) => {
    u.createdAt = time()
    debug(`Creating new user ${u}`)
    const user = new User(u)
    return user.save()
  }
}
