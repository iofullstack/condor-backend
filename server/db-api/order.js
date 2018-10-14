import Debug from 'debug'
import { Order } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:Order')

export default {
  findAll: () => {
    debug('Find all Order')
    return Order.find()
  },

  findAllDay: (day) => {
    debug('Finding all Orders by Day')
    // console.log(ISODate("2018-10-13T00:00:00Z"))
    const start = `${day}T00:00:00Z`
    const end = `${day}T23:59:59Z`
    console.log(start, end)
    return Order.find({ 'createdAt': {'$gte': start, '$lte': end} })
                .populate({ path: 'user'})
                .populate({ path: 'tables' })
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    populate: { path: 'prices' }
                  }
                })
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
                    populate: { path: 'prices' }
                  }
                })
  },

  create: (o) => {
    o.createdAt = time()
    debug(`Creating new order ${o}`)
    const order = new Order(o)
    return order.save()
  }
}
