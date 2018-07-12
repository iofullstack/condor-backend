import Debug from 'debug'
import { Module, Permit } from '../models'

const debug = new Debug('condor-cafe:db-api:module')

export default {
  findAll: () => {
    debug('Finding all module')
    return Module.find().populate('permits')
  },

  findById: (_id) => {
    debug(`Find module with id ${_id}`)
    return Module
      .findOne({ _id })
  },

  create: (m) => {
    debug(`Creating new module ${m}`)
    const module = new Module(m)
    return module.save()
  },

  createPermit: async (m, p) => {
    debug(`Creating new permit ${p}`)
    const permit = new Permit(p)
    const savePermit = await permit.save()
    m.permits.push(savePermit)
    await m.save()
    return savePermit
  }
}
