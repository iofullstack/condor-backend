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

    createAssist: async (att, ass) => {
        debug(`Creating new assist ${ass}`)
        const assist = new Assist(ass)
        console.log(assist)
        const saveAssist = await assist.save()
        attend = new Attend(att)
        attend.assist.push(saveAssist)
        await attend.save()
        return saveAssist
    }
}
