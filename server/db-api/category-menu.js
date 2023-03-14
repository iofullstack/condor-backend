import Debug from 'debug'
import { CategoryMenu } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:category-menu')

export default {
  findAll: (sort='createdAt') => {
    debug('Finding all category-menu')
    return CategoryMenu.find().sort(sort)
  },

  findLast: () => {
    debug('Finding last category-menu')
    return CategoryMenu.findOne().sort('-createdAt').limit(1)
  },

  findById: (_id) => {
    debug(`Find category-menu with id ${_id}`)
    return CategoryMenu
      .findOne({ _id })
  },

  create: (cm) => {
    cm.createdAt = time()
    debug(`Creating new category-menu ${cm}`)
    const c_menu = new CategoryMenu(cm)
    return c_menu.save()
  }
}
