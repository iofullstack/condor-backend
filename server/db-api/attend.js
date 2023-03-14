import Debug from 'debug'
import { Attend, Assist } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:attend')

export default {
    findById: (_id) => {
      debug(`Find attend with id ${_id}`)
      return Attend
          .findOne({ _id })
          .populate('user')
          .populate('assists')
    },

    findAssistById: (_id) => {
      debug(`Find assist with id ${_id}`)
      return Assist
          .findOne({ _id })
    },

    findByDay: (day, _id) => {
      debug(`Find attend with day and user id ${_id}`)
      return Attend
          .findOne({ day })
          .populate({
              path: 'user',
              match: { _id }
          })
          .populate('assists')
    },

    findUserById: (_id) => {
      debug(`Find attend with user id ${_id}`)
      return Attend
          .find({ user: _id })
          .populate('user')
          .populate({
            path: 'assists',
            populate: { path: 'attend' }
          })
    },

    createAttend: async (att) => {
      att.day = time().toISOString().slice(0,10)
      debug(`Creating new attend ${att}`)
      const attend = new Attend(att)
      const ass = {
        enter: time().toISOString().slice(11,16),
        leave: "",
        attend: attend._id
      }
      const assist = new Assist(ass)
      const saveAssist = await assist.save()
      console.log(saveAssist)
      attend.assists.push(saveAssist)
      return await attend.save()
    },

    createEnterAssist: async (attend) => {
      debug(`Creating new enter assist`)
      const ass = {
        enter: time().toISOString().slice(11,16),
        leave: "",
        attend: attend._id
      }
      const assist = new Assist(ass)
      const saveAssist = await assist.save()
      attend.assists.push(saveAssist)
      await attend.save()
      return saveAssist
    },

    createLeaveAssist: async (assist) => {
      debug(`Update leave assist`)
      return await Assist.findOneAndUpdate({
        _id: assist._id
      }, {
          $set: { leave: time().toISOString().slice(11,16) }
        },function(err, newAssist) {
          if (err)
            return { error: true, msg: "An error ocurred: createLeaveAssist" }
          else {
            return newAssist
          }
        }
      )
    }
}
