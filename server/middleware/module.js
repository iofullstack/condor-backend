import { module } from '../db-api'
import { handleError } from '../utils'

export const moduleMiddleware = async (req, res, next) => {
  try {
    req.module = await module.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
