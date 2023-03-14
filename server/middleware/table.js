import { table } from '../db-api'
import { handleError } from '../utils'

export const tableMiddleware = async (req, res, next) => {
  try {
    req.table = await table.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
