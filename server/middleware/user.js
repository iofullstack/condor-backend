import { user } from '../db-api'
import { handleError } from '../utils'

export const userMiddleware = async (req, res, next) => {
  try {
    req.user = await user.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
