import Debug from 'debug'
import { Menu } from '../models'

const debug = new Debug('condor-cafe:db-api:menu')

export default {
  findAll: () => {
    debug('Finding all menu')
    return Menu.find()
  },

  findById: (_id) => {
    debug(`Find menu with id ${_id}`)
    return Menu
      .findOne({ _id })
  },

  create: (m) => {
    debug(`Creating new menu ${m}`)
    const menu = new Menu(m)
    return menu.save()
  }
}
