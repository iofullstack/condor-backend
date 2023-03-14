import { box } from '../db-api'
import { handleError } from '../utils'
import { time } from '../config'

export const boxMiddleware = async (req, res, next) => {
  try {
    req.box = await box.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const existBoxMiddleware = async (req, res, next) => {
  try {
    req.box = await box.findByDay(time().toISOString().slice(0,10))
    next()
  } catch (err) {
    handleError(err, res)
  }
}
