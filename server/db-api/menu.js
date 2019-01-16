import Debug from 'debug'
import { Menu, Price } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:menu')

export default {
  findAllNonePrice: (sort = 'createdAt') => {
    debug('Finding all menu price none')
    return Menu.find({ status: true, prices: { $size: 0 } }).sort(sort)
  },

  findAll: (sort = 'createdAt') => {
    debug('Finding all menu')
    return Menu.find({ status: true }).populate('prices').populate({ path: 'category'}).sort(sort)
  },

  findAllCategory: (_id, sort = 'createdAt') => {
    debug('Finding all menu of category')
    return Menu.find({ category: _id, status: true }).populate('prices').populate({ path: 'category'}).sort(sort)
  },

  findById: (_id) => {
    debug(`Find menu with id ${_id}`)
    return Menu
      .findOne({ _id, status: true })
  },

  create: (m) => {
    m.createdAt = time()
    debug(`Creating new menu ${m}`)
    const menu = new Menu(m)
    return menu.save()
  },

  createPrice: async (m, p) => {
    p.createdAt = time()
    debug(`Creating new price ${p}`)
    const price = new Price(p)
    const savePrice = await price.save()
    m.prices.push(savePrice)
    await m.save()
    return savePrice
  },

  findByIdPrice: (_id) => {
    debug(`Find price with id ${_id}`)
    return Price
      .findOne({ _id })
  }
}
