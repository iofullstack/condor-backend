import Debug from 'debug'
import { Table } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:Table')

export default {
  findAll: (sort = 'createdAt') => {
    debug('Finding all Tables')
    return Table.find().sort(sort)
  },

  findById: (_id) => {
    debug(`Find Table with id ${_id}`)
    return Table
      .findOne({ _id })
  },

  create: (t) => {
    t.createdAt = time()
    debug(`Creating new Table ${t}`)
    const table = new Table(t)
    return table.save()
  },

  updateOccupied: async (_id, occupied, reset = false) => {
    debug(`Updating Table occupied ${_id}`)
    if (!reset) {
      let table = await Table.findOne({ _id })
      occupied += table.occupied
    }
    return Table.updateOne( { _id }, { $set: {occupied} } )
  }
}
