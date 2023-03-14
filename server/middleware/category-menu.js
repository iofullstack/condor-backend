import { c_menu } from '../db-api'
import { handleError } from '../utils'

export const c_menuMiddleware = async (req, res, next) => {
  try {
    req.c_menu = await c_menu.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
