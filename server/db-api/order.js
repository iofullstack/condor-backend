import Debug from 'debug'
import { Order } from '../models'
import { time } from '../config'

const debug = new Debug('condor-cafe:db-api:Order')

export default {
  countOrder: async (day) => {
    debug('countOrder')
    const start = `${day}T00:00:00Z`
    const end = `${day}T23:59:59Z`
    return await Order.count({ 'createdAt': {'$gte': start, '$lte': end} })
  },

  findAll: (sort = '-createdAt') => {
    debug('Find all Order')
    return Order.find({ status: true }).populate({ path: 'tables'}).sort(sort)
  },

  findAllDay: (day, sort = '-createdAt') => {
    debug('Finding all Orders by Day')
    const start = `${day}T00:00:00Z`
    const end = `${day}T23:59:59Z`
    return Order.find({ 'createdAt': {'$gte': start, '$lte': end}, status: true })
                .populate({ path: 'tables'})
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    match: { status: true },
                    populate: { path: 'category' }
                  }
                }).sort(sort)
    // return Order.find({ 'createdAt': {'$gte': start, '$lte': end} })
    //             .populate({ path: 'user'})
    //             .populate({ path: 'tables' })
    //             .populate({
    //               path: 'saucers',
    //               populate: {
    //                 path: 'menu',
    //                 populate: { path: 'prices' }
    //               }
    //             })
  },

  findById: (_id) => {
    debug(`Find Order with id ${_id}`)
    return Order.findOne({ _id, status: true })
                .populate({ path: 'user'})
                .populate({ path: 'tables' })
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    match: { status: true },
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
