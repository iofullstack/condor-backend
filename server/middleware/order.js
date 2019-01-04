import { order } from '../db-api'
import { handleError } from '../utils'

export const orderDayMiddleware = async (req, res, next) => {
  try {
    req.orders = await order.findAllDay(req.params.day)
    next()
  } catch (error) {
    handleError(error, res)
  }
}

export const orderMiddleware = async (req, res, next) => {
  try {
    req.order = await order.findById(req.params.id)
    next()
  } catch (error) {
    handleError(error, res)
  }
}

export const orderDayArchivedMiddleware = async (req, res, next) => {
  try {
    req.orders = await order.findAllDay(req.params.day, 'createdAt', false)
    next()
  } catch (error) {
    handleError(error, res)
  }
}
