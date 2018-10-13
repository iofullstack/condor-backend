import Debug from 'debug'
import { Menu, Price } from '../models'

const debug = new Debug('condor-cafe:db-api:menu')

export default {
  findAll: () => {
    debug('Finding all menu')
    return Menu.find().populate('prices')
  },

  findAllCategory: (_id) => {
    debug('Finding all menu of category')
    return Menu.find({ category: _id }).populate('prices')
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
  },

  createPrice: async (m, p) => {
    debug(`Creating new price ${p}`)
    const price = new Price(p)
    const savePrice = await price.save()
    m.prices.push(savePrice)
    await m.save()
    return savePrice
  }
}
