import Debug from 'debug'
import { Attend, Assist } from '../models'

const debug = new Debug('condor-cafe:db-api:attend')

export default {
    findById: (_id) => {
      debug(`Find attend with id ${_id}`)
      return Attend
          .findOne({ _id })
          .populate('user')
          .populate('assist')
    },

    findByDay: (day, _id) => {
      debug(`Find attend with day and user id ${_id}`)
      return Attend
          .findOne({ day })
          .populate({
              path: 'user',
              match: { _id }
          })
          .populate('assist')
    },

    findUserById: (_id) => {
      debug(`Find attend with user id ${_id}`)
      return Attend
          .find({ user: _id })
          .populate('user')
          .populate('assist')
    },

    createAttend: async (att) => {
      debug(`Creating new attend ${att}`)
      const attend = new Attend(att)
      const ass = {
        enter: new Date().toISOString().slice(11,16),
        leave: "",
        attend: attend._id
      }
      const assist = new Assist(ass)
      const saveAssist = await assist.save()
      console.log(saveAssist)
      attend.assist.push(saveAssist)
      return await attend.save()
    }
}
