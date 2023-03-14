import { s_profile } from '../db-api'
import { handleError } from '../utils'

export const s_profileMiddleware = async (req, res, next) => {
  try {
    req.s_profile = await s_profile.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
