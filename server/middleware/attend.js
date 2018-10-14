import { attend } from '../db-api'
import { handleError } from '../utils'
import { time } from '../config'

export const attendMiddleware = async (req, res, next) => {
  try {
    req.attend = await attend.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const attendUserMiddleware = async (req, res, next) => {
  try {
    req.attends = await attend.findUserById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const existAttendMiddleware = async (req, res, next) => {
  try {
    if (req.user)
      req.attend = await attend.findByDay(time().toISOString().slice(0,10), req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
