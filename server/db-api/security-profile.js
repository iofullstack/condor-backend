import Debug from 'debug'
import { SecurityProfile } from '../models'

const debug = new Debug('condor-cafe:db-api:security-profile')

export default {
  findAll: () => {
    debug('Finding all security-profile')
    return SecurityProfile.find().populate('permits')
  },

  findById: (_id) => {
    debug(`Find security-profile with id ${_id}`)
    return SecurityProfile
      .findOne({ _id })
  },

  create: (sp) => {
    debug(`Creating new security-profile ${sp}`)
    const s_profile = new SecurityProfile(sp)
    return s_profile.save()
  }
}
