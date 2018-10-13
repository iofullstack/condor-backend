import { saucer } from '../db-api'
import { handleError } from '../utils'

export const saucerMiddleware = async (req, res, next) => {
  try {
    req.saucer = await saucer.findById(req.params.id)
    next()
  } catch (error) {
    handleError(error, res)
  }
}
