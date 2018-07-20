import { attend } from '../db-api'
import { handleError } from '../utils'

export const attendMiddleware = async (req, res, next) => {
  try {
    req.attend = await attend.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const existAttendMiddleware = async (req, res, next) => {
  try {
    req.attend = await attend.findByDay(new Date().toISOString().slice(0,10) ,req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
