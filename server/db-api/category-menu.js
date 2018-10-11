import Debug from 'debug'
import { CategoryMenu } from '../models'

const debug = new Debug('condor-cafe:db-api:category-menu')

export default {
  findAll: () => {
    debug('Finding all category-menu')
    return CategoryMenu.find()
  },

  findById: (_id) => {
    debug(`Find category-menu with id ${_id}`)
    return CategoryMenu
      .findOne({ _id })
  },

  create: (cm) => {
    debug(`Creating new category-menu ${cm}`)
    const c_menu = new CategoryMenu(cm)
    return c_menu.save()
  }
}
