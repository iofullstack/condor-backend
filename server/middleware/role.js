import { role } from '../db-api'
import { handleError } from '../utils'

export const roleMiddleware = async (req, res, next) => {
  try {
    req.role = await role.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
