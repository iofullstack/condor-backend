import Debug from 'debug'
import { Order } from '../models'

const debug = new Debug('condor-cafe:db-api:Order')

export default {
  findAll: () => {
    debug('Find all Order')
    return Order.find()
  },

  findAllDay: (day, sort = 'createdAt') => {
    debug('Finding all Orders by Day')
    const start = ISODate(`${day}T00:00:00Z`)
    const end = ISODate(`${day}T23:59:59Z`)
    return Order.find({ 'createdAt': {'$gte': start, '$lte': end} })
                .populate({ path: 'user'})
                .populate({ path: 'tables' })
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    populate: { path: 'category' },
                    populate: { path: 'prices' }
                  }
                })
                .sort(sort)
  },

  findById: (_id) => {
    debug(`Find Order with id ${_id}`)
    return Order.findOne({ _id })
                .populate({ path: 'user'})
                .populate({ path: 'tables' })
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    populate: { path: 'category' },
                    populate: { path: 'prices' }
                  }
                })
  },

  create: (o) => {
    debug(`Creating new order ${o}`)
    const order = new Order(o)
    return order.save()
  }
}
