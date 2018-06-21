import Debug from 'debug'
import { Role } from '../models'

const debug = new Debug('condor-cafe:db-api:role')

export default {
  findAll: () => {
    debug('Finding all role')
    return Role.find().populate('permissions')
  },

  findById: (_id) => {
    debug(`Find role with id ${_id}`)
    return Role
      .findOne({ _id })
      .populate({
        path: 'permits',
        options: { sort: '-createdAt' }
      })
  },

  create: (r) => {
    debug(`Creating new role ${r}`)
    const role = new Role(r)
    return role.save()
  },

  createPermissions: async (r, p) => {
    debug(`Creating new permissions ${p}`)
    const permission = new Permission(p)
    const savePermissions = await permission.save()
    q.Permissionss.push(savePermissions)
    await q.save()
    return savePermissions
  }
}
