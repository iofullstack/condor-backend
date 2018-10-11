import { menu } from '../db-api'
import { handleError } from '../utils'

export const menuMiddleware = async (req, res, next) => {
  try {
    req.menu = await menu.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
